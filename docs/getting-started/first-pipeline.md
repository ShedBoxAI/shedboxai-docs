# Your First Pipeline

This comprehensive tutorial will guide you through building a real-world data processing pipeline with ShedBoxAI, including AI integration and advanced features.

## What We'll Build

A customer analysis pipeline that:
- Loads customer and transaction data
- Filters and analyzes the data
- Generates AI-powered insights
- Creates a formatted report

## Prerequisites

- ShedBoxAI installed ([Installation Guide](./installation.md))
- Basic understanding of YAML syntax
- Optional: OpenAI API key for AI features

## Project Setup

Create a new project directory:

```bash
mkdir my-first-pipeline
cd my-first-pipeline
mkdir data output
```

## Step 1: Prepare Sample Data

### Customer Data (`data/customers.csv`)
```csv
id,name,age,city,segment,lifetime_value
1,John Smith,34,New York,Premium,2500.00
2,Sarah Johnson,28,Los Angeles,Standard,1200.00
3,Mike Brown,45,Chicago,Premium,3200.00
4,Lisa Davis,31,Miami,Standard,800.00
5,Tom Wilson,52,Seattle,Enterprise,5500.00
```

### Transaction Data (`data/transactions.json`)
```json
[
  {"customer_id": 1, "amount": 250.00, "date": "2024-01-15", "category": "Software"},
  {"customer_id": 2, "amount": 120.00, "date": "2024-01-16", "category": "Books"},
  {"customer_id": 1, "amount": 450.00, "date": "2024-01-18", "category": "Software"},
  {"customer_id": 3, "amount": 800.00, "date": "2024-01-20", "category": "Consulting"},
  {"customer_id": 5, "amount": 1200.00, "date": "2024-01-22", "category": "Enterprise"}
]
```

## Step 2: Basic Pipeline Configuration

Create `pipeline.yaml`:

```yaml
# Data Sources
data_sources:
  customers:
    type: csv
    path: data/customers.csv
  
  transactions:
    type: json
    path: data/transactions.json

# Basic Processing
processing:
  # Filter high-value customers
  contextual_filtering:
    customers:
      - field: lifetime_value
        condition: "> 1000"
        new_name: "high_value_customers"
  
  # Calculate transaction statistics
  content_summarization:
    transactions:
      method: statistical
      fields: ["amount"]
      summarize: ["mean", "sum", "count", "max"]

# Output Results
output:
  type: file
  path: output/basic_results.json
  format: json
```

### Test Basic Pipeline

```bash
shedboxai run pipeline.yaml -v
```

## Step 3: Add Advanced Operations

Enhance the pipeline with data relationships and advanced operations:

```yaml
# Data Sources (same as above)
data_sources:
  customers:
    type: csv
    path: data/customers.csv
  
  transactions:
    type: json
    path: data/transactions.json

# Advanced Processing
processing:
  # Filter valuable customers
  contextual_filtering:
    customers:
      - field: lifetime_value
        condition: "> 1000"
        new_name: "valuable_customers"
  
  # Link customers with their transactions
  relationship_highlighting:
    valuable_customers:
      link_fields:
        - source: "valuable_customers"
          match_on: "id"
          to: "transactions"
          target_field: "customer_id"
          link_name: "customer_transactions"
  
  # Analyze spending by customer segment
  advanced_operations:
    valuable_customers:
      source: "valuable_customers"
      group_by: "segment"
      aggregate:
        customer_count: "COUNT(*)"
        avg_lifetime_value: "AVG(lifetime_value)"
        total_value: "SUM(lifetime_value)"
      sort: "-total_value"
  
  # Create formatted customer profiles
  format_conversion:
    valuable_customers:
      template: |
        ## {{item.name}} (ID: {{item.id}})
        - **Age**: {{item.age}} years
        - **Location**: {{item.city}}
        - **Segment**: {{upper(item.segment)}}
        - **Lifetime Value**: ${{item.lifetime_value}}
        - **Transactions**: {{count(item.customer_transactions)}} orders

output:
  type: file
  path: output/advanced_results.json
  format: json
```

### Test Advanced Pipeline

```bash
shedboxai run pipeline.yaml -o output/advanced_analysis.json -v
```

## Step 4: Add AI Integration

Add AI-powered insights (requires OpenAI API key):

