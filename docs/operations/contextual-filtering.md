# Contextual Filtering

Advanced data filtering with expression engine integration. Filter your data using conditions and mathematical functions.

## Overview

Contextual filtering allows you to:
- **Filter data** based on field conditions
- **Use expressions** with built-in mathematical and logical functions
- **Create multiple filters** with different criteria
- **Rename filtered datasets** for further processing
- **Apply sequential filtering** for complex logic

## Basic Filtering

### Simple Conditions

Filter data with basic conditions:

```yaml
processing:
  contextual_filtering:
    users:
      - field: age
        condition: "age > 18"
        new_name: "adults"
      
      - field: status
        condition: "status == 'active'"
        new_name: "active_users"
```

### Multiple Field Filtering

Apply multiple filters to the same dataset:

```yaml
processing:
  contextual_filtering:
    customers:
      - field: segment
        condition: "== 'Premium'"
        new_name: "premium_customers"
      
      - field: lifetime_value
        condition: "> 1000"
        new_name: "high_value_customers"
```

## Advanced Conditions

### Mathematical Functions

Use mathematical functions in conditions:

```yaml
processing:
  contextual_filtering:
    transactions:
      - field: amount
        condition: "> 1000"
        new_name: "high_value_transactions"
      
      - field: category
        condition: "== 'premium'"
        new_name: "premium_transactions"
      
      - field: status
        condition: "== 'completed'"
        new_name: "completed_transactions"
```

### Date Filtering

Filter based on date fields:

```yaml
processing:
  contextual_filtering:
    orders:
      - field: order_date
        condition: ">= '2024-01-01'"
        new_name: "recent_orders"
      
      - field: status
        condition: "== 'shipped'"
        new_name: "shipped_orders"
      
      - field: priority
        condition: "== 'high'"
        new_name: "priority_orders"
```

### String Filtering

Filter using string comparisons:

```yaml
processing:
  contextual_filtering:
    products:
      - field: category
        condition: "== 'electronics'"
        new_name: "electronics_products"
      
      - field: name
        condition: "== 'Premium Widget'"
        new_name: "premium_products"
      
      - field: sku
        condition: "!= ''"
        new_name: "products_with_sku"
```

## Multiple Filters for Complex Logic

### Sequential Filtering

To achieve complex logic, use multiple filters in sequence:

```yaml
processing:
  contextual_filtering:
    # Step 1: Filter by segment
    premium_customers:
      customers:
        - field: segment
          condition: "== 'Premium'"
          new_name: "premium_segment"
    
    # Step 2: Filter premium customers by value
    high_value_premium:
      premium_segment:
        - field: lifetime_value
          condition: "> 5000"
          new_name: "high_value_customers"
```

### Multiple Criteria

Apply multiple filters to the same dataset:

```yaml
processing:
  contextual_filtering:
    customer_analysis:
      customers:
        - field: segment
          condition: "== 'Premium'"
          new_name: "premium_customers"
        
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
        
        - field: lifetime_value
          condition: "> 1000"
          new_name: "valuable_customers"
```

### Mathematical Expressions

Use basic mathematical expressions:

```yaml
processing:
  contextual_filtering:
    financial_data:
      - field: amount
        condition: "> 1000"
        new_name: "high_value_items"
      
      - field: profit_margin
        condition: "> 0.15"
        new_name: "profitable_items"
      
      - field: score
        condition: ">= 8.0"
        new_name: "high_scores"
```

## Advanced Examples

### Numeric Range Filtering

Filter based on numeric ranges:

```yaml
processing:
  contextual_filtering:
    employees:
      - field: performance_score
        condition: ">= 9.0"
        new_name: "top_performers"
      
      - field: salary
        condition: "> 75000"
        new_name: "high_earners"
      
      - field: age
        condition: ">= 25"
        new_name: "experienced_employees"
```

### Category Filtering

Filter by specific categories:

```yaml
processing:
  contextual_filtering:
    customer_segments:
      customers:
        - field: segment
          condition: "== 'Premium'"
          new_name: "premium_customers"
        
        - field: region
          condition: "== 'North America'"
          new_name: "na_customers"
        
        - field: status
          condition: "!= 'inactive'"
          new_name: "active_customers"
```

## Field-Specific Filtering

### Numeric Range Filtering

Filter numeric fields with ranges:

```yaml
processing:
  contextual_filtering:
    products:
      - field: price_range
        condition: "price >= 10.00 && price <= 100.00"
        new_name: "mid_range_products"
      
      - field: rating_filter
        condition: "rating >= 4.0 && review_count >= 10"
        new_name: "well_rated_products"
      
      - field: inventory_level
        condition: "stock_quantity > reorder_point * 2"
        new_name: "well_stocked_products"
```

### Status-Based Filtering

Filter by status and category fields:

