# Content Summarization

Generate statistical summaries from your numerical data. Perfect for creating reports and analyzing data patterns with built-in statistical functions.

## Overview

Content summarization provides:
- **Statistical summaries** of numerical data
- **Field-based analysis** with multiple statistics
- **Data aggregation** for reporting and insights
- **Mathematical calculations** on datasets

**Note**: AI-powered summarization is not currently supported. This operation focuses on statistical analysis.

## Configuration

```yaml
processing:
  content_summarization:
    source_name:
      method: statistical
      fields: [field1, field2, field3]
      summarize: [count, sum, mean, min, max]
```

## Statistical Summary

Generate statistical insights from numerical data in your datasets.

### Basic Statistics

Calculate statistics for specific fields:

```yaml
processing:
  content_summarization:
    sales_data:
      method: statistical
      fields: [revenue, units_sold, profit]
      summarize: [count, sum, mean, min, max]
```

**Input data:**
```json
[
  {"revenue": 1000, "units_sold": 50, "profit": 200},
  {"revenue": 1500, "units_sold": 75, "profit": 300},
  {"revenue": 800, "units_sold": 40, "profit": 150}
]
```

**Output:**
```json
{
  "revenue_count": 3,
  "revenue_sum": 3300,
  "revenue_mean": 1100.0,
  "revenue_min": 800,
  "revenue_max": 1500,
  "units_sold_count": 3,
  "units_sold_sum": 165,
  "units_sold_mean": 55.0,
  "units_sold_min": 40,
  "units_sold_max": 75,
  "profit_count": 3,
  "profit_sum": 650,
  "profit_mean": 216.67,
  "profit_min": 150,
  "profit_max": 300
}
```

### Available Statistics

You can calculate these statistical functions:

- **count** - Number of non-null values
- **sum** - Total of all values
- **mean** - Average value
- **min** - Minimum value
- **max** - Maximum value
- **median** - Middle value when sorted
- **std** - Standard deviation
- **unique** - Number of unique values

```yaml
processing:
  content_summarization:
    comprehensive_analysis:
      method: statistical
      fields: [score, rating, price]
      summarize: [count, sum, mean, min, max, median, std, unique]
```

## Real-World Examples

### Sales Performance Analysis

```yaml
processing:
  content_summarization:
    monthly_sales:
      method: statistical
      fields: [total_sales, order_count, avg_order_value]
      summarize: [count, sum, mean, min, max, std]
```

### Customer Analytics

```yaml
processing:
  content_summarization:
    customer_metrics:
      method: statistical
      fields: [lifetime_value, order_frequency, satisfaction_score]
      summarize: [count, mean, median, min, max, std]
```

### Product Performance

```yaml
processing:
  content_summarization:
    product_stats:
      method: statistical
      fields: [views, conversions, revenue_per_product]
      summarize: [count, sum, mean, median, std, unique]
```

### Financial Reporting

```yaml
processing:
  content_summarization:
    quarterly_report:
      method: statistical
      fields: [revenue, expenses, profit_margin, growth_rate]
      summarize: [count, sum, mean, min, max, median]
```

## Complete Processing Example

```yaml
processing:
  # Step 1: Filter to active customers
  contextual_filtering:
    active_customers:
      customers:
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
  
  # Step 2: Extract key metrics
  format_conversion:
    customer_metrics:
      extract_fields:
        - "customer_id"
        - "lifetime_value"
        - "order_count"
        - "avg_order_value"
  
  # Step 3: Generate statistical summary
  content_summarization:
    customer_analysis:
      method: statistical
      fields: [lifetime_value, order_count, avg_order_value]
      summarize: [count, sum, mean, median, min, max, std]
```

## Data Requirements

### Supported Data Types
- **Numeric fields**: integers, floats, numeric strings
- **List data**: Works with lists of dictionaries
- **Missing values**: Automatically handles null/missing values

### Data Preparation
```yaml
# Ensure your data is in the right format
processing:
  contextual_filtering:
    clean_data:
      raw_data:
        - field: amount
          condition: "> 0"  # Remove zero values
          new_name: "valid_amounts"
  
  content_summarization:
    amount_stats:
      method: statistical
      fields: [amount]
      summarize: [count, sum, mean, std]
```

## Output Format

Statistical summaries are added to your data with this naming pattern:
- `{field_name}_{statistic}` - e.g., `revenue_mean`, `sales_count`, `price_median`

The original data remains unchanged, and summary statistics are added as a new data source named `{source_name}_summary`.

```yaml
# If you process a source called "sales_data"
# The output will be available as "sales_data_summary"
```

## Error Handling

### Non-Numeric Data
- Non-numeric values are automatically skipped
- Statistics are calculated only on valid numeric values
- Empty results return no statistics for that field

### Missing Fields
- Fields that don't exist in the data are skipped
- No error is thrown for missing fields
- Only valid fields generate statistics

### Edge Cases
- **Single value**: Standard deviation returns 0.0
- **No valid values**: Field statistics are skipped
- **All null values**: Field statistics are skipped

## Best Practices

### Field Selection
- Choose fields that contain meaningful numeric data
- Avoid text fields unless counting unique values
- Use descriptive field names for clarity

### Statistic Selection
- Use `count` to understand data completeness
- Use `mean` and `median` to understand central tendency
- Use `std` to understand data variability
- Use `min` and `max` to understand data ranges

### Performance
- Process smaller datasets when possible
- Select only needed statistics to improve performance
- Consider filtering data before summarization

## Configuration Reference

```yaml
processing:
  content_summarization:
    source_data_name:
      method: statistical          # Required: must be "statistical"
      fields: [field1, field2]     # Required: list of field names to analyze
      summarize: [stat1, stat2]    # Required: list of statistics to calculate
```

**Available Statistics:**
- `count` - Count of non-null values
- `sum` - Sum of all values
- `mean` - Average value
- `min` - Minimum value
- `max` - Maximum value
- `median` - Median value
- `std` - Standard deviation
- `unique` - Count of unique values

## Next Steps

- [Advanced Operations](./advanced-operations.md) - Further aggregate and analyze summary data
- [Template Matching](./templates.md) - Format summary statistics into reports
- [Format Conversion](./format-conversion.md) - Extract specific summary fields
- [Relationship Highlighting](./relationships.md) - Combine summaries with other data sources