---
description: Transform 2-4 hours of manual YAML writing into 5-10 minutes with Claude Code AI integration. The only data framework with AI-powered configuration generation.
keywords: [claude code integration, ai powered configuration, automated yaml generation, ai data pipeline, shedboxai claude, configuration automation]
---

# Using ShedBoxAI with Claude Code

:::tip The Game Changer
Transform **2-4 hours of manual YAML writing** into **5-10 minutes** with Claude Code's AI-powered configuration generation. The only data processing framework with built-in AI assistance.
:::

:::danger Essential Resource Required
**Get the AI Assistant Guide** - This mandatory document must be provided to your LLM of choice:
```bash
# Get the latest guide with enhanced features (recommended):
shedboxai guide --save ai-assistant-guide.md

# Or download directly: /AI_ASSISTANT_GUIDE.txt
```
The guide contains complete configuration syntax, operation patterns, examples, and new features like Variable Lifecycle, Defensive Template Patterns, and Data Flow understanding.
:::

## Why This Changes Everything

### The Traditional Way ❌
**2-4 Hours of Manual Work:**
- Study documentation to understand YAML syntax
- Figure out data source connections  
- Write complex filtering expressions
- Debug configuration errors
- Test and iterate multiple times

### The ShedBoxAI + Claude Code Way ✅
**5-10 Minutes Total:**
1. Run introspection: `shedboxai introspect config.yaml --include-samples -o analysis.md`
2. Feed both the AI Assistant Guide and introspection results to Claude Code
3. Ask: "Create a ShedBoxAI config that analyzes customer behavior"
4. Get production-ready configuration instantly
5. Run and see results

## Live Tutorial: Customer Analysis Pipeline

### What You'll Build
By the end of this tutorial, you'll have a complete data analysis pipeline that:
- Processes customer data automatically
- Identifies high-value customer segments
- Generates AI-powered business insights
- **All created in under 10 minutes with Claude Code**

### Step 1: Create Sample Data

Create a basic ShedBoxAI configuration with your data sources:

**config.yaml**:
```yaml
# Basic configuration - just define your data sources
data_sources:
  customers:
    type: csv
    path: data/customers.csv
  
  orders:
    type: json
    path: data/orders.json
```

**data/customers.csv**:
```csv
customer_id,name,email,total_spent,last_purchase_date,status
1001,Sarah Johnson,sarah.j@email.com,2450.00,2024-06-15,active
1002,Mike Chen,mike.chen@email.com,890.50,2024-05-22,active
1003,Emily Rodriguez,emily.r@email.com,5620.00,2024-07-01,premium
1004,David Wilson,david.w@email.com,340.25,2024-03-10,inactive
1005,Lisa Thompson,lisa.t@email.com,1750.00,2024-06-20,active
```

**data/orders.json**:
```json
[
  {
    "order_id": "ORD-2024-001",
    "customer_id": 1001,
    "amount": 150.00,
    "date": "2024-06-15",
    "category": "electronics",
    "product": "Wireless Headphones"
  },
  {
    "order_id": "ORD-2024-002",
    "customer_id": 1003,
    "amount": 320.00,
    "date": "2024-07-01",
    "category": "fashion",
    "product": "Designer Jacket"
  }
]
```

### Step 2: Run Data Introspection

ShedBoxAI's introspection feature automatically analyzes your data and generates LLM-optimized documentation:

```bash
# Navigate to your project folder
cd your-project

# Run introspection to generate AI-ready analysis
shedboxai introspect config.yaml --include-samples -o analysis.md
```