```yaml
processing:
  contextual_filtering:
    orders:
      - field: priority
        condition: "== 'High'"
        new_name: "high_priority_orders"
      
      - field: payment_status
        condition: "== 'Completed'"
        new_name: "completed_payments"
      
      - field: shipping_cost
        condition: "< 50"
        new_name: "affordable_shipping"
```

## Performance Tips

### Simple Conditions First

Use simple equality checks for better performance:

```yaml
processing:
  contextual_filtering:
    optimized_filter:
      large_dataset:
        - field: status
          condition: "== 'active'"
          new_name: "active_records"
        
        - field: priority
          condition: "== 'high'"
          new_name: "priority_records"
```

### Sequential Filtering

Apply filters in stages to reduce dataset size:

```yaml
processing:
  contextual_filtering:
    # Stage 1: Basic filtering
    stage_1:
      raw_data:
        - field: status
          condition: "== 'active'"
          new_name: "recent_active"
    
    # Stage 2: Further filtering on reduced dataset  
    stage_2:
      recent_active:
        - field: score
          condition: "> 8.0"
          new_name: "high_performers"
```

## Basic Error Handling

### Simple Validation

Use basic conditions to validate data:

```yaml
processing:
  contextual_filtering:
    data_validation:
      data:
        - field: age
          condition: "> 0"
          new_name: "valid_ages"
        
        - field: email
          condition: "!= ''"
          new_name: "non_empty_emails"
        
        - field: value
          condition: ">= 0"
          new_name: "positive_values"
```

## Real-World Examples

### E-commerce Customer Segmentation

```yaml
processing:
  contextual_filtering:
    # Step 1: High-value customers
    high_value:
      customers:
        - field: lifetime_value
          condition: "> 10000"
          new_name: "vip_customers"
    
    # Step 2: Active customers
    active_customers:
      customers:
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
    
    # Step 3: Recent customers
    new_customers:
      customers:
        - field: registration_date
          condition: ">= '2024-01-01'"
          new_name: "new_customers"
```

### Transaction Analysis

```yaml
processing:
  contextual_filtering:
    transaction_filtering:
      transactions:
        # High-value transactions
        - field: amount
          condition: ">= 1000"
          new_name: "high_value_transactions"
        
        # Completed transactions
        - field: status
          condition: "== 'completed'"
          new_name: "completed_transactions"
        
        # Recent transactions
        - field: date
          condition: ">= '2024-01-01'"
          new_name: "recent_transactions"
```

### Content Filtering

```yaml
processing:
  contextual_filtering:
    content_analysis:
      articles:
        # Popular content
        - field: views
          condition: "> 1000"
          new_name: "popular_articles"
        
        # High engagement
        - field: engagement_rate
          condition: "> 0.15"
          new_name: "engaging_content"
        
        # Recent content
        - field: published_date
          condition: ">= '2024-01-01'"
          new_name: "recent_articles"
```

## Available Expression Functions

### Mathematical Functions
- `abs(x)` - Absolute value
- `round(x, digits)` - Round to decimal places
- `min(collection)` - Minimum value
- `max(collection)` - Maximum value
- `avg(collection)` - Average value
- `sum(collection)` - Sum of values

### String Functions
- `upper(string)` - Convert to uppercase
- `lower(string)` - Convert to lowercase
- `length(string)` - String length
- `trim(string)` - Remove whitespace
- `concat(...)` - Concatenate strings
- `substring(string, start, end)` - Extract substring
- `replace(string, old, new)` - Replace text

### Date Functions
- `today()` - Current date
- `now()` - Current timestamp
- `year(date)` - Extract year
- `month(date)` - Extract month
- `day(date)` - Extract day

### Collection Functions
- `count(collection)` - Count items
- `map(collection, field)` - Extract field values
- `filter(collection, field, value)` - Filter by field
- `first(collection)` - First item
- `last(collection)` - Last item

### Logical Functions
- `and(...)` - Logical AND
- `or(...)` - Logical OR
- `not(condition)` - Logical NOT
- `if(condition, true_value, false_value)` - Conditional

### Type Conversion
- `to_string(value)` - Convert to string
- `to_number(value)` - Convert to number
- `to_int(value)` - Convert to integer
- `to_bool(value)` - Convert to boolean

## Best Practices

### Performance
- Put simple conditions before complex ones
- Use statistical functions sparingly on large datasets
- Consider staged filtering for complex conditions
- Index frequently filtered fields when possible

### Readability
- Use descriptive field names for filtered results
- Break complex conditions into multiple stages
- Add comments for complex expressions
- Use consistent naming conventions

### Maintainability
- Avoid hardcoded values; use variables when possible
- Test filter conditions with sample data
- Document business rules behind complex filters
- Use safe functions to handle missing data

## Next Steps

- [Format Conversion](./format-conversion.md) - Transform filtered data
- [Advanced Operations](./advanced-operations.md) - Aggregate and analyze filtered results
- [Relationship Highlighting](./relationships.md) - Link filtered data with other sources
- [Expression Engine](../configuration/expressions.md) - Complete expression reference