### Environment Setup
Create `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Enhanced Configuration
```yaml
# Data Sources (same as above)
data_sources:
  customers:
    type: csv
    path: data/customers.csv
  
  transactions:
    type: json
    path: data/transactions.json

# Processing with AI
processing:
  # Previous operations...
  contextual_filtering:
    customers:
      - field: lifetime_value
        condition: "> 1000"
        new_name: "valuable_customers"
  
  advanced_operations:
    valuable_customers:
      source: "valuable_customers"
      group_by: "segment"
      aggregate:
        customer_count: "COUNT(*)"
        avg_lifetime_value: "AVG(lifetime_value)"
        total_value: "SUM(lifetime_value)"
      sort: "-total_value"

# AI Interface Configuration
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
      max_tokens: 1500
  
  prompts:
    customer_insights:
      system: "You are a senior business analyst specializing in customer analytics."
      user_template: |
        # Customer Analysis Data
        
        ## Customer Segments
        {% for segment in segment_analysis %}
        - **{{segment.segment}}**: {{segment.customer_count}} customers, 
          Avg Value: ${{segment.avg_lifetime_value}}, 
          Total: ${{segment.total_value}}
        {% endfor %}
        
        ## High-Value Customers
        Total valuable customers: {{count(valuable_customers)}}
        
        Based on this data, please provide:
        1. Key insights about customer segments
        2. Recommendations for customer retention
        3. Growth opportunities
        
        Format as a professional business report.
      response_format: markdown
      temperature: 0.3

output:
  type: file
  path: output/ai_insights.json
  format: json
```

### Run AI-Enhanced Pipeline

```bash
shedboxai run pipeline.yaml -o output/complete_analysis.json -v
```

## Step 5: Understanding the Results

### Output Structure
Your results will contain:
- Filtered customer data
- Statistical analysis
- Segment analysis
- Customer profiles
- AI-generated insights

### Sample AI Output
```markdown
# Customer Analysis Report

## Key Insights
1. **Premium Segment Dominance**: Premium customers represent the highest value...
2. **Geographic Distribution**: Strong presence in major metropolitan areas...
3. **Age Demographics**: Core customer base in 30-45 age range...

## Recommendations
1. **Retention Strategy**: Focus on Premium segment with personalized offerings...
2. **Expansion Opportunity**: Target similar demographics in untapped cities...
```

## Key Learning Points

### 1. Progressive Enhancement
Start simple and add complexity:
- Basic filtering → Advanced operations → AI integration

### 2. Data Flow
Understand how data flows through operations:
```
Raw Data → Filter → Link → Aggregate → Format → AI Analysis
```

### 3. Expression Power
Use expressions for dynamic filtering:
```yaml
condition: "lifetime_value > avg(map(customers, 'lifetime_value'))"
```

### 4. Template Flexibility
Create rich formatted output:
```yaml
template: "{{item.name}} (${{item.value|currency}})"
```

## Common Patterns

### Error Handling
```bash
# Run with verbose logging
shedboxai run pipeline.yaml -v

# Continue on errors (for development)
shedboxai run pipeline.yaml --skip-errors
```

### Incremental Development
```bash
# Test each step
shedboxai run basic_pipeline.yaml
shedboxai run advanced_pipeline.yaml  
shedboxai run ai_pipeline.yaml
```

### Output Formats
```yaml
# JSON for programmatic use
output:
  type: file
  path: output/data.json
  format: json

# YAML for readability
output:
  type: file 
  path: output/data.yaml
  format: yaml
```

## Next Steps

Now that you've built your first pipeline, explore:

- [Configuration Reference](../configuration/) - Complete configuration options
- [Operations Guide](../operations/) - All available operations
- [Introspection](../introspection/) - Analyze your data sources
- [Examples](../examples/) - Real-world use cases
- [CLI Reference](../cli-reference/) - All command options

## Troubleshooting

If you encounter issues:

1. **Check your YAML syntax** - Use a YAML validator
2. **Verify file paths** - Ensure data files exist
3. **Check environment variables** - Verify API keys are set
4. **Use verbose mode** - Add `-v` flag for detailed logs
5. **Review [Troubleshooting Guide](../troubleshooting/)**

Congratulations! You've built a complete data processing pipeline with ShedBoxAI. 🎉