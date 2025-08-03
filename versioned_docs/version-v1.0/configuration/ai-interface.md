# AI Interface

ShedBoxAI provides sophisticated AI integration with batch processing, parallel execution, and advanced templating. Connect to any LLM provider via REST API with comprehensive prompt management.

## Overview

The AI interface enables:
- **Multi-LLM Support**: OpenAI, Claude, custom APIs
- **Batch Processing**: Process multiple prompts efficiently
- **Parallel Execution**: Concurrent API calls for performance
- **Prompt Storage**: Save prompts and responses for analysis
- **Advanced Templating**: Jinja2 templates with custom filters
- **Error Handling**: Retry logic and rate limit management

## Basic Configuration

### Model Setup

Configure your AI model connection:

```yaml
ai_interface:
  model:
    type: rest
    url: https://api.openai.com/v1/chat/completions
    method: POST
    headers:
      Authorization: Bearer ${OPENAI_API_KEY}
      Content-Type: application/json
    options:
      model: gpt-4
      temperature: 0.7
      max_tokens: 2000
      top_p: 0.9
```

### Simple Prompt

Create a basic AI prompt:

```yaml
ai_interface:
  prompts:
    content_summary:
      system: "You are a helpful assistant that summarizes data."
      user_template: |
        Please summarize this data:
        
        {{data}}
        
        Provide key insights and trends.
      response_format: markdown
      temperature: 0.5
```

## Advanced Prompt Configuration

### Complex Template Prompts

Use Jinja2 templates for dynamic prompts:

```yaml
ai_interface:
  prompts:
    financial_analysis:
      system: "You are a senior financial analyst with 15 years of experience."
      user_template: |
        # Financial Analysis Request
        
        ## Company Data
        - Revenue: ${{revenue}}
        - Growth Rate: {{growth_rate}}%
        - Market Cap: ${{market_cap}}
        
        ## Key Metrics
        {% for metric in key_metrics %}
        - {{metric.name}}: {{metric.value}} ({{metric.trend}})
        {% endfor %}
        
        ## Analysis Requirements
        Please provide:
        1. Overall financial health assessment
        2. Risk analysis and recommendations  
        3. Growth opportunities identification
        
        Format the response as a detailed markdown report.
      response_format: markdown
      temperature: 0.3
      max_tokens: 1500
```

### Available Template Filters

ShedBoxAI provides these Jinja2 filters for template processing:

```yaml
ai_interface:
  prompts:
    filter_examples:
      user_template: |
        # Template Filter Examples
        
        **Data Conversion:**
        - JSON Output: {{data|tojson}}
        
        **Array Processing:**
        - Item Count: {{items|length}}
        - Comma List: {{names|join(', ')}}
        - Custom Separator: {{tags|join(' | ')}}
        
        **Standard Jinja2 Features:**
        - Uppercase: {{text|upper}}
        - Default Value: {{optional_field|default('N/A')}}
```

**Available Filters:**
- `tojson` - Convert any object to JSON string
- `length` - Get count of items in array/string
- `join(separator)` - Join array elements with separator
- Plus all standard Jinja2 filters (upper, lower, default, etc.)

### Batch Processing

Process multiple items with the same prompt:

```yaml
ai_interface:
  prompts:
    personalized_recommendations:
      system: "You are a personalization expert."
      user_template: |
        Generate personalized recommendations for:
        
        **Customer Profile:**
        - Name: {{item.name}}
        - Age: {{item.age}}
        - Purchase History: {{item.purchase_history|length}} items
        - Preferences: {{item.preferences|join(', ')}}
        - Budget Range: ${{item.budget_min}} - ${{item.budget_max}}
        
        **Available Products:**
        {% for product in available_products[:10] %}
        - {{product.name}}: ${{product.price}} ({{product.category}})
        {% endfor %}
        
        Provide 3-5 specific recommendations with reasoning.
      response_format: json
      for_each: "customers"  # Process each customer individually
      parallel: true         # Process multiple customers simultaneously
      temperature: 0.7
```