**Expected Output** (analysis.md):
```markdown
# Data Source Introspection for LLM
Generated: 2024-07-27T10:30:00
Sources Analyzed: 2/2

## LLM Processing Notes
- Context Window: All datasets are small-medium, direct processing suitable
- Key columns detected: customer_id - suitable for relationship operations
- Numeric columns available: total_spent, amount - suitable for statistical operations
- Categorical columns available: status, category - suitable for grouping operations

## Data Sources

### customers (CSV)
**Status**: ✅ Success
**Size**: 5 records (Small-Medium Dataset)
**Schema**: 6 fields total
**Key Fields**: customer_id (suitable for joins)

**Schema**:
| Field | Type | Description |
|-------|------|-------------|
| customer_id | integer | 5 unique values; e.g. 1001, 1002, 1003 |
| name | string | e.g. Sarah Johnson, Mike Chen, Emily Rodriguez |
| email | string | e.g. user@example.com, user@example.com, user@example.com |
| total_spent | float | Range: 340.25 to 5620.0; e.g. 2450.0, 890.5, 5620.0 |
| last_purchase_date | string | e.g. 2024-06-15, 2024-05-22, 2024-07-01 |
| status | string | e.g. active, active, premium |

**LLM Operation Hints**:
- CSV source suitable for contextual_filtering and advanced_operations
- Primary identifier: `customer_id` (use for joins)
- Consider filtering by status field for active records

### orders (JSON)
**Status**: ✅ Success
**Records**: 2 objects
**Structure**: 6 top-level fields
**Fields**: order_id, customer_id, amount, date, category, product

**LLM Operation Hints**:
- JSON structure suitable for format_conversion operations
- Complex nested data - good for extracting specific fields
- Contains customer_id field suitable for relationship joins

## Detected Relationships
- **customers.customer_id** ↔ **orders.customer_id** (Foreign Key)
  High confidence relationship for customer transaction analysis

## Recommended ShedBoxAI Operations
```yaml
processing:
  contextual_filtering:
    customers:
      - field: status
        condition: "== 'active'"
        new_name: "active_customers"
  
  relationship_highlighting:
    customer_transactions:
      link_fields:
        - source: active_customers
          to: orders
          source_field: customer_id
          target_field: customer_id
```

### Step 3: Generate Configuration with Claude Code

Now comes the magic! First, get the essential AI Assistant Guide:
```bash
# Get the latest enhanced guide:
shedboxai guide --save ai-assistant-guide.md

# Or download: /AI_ASSISTANT_GUIDE.txt
```

Then provide Claude Code with both essential documents:
1. The AI Assistant Guide (ai-assistant-guide.md)
2. Your introspection report (`analysis.md`)

Then use this prompt:

```
Using this ShedBoxAI data introspection, create a configuration that:

1. Filters for active customers with >$1000 total spent
2. Links customer data with their order history using relationship_highlighting
3. Extracts key customer and order information using format_conversion
4. Uses AI interface with store_only mode for learning (no API costs)

[Paste your analysis.md content here]
```

**Claude Code will generate a working configuration like this:**

```yaml
# Generated by Claude Code - Customer Analysis Pipeline
# Based on actual ShedBoxAI introspection data

data_sources:
  customers:
    type: csv
    path: data/customers.csv
      
  orders:
    type: json
    path: data/orders.json

processing:
  # Filter for high-value active customers
  contextual_filtering:
    customers:
      - field: total_spent
        condition: "> 1000"
        new_name: "high_spending_customers"
    
    high_spending_customers:
      - field: status
        condition: "== 'active'"
        new_name: "high_value_customers"
  
  # Link customers with their orders
  relationship_highlighting:
    customer_orders:
      source: high_value_customers
      link_fields:
        - source: high_value_customers
          to: orders
          source_field: customer_id
          target_field: customer_id
      derived_fields:
        customer_tier:
          expression: "total_spent > 5000 ? 'VIP' : (total_spent > 2000 ? 'Premium' : 'Standard')"
  
  # Extract final customer analysis data
  format_conversion:
    customer_analysis:
      source: customer_orders
      extract_fields:
        - customer_id
        - name
        - email
        - total_spent
        - customer_tier
        - order_id
        - amount
        - category

