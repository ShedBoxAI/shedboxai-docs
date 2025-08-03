# Advanced Operations

Perform advanced data processing including grouping, aggregation, sorting, and limiting operations on your datasets.

## Overview

Advanced operations provide:
- **Data grouping** by field values
- **Aggregation functions** for grouped data
- **Sorting** by field values
- **Data limiting** to specific record counts

## Configuration

```yaml
processing:
  advanced_operations:
    result_name:
      source: source_data
      group_by: "category"
      aggregate:
        total_sales: "sum"
        avg_price: "avg"
        count: "count"
      sort: "total_sales desc"
      limit: 10
```

## Grouping and Aggregation

### Basic Grouping

Group data by a field and calculate aggregates:

```yaml
processing:
  advanced_operations:
    sales_by_category:
      source: products
      group_by: "category"
      aggregate:
        total_revenue: "sum"
        product_count: "count"
        avg_price: "avg"
```

### Multiple Aggregations

Calculate different statistics for grouped data:

```yaml
processing:
  advanced_operations:
    customer_segments:
      source: customers
      group_by: "segment"
      aggregate:
        total_customers: "count"
        avg_lifetime_value: "avg"
        max_order_value: "max"
        min_order_value: "min"
```

## Sorting Operations

### Basic Sorting

Sort data by field values:

```yaml
processing:
  advanced_operations:
    sorted_products:
      source: products
      sort: "price desc"  # Descending by price
```

```yaml
processing:
  advanced_operations:
    sorted_customers:
      source: customers
      sort: "name asc"   # Ascending by name
```

### Sorting with Grouping

Combine grouping with sorting:

```yaml
processing:
  advanced_operations:
    top_categories:
      source: sales_data
      group_by: "category"
      aggregate:
        total_sales: "sum"
      sort: "total_sales desc"
```

## Data Limiting

### Basic Limiting

Limit results to a specific number of records:

```yaml
processing:
  advanced_operations:
    top_10_customers:
      source: customers
      sort: "lifetime_value desc"
      limit: 10
```

### Top N with Grouping

Get top groups after aggregation:

```yaml
processing:
  advanced_operations:
    top_5_categories:
      source: products
      group_by: "category"
      aggregate:
        revenue: "sum"
        count: "count"
      sort: "revenue desc"
      limit: 5
```

## Real-World Examples

### Sales Analysis

```yaml
processing:
  advanced_operations:
    # Top performing products
    top_products:
      source: sales_data
      group_by: "product_name"
      aggregate:
        total_revenue: "sum"
        units_sold: "count"
        avg_price: "avg"
      sort: "total_revenue desc"
      limit: 20
    
    # Regional performance
    regional_summary:
      source: sales_data
      group_by: "region"
      aggregate:
        total_sales: "sum"
        order_count: "count"
        avg_order_value: "avg"
      sort: "total_sales desc"
```

### Customer Analytics

```yaml
processing:
  advanced_operations:
    # Customer segmentation
    customer_tiers:
      source: customers
      group_by: "tier"
      aggregate:
        customer_count: "count"
        avg_lifetime_value: "avg"
        total_revenue: "sum"
      sort: "total_revenue desc"
    
    # Top customers
    vip_customers:
      source: customers
      sort: "lifetime_value desc"
      limit: 50
```

### Product Performance

```yaml
processing:
  advanced_operations:
    # Category analysis
    category_performance:
      source: products
      group_by: "category"
      aggregate:
        product_count: "count"
        avg_rating: "avg"
        total_sales: "sum"
      sort: "total_sales desc"
    
    # Best rated products
    top_rated:
      source: products
      sort: "rating desc"
      limit: 25
```

## Complete Processing Example

```yaml
processing:
  # Step 1: Filter active products
  contextual_filtering:
    active_products:
      products:
        - field: status
          condition: "== 'active'"
          new_name: "active_products"
  
  # Step 2: Group and analyze
  advanced_operations:
    # Category performance
    category_analysis:
      source: active_products
      group_by: "category"
      aggregate:
        total_revenue: "sum"
        product_count: "count"
        avg_price: "avg"
        avg_rating: "avg"
      sort: "total_revenue desc"
    
    # Top individual products
    bestsellers:
      source: active_products
      sort: "sales_count desc"
      limit: 20
  
  # Step 3: Generate summary
  content_summarization:
    overall_stats:
      method: statistical
      fields: [price, rating, sales_count]
      summarize: [count, mean, min, max]
```

## Configuration Options

### Source Configuration
```yaml
advanced_operations:
  result_name:
    source: "source_data_name"  # Required: source data to process
```

### Grouping Configuration
```yaml
advanced_operations:
  result_name:
    group_by: "field_name"      # Field to group by
    aggregate:                  # Aggregation functions
      field_name: "function"    # sum, avg, count, min, max
```

### Sorting Configuration
```yaml
advanced_operations:
  result_name:
    sort: "field_name asc"      # Sort ascending
    sort: "field_name desc"     # Sort descending
```

### Limiting Configuration
```yaml
advanced_operations:
  result_name:
    limit: 10                   # Limit to 10 records
```

## Available Aggregation Functions

- **sum** - Sum of numeric values
- **avg** - Average of numeric values  
- **count** - Count of records in group
- **min** - Minimum value
- **max** - Maximum value

## Sorting Options

- **asc** - Ascending order (lowest to highest)
- **desc** - Descending order (highest to lowest)

## Output Data Structure

### Grouped Data Output
When using `group_by`, each group becomes a record with:
- The grouping field value
- Aggregated values as specified in `aggregate`

### Sorted/Limited Output
- Original data structure preserved
- Records reordered by sort criteria
- Record count reduced by limit

## Best Practices

### Performance
- Apply filtering before advanced operations to reduce data size
- Use appropriate data types for sorting fields
- Consider memory usage with large datasets

### Grouping
- Choose meaningful grouping fields
- Use descriptive names for aggregated fields
- Validate that grouping fields exist in the data

### Sorting
- Specify sort direction explicitly (asc/desc)
- Test sorting with sample data
- Handle null/missing values in sort fields

### Limiting
- Use with sorting for meaningful "top N" results
- Consider pagination for large result sets
- Document the business logic behind limit choices

## Next Steps

- [Content Summarization](./summarization.md) - Generate statistics from processed data
- [Template Matching](./templates.md) - Format advanced operation results
- [Format Conversion](./format-conversion.md) - Extract specific fields from results