## Prompt Storage and Batch Processing

### Prompt Storage Configuration

Save prompts and responses for analysis:

```yaml
ai_interface:
  prompt_storage:
    enabled: true
    directory: "./generated_content"
    store_only: false  # Set to true to only store prompts without API calls
    file_format: "{prompt_name}_{timestamp}.md"
    include_metadata: true  # Include context, temperature, etc.
```

### Store-Only Mode

Generate prompts without API calls (useful for testing):

```yaml
ai_interface:
  prompt_storage:
    enabled: true
    store_only: true  # Only store prompts, don't call LLM
    directory: "./prompts"
  
  prompts:
    content_generation:
      system: "You are a creative content writer."
      user_template: |
        Create {{content_type}} content for:
        
        **Topic:** {{topic}}
        **Target Audience:** {{audience}}
        **Tone:** {{tone}}
        **Length:** {{length}} words
        
        Additional context: {{context}}
      for_each: "content_requests"
```

### Batch Processing Features

```yaml
ai_interface:
  prompts:
    analysis_batch:
      system: "You are a data analyst."
      user_template: |
        Analyze this dataset:
        
        ## Data Summary
        - Records: {{count(dataset)}}
        - Fields: {{dataset_fields|join(', ')}}
        
        ## Sample Data
        {% for item in dataset[:5] %}
        - {{item}}
        {% endfor %}
        
        Provide insights and recommendations.
      for_each: "datasets"     # Process each dataset
      parallel: true           # Up to 10 concurrent requests
      response_format: markdown
```

## Context Management

### Default Context

Set global context variables:

```yaml
ai_interface:
  default_context:
    company_name: "{{config.company.name}}"
    industry: "{{config.company.industry}}"
    report_date: "{{now()|date}}"
    fiscal_year: "{{config.fiscal_year}}"
```

### Dynamic Context

Use expressions in context:

```yaml
ai_interface:
  prompts:
    dynamic_analysis:
      system: "You are a business analyst for {{company_name}}."
      user_template: |
        # {{company_name}} Analysis Report
        Generated on: {{report_date}}
        
        ## Data Overview
        - Total Records: {{count(data)}}
        - Date Range: {{min(map(data, 'date'))}} to {{max(map(data, 'date'))}}
        
        {{analysis_request}}
      context:
        analysis_request: "Provide quarterly performance analysis"
```

## Error Handling and Retries

ShedBoxAI includes built-in retry logic for robust API handling:

```yaml
ai_interface:
  retry_config:
    # Retry configuration is supported but uses sensible defaults
    # 3 attempts with exponential backoff for rate limits and API errors
```

The framework automatically handles:
- **Rate limit errors**: Exponential backoff retry
- **API errors**: Automatic retry with backoff
- **Network timeouts**: Built-in retry logic
- **Authentication errors**: Immediate failure (no retry)

## Response Processing

### Response Formats

Configure different response types:

```yaml
ai_interface:
  prompts:
    text_response:
      user_template: "Summarize: {{content}}"
      response_format: text    # Plain text
    
    json_response:
      user_template: "Extract data as JSON: {{content}}"
      response_format: json    # Auto-parsed JSON
    
    markdown_response:
      user_template: "Create report: {{content}}"
      response_format: markdown  # Markdown formatted
    
    html_response:
      user_template: "Generate HTML: {{content}}"
      response_format: html    # HTML formatted
```

Supported response formats: `text`, `json`, `markdown`, `html`

## Template Filters and Functions

### Built-in Filters

Use custom filters in templates:

```yaml
ai_interface:
  prompts:
    formatted_report:
      user_template: |
        # Financial Report
        
        ## Key Metrics
        - Revenue: ${{revenue}}
        - Growth: {{growth}}%
        - Count: {{total}}
        - Date: {{date}}
        
        ## Top Items
        {% for item in top_items|first(5) %}
        - {{item.name}}: ${{item.value}}
        {% endfor %}
```