# AI Analysis Configuration with Learning Mode
ai_interface:
  prompt_storage:
    enabled: true
    directory: "generated_prompts"
    store_only: true  # Learning mode - no API costs
    file_format: "customer_analysis_{timestamp}.md"
  
  prompts:
    customer_insights:
      system: |
        You are a customer behavior analyst with expertise in e-commerce analytics.
        Analyze customer data and provide actionable business insights.
        Focus on retention strategies, upselling opportunities, and risk factors.
      
      user_template: |
        # Customer Analysis Data
        {{customer_analysis}}
        
        Please analyze these customer segments and provide:
        1. Key behavior patterns for each tier (VIP, Premium, Standard)
        2. Retention strategies for high-value customers
        3. Upselling opportunities for Standard tier customers
        4. Risk factors and early warning signs for customer churn
        5. Recommended marketing campaigns for each segment
        
        Format your response as actionable business recommendations.
      
      temperature: 0.7
      max_tokens: 1500

output:
  type: file
  path: customer_analysis_results.json
  format: json
```

### Step 4: Learning Mode vs Production Mode

ShedBoxAI's unique `store_only` feature lets you learn prompt engineering without spending money on API calls.

#### Learning Mode (`store_only: true`)
Perfect for understanding and education:

```yaml
ai_interface:
  prompt_storage:
    store_only: true  # Only generate prompts, don't call APIs
```

**Result**: Beautiful, complete prompts saved to files that you can:
- Use manually in ChatGPT or Claude
- Study to learn prompt engineering  
- Modify and improve
- Share with your team

#### Production Mode (`store_only: false`)  
For automated execution with API integration:

```yaml
ai_interface:
  model:
    type: rest
    url: https://api.openai.com/v1/chat/completions
    headers:
      Authorization: Bearer ${OPENAI_API_KEY}
      Content-Type: application/json
    options:
      model: gpt-4
      temperature: 0.7
  
  prompt_storage:
    store_only: false  # Store AND execute prompts
```

**Result**: Full automation with AI responses and prompt storage.

### Step 5: Run Your Configuration

```bash
# Save the generated config as customer-analysis.yaml
# Then run it:

shedboxai run customer-analysis.yaml
```

**Expected Results:**

**Learning Mode Output:**
- Prompt files saved to `generated_prompts/`
- Complete prompts ready for manual use
- No API costs incurred
- `customer_analysis_results.json` with processed data

**Production Mode Output:**
- `customer_analysis_results.json` with AI insights
- Prompt files for reference
- Complete customer segment analysis

## Advanced Features

### Fan-Out Processing
Process each customer individually with AI analysis:

```yaml
ai_interface:
  prompts:
    individual_reports:
      user_template: |
        Customer: {{name}}
        Tier: {{customer_tier}}
        Total Spent: ${{total_spent}}
        
        Generate a personalized customer report.
      
      for_each: customer_analysis  # Process each record individually
      parallel: true              # Use parallel processing for speed
```

### Aggregation Operations
Calculate statistics across customer segments:

```yaml
processing:
  advanced_operations:
    customer_stats:
      source: customer_analysis
      operations:
        - type: aggregation
          group_by: [customer_tier]
          functions:
            - field: total_spent
              operation: AVG
              alias: avg_spending_by_tier
            - field: customer_id
              operation: COUNT
              alias: customers_per_tier
```

## Before vs After Comparison

### Manual Configuration (The Old Way)
```yaml
# 60+ lines of complex YAML requiring deep ShedBoxAI knowledge
# 2-4 hours of development time, multiple iterations to get right

data_sources:
  customers:
    type: csv
    path: data/customers.csv
    options:
      encoding: utf-8
      delimiter: ","
      header: true
      
processing:
  contextual_filtering:
    customers:
      - field: status
        condition: "== 'active'"
        new_name: "active_customers"
        
    active_customers:
      - field: total_spent
        condition: "> 1000.0"
        new_name: "high_value_customers"
          
  relationship_highlighting:
    customer_orders:
      source: high_value_customers
      link_fields:
        - source: high_value_customers
          to: orders
          source_field: customer_id
          target_field: customer_id
      derived_fields:
        customer_tier:
          expression: "total_spent > 5000 ? 'VIP' : (total_spent > 2000 ? 'Premium' : 'Standard')"
        
  format_conversion:
    final_analysis:
      source: customer_orders
      extract_fields:
        - customer_id
        - name
        - email
        - total_spent
        - customer_tier
        - order_id
        - amount

