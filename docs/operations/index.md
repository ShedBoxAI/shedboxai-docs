# Operations Overview

ShedBoxAI provides powerful data processing operations that can be combined to create sophisticated data pipelines. Each operation specializes in a specific aspect of data transformation and analysis.

## Core Operations

### [Contextual Filtering](./contextual-filtering.md)
Filter and select data based on field conditions and expressions.

**Use Cases:**
- Remove invalid or incomplete records
- Select specific data subsets (active customers, recent orders)
- Apply business rules and validation
- Data quality enforcement

**Example:**
```yaml
processing:
  contextual_filtering:
    active_customers:
      customers:
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
        - field: lifetime_value
          condition: "> 1000"
          new_name: "valuable_customers"
```

### [Format Conversion](./format-conversion.md)
Transform data structure and extract fields or apply templates.

**Use Cases:**
- Data field extraction and selection
- Template-based data formatting
- Data structure simplification
- Variable substitution

**Example:**
```yaml
processing:
  format_conversion:
    customer_essentials:
      extract_fields:
        - "customer_id"
        - "name"
        - "email"
        - "lifetime_value"
```

### [Content Summarization](./summarization.md)
Generate statistical summaries from numerical data.

**Use Cases:**
- Statistical analysis and reporting
- Data aggregation and insights
- Performance metrics calculation
- Numerical data analysis

**Example:**
```yaml
processing:
  content_summarization:
    sales_stats:
      method: statistical
      fields: [revenue, order_count, avg_order_value]
      summarize: [count, sum, mean, min, max, std]
```

### [Relationship Highlighting](./relationships.md)
Connect data sources and detect patterns through field linking and analysis.

**Use Cases:**
- Data source linking and relationships
- Pattern detection in datasets
- Conditional data highlighting
- Context enrichment

**Example:**
```yaml
processing:
  relationship_highlighting:
    customer_analysis:
      link_fields:
        - source: customers
          to: orders
          source_field: customer_id
          target_field: customer_id
      conditional_highlighting:
        - source: customers
          condition: "item.lifetime_value > 10000"
          insight_name: "VIP Customer"
```

### [Template Matching](./templates.md)
Generate formatted output using Jinja2 templates.

**Use Cases:**
- Report generation and formatting
- Document creation from data
- Email and message templating
- Custom output formatting

**Example:**
```yaml
processing:
  template_matching:
    customer_report:
      template: |
        # Customer Report: {{customer.name}}
        
        - Email: {{customer.email}}
        - Status: {{customer.status}}
        - Lifetime Value: ${{customer.lifetime_value}}
        
        {% if customer.lifetime_value > 5000 %}
        **VIP Customer**
        {% endif %}
```

### [Advanced Operations](./advanced-operations.md)
Perform grouping, aggregation, sorting, and limiting operations.

**Use Cases:**
- Data grouping and aggregation
- Top N analysis and ranking
- Statistical grouping by categories
- Data sorting and limiting

**Example:**
```yaml
processing:
  advanced_operations:
    top_categories:
      source: products
      group_by: "category"
      aggregate:
        total_sales: "sum"
        product_count: "count"
      sort: "total_sales desc"
      limit: 10
```

## Operation Composition

Operations can be chained together to create sophisticated processing pipelines:

```yaml
processing:
  # Step 1: Clean and filter the data
  contextual_filtering:
    clean_data:
      raw_customers:
        - field: email
          condition: "!= ''"
          new_name: "valid_customers"
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
  
  # Step 2: Extract essential fields
  format_conversion:
    customer_essentials:
      extract_fields:
        - "customer_id"
        - "name"
        - "email"
        - "lifetime_value"
        - "order_count"
  
  # Step 3: Add relationship context
  relationship_highlighting:
    enriched_customers:
      conditional_highlighting:
        - source: customer_essentials
          condition: "item.lifetime_value > 5000"
          insight_name: "VIP"
          context: "High-value customer"
      derived_fields:
        - "avg_order_value = item.lifetime_value / item.order_count"
  
  # Step 4: Generate statistical summary
  content_summarization:
    customer_stats:
      method: statistical
      fields: [lifetime_value, order_count, avg_order_value]
      summarize: [count, mean, median, min, max, std]
  
  # Step 5: Create formatted report
  template_matching:
    final_report:
      template: |
        # Customer Analysis Report
        
        ## Summary Statistics
        - Total Customers: {{customer_stats.lifetime_value_count}}
        - Average Lifetime Value: ${{customer_stats.lifetime_value_mean|round(2)}}
        - Average Orders: {{customer_stats.order_count_mean|round(1)}}
        
        ## VIP Customers
        {% for customer in enriched_customers_highlights %}
        - **{{customer.name}}** ({{customer.email}})
          - Value: ${{customer.lifetime_value}}
          - Orders: {{customer.order_count}}
        {% endfor %}
```

## Best Practices

### Operation Ordering
1. **Filter Early**: Apply contextual filtering to reduce dataset size
2. **Extract Needed Fields**: Use format conversion to simplify data structure
3. **Add Context**: Use relationship highlighting for enrichment and analysis
4. **Aggregate**: Apply advanced operations for grouping and statistics
5. **Summarize**: Generate statistical summaries for insights
6. **Format Output**: Use template matching for final presentation

### Performance Optimization
- **Filter first** to reduce data size for subsequent operations
- **Extract only needed fields** to minimize memory usage
- **Use appropriate data types** for sorting and aggregation
- **Apply operations in logical sequence** for best performance

### Error Handling
- **Validate data sources** before processing
- **Test configurations** with sample data
- **Monitor processing logs** for warnings and errors
- **Handle missing fields** gracefully in templates and conditions

## Configuration Patterns

### Basic Linear Pipeline
```yaml
processing:
  contextual_filtering:
    # Filter operations
  format_conversion:
    # Field extraction or templating
  content_summarization:
    # Statistical analysis
```

### Analysis and Reporting Pipeline
```yaml
processing:
  contextual_filtering:
    # Data cleaning and filtering
  relationship_highlighting:
    # Pattern detection and highlighting
  advanced_operations:
    # Grouping and aggregation
  template_matching:
    # Report generation
```

### Data Processing and Statistics
```yaml
processing:
  format_conversion:
    # Field extraction
  advanced_operations:
    # Grouping and top N analysis
  content_summarization:
    # Statistical summaries
```

## Getting Started

1. **Start Simple**: Begin with a single operation on sample data
2. **Use Basic Filtering**: Apply contextual filtering to understand your data
3. **Extract Key Fields**: Use format conversion to focus on important data
4. **Add Analysis**: Incorporate relationship highlighting or advanced operations
5. **Generate Reports**: Use template matching for formatted output

## Next Steps

- [Configuration Guide](../configuration/data-sources.md) - Setting up data sources
- [Expression Engine](../configuration/expressions.md) - Available functions and expressions
- [Examples](../examples/) - Real-world pipeline examples
- [Troubleshooting](../troubleshooting/) - Common issues and solutions