### Note on Filters

Use the actual implemented filters: `tojson`, `length`, `join`, plus standard Jinja2 filters like `upper`, `lower`, `default`, etc.

## Multi-Provider Support

### OpenAI Configuration

```yaml
ai_interface:
  model:
    type: rest
    url: https://api.openai.com/v1/chat/completions
    headers:
      Authorization: Bearer ${OPENAI_API_KEY}
    options:
      model: gpt-4
      temperature: 0.7
```

### Claude Configuration

```yaml
ai_interface:
  model:
    type: rest
    url: https://api.anthropic.com/v1/messages
    headers:
      Authorization: Bearer ${ANTHROPIC_API_KEY}
      Content-Type: application/json
    options:
      model: claude-3-sonnet-20240229
      max_tokens: 2000
```

### Custom API Configuration

```yaml
ai_interface:
  model:
    type: rest
    url: https://your-custom-api.com/v1/generate
    headers:
      Authorization: Bearer ${CUSTOM_API_KEY}
    options:
      model_name: your-model
      custom_param: value
```

## Production Considerations

### Reliability Features

ShedBoxAI provides robust production capabilities:

- **Automatic Retries**: Built-in retry logic for rate limits and API errors
- **Parallel Processing**: Concurrent API calls with `parallel: true`
- **Batch Processing**: Efficient processing of multiple prompts
- **Prompt Storage**: Save prompts and responses for analysis
- **Environment Variables**: Secure API key management

### Best Practices for Production

```yaml
ai_interface:
  model:
    headers:
      Authorization: Bearer ${API_KEY}  # Use environment variables
  
  prompts:
    your_prompt:
      temperature: 0.3          # Lower temperature for consistency
      max_tokens: 1000          # Set reasonable limits
      parallel: true            # Enable for batch processing
  
  prompt_storage:
    enabled: true              # Store for monitoring and analysis
    directory: "./ai_logs"
```

## Real-World Examples

### Resume Generation

```yaml
ai_interface:
  prompts:
    resume_generator:
      system: "You are a professional resume writer with 10+ years experience."
      user_template: |
        Create a tailored resume for {{name}} applying to {{job_title}}.
        
        **Experience:**
        {% for job in experience %}
        - {{job.title}} at {{job.company}} ({{job.duration}})
          {{job.description}}
        {% endfor %}
        
        **Skills:** {{skills|join(', ')}}
        **Education:** {{education}}
        
        Tailor for: {{job_requirements}}
      response_format: markdown
      for_each: "job_applications"
      parallel: true
```

### Content Analysis

```yaml
ai_interface:
  prompts:
    content_analysis:
      system: "You are a content strategist and data analyst."
      user_template: |
        Analyze this content performance data:
        
        ## Content Metrics
        {% for content in content_data %}
        - **{{content.title}}**
          - Views: {{content.views}}
          - Engagement: {{content.engagement}}%
          - Conversion: {{content.conversion}}%
        {% endfor %}
        
        ## Questions
        1. Which content performs best and why?
        2. What patterns indicate high engagement?
        3. Recommendations for content strategy?
        
        Provide data-driven insights.
      response_format: markdown
```

## Best Practices

### Performance
- Use `parallel: true` for batch processing
- Set appropriate `max_tokens` limits
- Implement rate limiting for API protection
- Cache responses when possible

### Security
- Store API keys in environment variables
- Use least-privilege access tokens
- Monitor API usage and costs
- Implement request logging for auditing

### Reliability
- Configure comprehensive retry logic
- Handle rate limits gracefully
- Validate responses before processing
- Implement fallback strategies

### Cost Management
- Set token limits per request
- Monitor usage patterns
- Use appropriate model sizes
- Implement cost thresholds

## Next Steps

- [Operations](../operations/) - Process AI responses with operations
- [Template Matching](../operations/templates.md) - Advanced templating
- [Examples](../examples/) - Real-world AI integration examples
- [Troubleshooting](../troubleshooting/) - Common AI integration issues