# ... 30+ more lines of AI configuration, error handling, etc.
```

### Claude Code Generated (The New Way)
```yaml
# 30 lines of clean, working YAML generated in 2 minutes
# Professional-grade configuration with learning and production modes

data_sources:
  customers: { type: csv, path: data/customers.csv }
  orders: { type: json, path: data/orders.json }

processing:
  contextual_filtering:
    customers:
      - field: total_spent
        condition: "> 1000"
        new_name: "high_spending_customers"
    
    high_spending_customers:
      - field: status
        condition: "== 'active'"
        new_name: "high_value_customers"
  
  relationship_highlighting:
    customer_orders:
      source: high_value_customers
      link_fields:
        - source: high_value_customers
          to: orders
          source_field: customer_id
          target_field: customer_id
      derived_fields:
        customer_tier:
          expression: "total_spent > 5000 ? 'VIP' : 'Premium'"
  
  format_conversion:
    analysis:
      source: customer_orders
      extract_fields: [customer_id, name, total_spent, customer_tier]

ai_interface:
  prompt_storage: { enabled: true, store_only: true }
  prompts:
    insights:
      system: "You are a customer behavior analyst..."
      user_template: "Analyze: {{analysis}}"

output: { type: file, path: results.json }
```

**Time Saved: 3+ hours → 5 minutes**
**Complexity Reduced: 90+ lines → 30 lines**
**Errors Avoided: Manual debugging → AI-generated accuracy**

## Troubleshooting

### Common Issues

**Q: Introspection command not found**
```bash
# Make sure ShedBoxAI is installed
pip install shedboxai

# Verify installation
shedboxai --version
```

**Q: Claude Code generates config but it doesn't run**
- Ensure file paths are correct relative to your working directory
- Check that sample data files are in the expected location  
- Verify YAML syntax is valid
- Validate against actual ShedBoxAI configuration schema

**Q: Want to use different AI models?**
```yaml
ai_interface:
  model:
    type: rest
    url: https://api.anthropic.com/v1/messages  # Claude API
    # or
    url: https://api.openai.com/v1/chat/completions  # OpenAI API
```

### Best Practices

1. **Start with Learning Mode**: Use `store_only: true` to understand prompts
2. **Test Configuration**: Always validate generated configs with actual data
3. **Use Introspection**: Let introspection guide accurate configuration generation  
4. **Iterate Prompts**: Copy generated prompts to Claude Code for refinement
5. **Graduate to Production**: Switch to `store_only: false` when ready

## Next Steps

### Continue Learning
- **AI Assistant Guide** - Complete LLM cheatsheet for ShedBoxAI configuration generation:
  ```bash
  shedboxai guide --save ai-assistant-guide.md
  ```
  Or [download directly](/AI_ASSISTANT_GUIDE.txt)
- **[Getting Started Guide](./getting-started/installation.md)** - Complete installation and setup
- **[Operations Reference](./operations/index.md)** - Understanding all available operations
- **[Configuration Guide](./configuration/data-sources.md)** - Advanced data source configuration

### Build Something Amazing
Now that you've seen how easy it is, try building:
- **Marketing Campaign Generator** - Personalized email campaigns
- **Sales Lead Scoring** - AI-powered lead qualification  
- **Inventory Optimization** - Demand forecasting and stock management
- **Customer Support Automation** - Intelligent ticket routing

---

:::tip Pro Tip
The `store_only` feature is perfect for learning prompt engineering without API costs. Master your prompts in learning mode, then switch to production for full automation!
:::

**Ready to transform your data processing workflows?** With Claude Code + ShedBoxAI, complex data analysis becomes as simple as asking an AI assistant. **No YAML expertise required.**