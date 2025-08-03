# Relationship Highlighting

Connect and analyze relationships between different data sources through field linking, pattern detection, and conditional highlighting.

## Overview

Relationship highlighting enables:
- **Field-based linking** between data sources
- **Pattern detection** in datasets
- **Conditional highlighting** of related data
- **Context enrichment** with additional information
- **Derived field creation** from expressions

**Note**: This operation focuses on data relationships and pattern analysis, not SQL-style joins.

## Configuration

```yaml
processing:
  relationship_highlighting:
    source_name:
      link_fields:
        - source: customers
          to: orders
          source_field: customer_id
          target_field: customer_id
      derived_fields:
        - "total_value = item.price * item.quantity"
```

## Field-Based Linking

Link data between sources by matching field values.

### Basic Field Linking

Connect related records using matching field values:

```yaml
processing:
  relationship_highlighting:
    customer_orders:
      link_fields:
        - source: customers
          to: orders
          source_field: customer_id
          target_field: customer_id
```

**Result**: Each customer record gets an `orders_info` field containing matching order data.

### Multiple Field Links

Link multiple data sources:

```yaml
processing:
  relationship_highlighting:
    multi_link:
      link_fields:
        - source: customers
          to: orders
          source_field: customer_id
          target_field: customer_id
        - source: customers
          to: addresses
          source_field: customer_id
          target_field: customer_id
```

## JSONPath Links

Use JSONPath expressions for complex data relationships.

### Basic JSONPath Linking

```yaml
processing:
  relationship_highlighting:
    advanced_links:
      jsonpath_links:
        - source: customers
          target: orders
          source_path: "$.customer_id"
          target_path: "$.customer_id"
          result_field: "related_orders"
```

### Nested Data Linking

```yaml
processing:
  relationship_highlighting:
    nested_relationships:
      jsonpath_links:
        - source: products
          target: reviews
          source_path: "$.product.id"
          target_path: "$.product_reviewed"
          result_field: "product_reviews"
```

## Pattern Detection

Detect patterns and trends in your data.

### Frequency Patterns

Find frequently occurring values:

```yaml
processing:
  relationship_highlighting:
    pattern_analysis:
      pattern_detection:
        frequent_categories:
          type: frequency
          source: products
          field: category
          threshold: 5  # Minimum occurrences
```

**Output**: Creates `products_patterns` with frequency analysis.

### Sequence Patterns

Detect sequential patterns in numeric data:

```yaml
processing:
  relationship_highlighting:
    sequence_analysis:
      pattern_detection:
        order_sequences:
          type: sequence
          source: orders
          field: order_number
          length: 3  # Sequence length
```

**Output**: Creates `orders_sequences` with detected sequences.

## Conditional Highlighting

Highlight data that meets specific conditions.

### Basic Conditional Highlighting

```yaml
processing:
  relationship_highlighting:
    high_value_customers:
      conditional_highlighting:
        - source: customers
          condition: "item.lifetime_value > 10000"
          insight_name: "VIP Customer"
          context: "High-value customer requiring premium service"
```

**Result**: Creates `customers_highlights` with flagged high-value customers.

### Multiple Conditions

```yaml
processing:
  relationship_highlighting:
    customer_insights:
      conditional_highlighting:
        - source: customers
          condition: "item.order_count > 20"
          insight_name: "Frequent Buyer"
          context: "Customer with high purchase frequency"
        - source: customers
          condition: "item.days_since_last_order > 90"
          insight_name: "At Risk"
          context: "Customer may be churning"
```

## Context Additions

Add contextual information to your data.

### Dynamic Context

```yaml
processing:
  relationship_highlighting:
    enriched_data:
      context_additions:
        customers: "Customer since {{item.registration_date}} with {{item.order_count}} orders"
        orders: "Order placed on {{item.date}} for ${{item.total}}"
```

**Result**: Adds `_context` field to each record with processed template.

## Derived Fields

Create new fields using expressions.

### Simple Derived Fields

```yaml
processing:
  relationship_highlighting:
    calculated_fields:
      derived_fields:
        - "total_value = item.price * item.quantity"
        - "profit_margin = (item.selling_price - item.cost) / item.selling_price"
        - "is_premium = item.price > 100"
```

**Result**: Adds calculated fields to all applicable records.

## Real-World Examples

### Customer Analysis

```yaml
processing:
  relationship_highlighting:
    customer_360:
      # Link customers with their orders
      link_fields:
        - source: customers
          to: orders
          source_field: customer_id
          target_field: customer_id
      
      # Highlight VIP customers
      conditional_highlighting:
        - source: customers
          condition: "item.lifetime_value > 5000"
          insight_name: "VIP"
          context: "High-value customer"
      
      # Add contextual information
      context_additions:
        customers: "Customer for {{item.tenure_days}} days, {{item.order_count}} orders"
      
      # Calculate derived metrics
      derived_fields:
        - "avg_order_value = item.total_spent / item.order_count"
        - "customer_tier = item.lifetime_value > 1000 ? 'Premium' : 'Standard'"
```

### Product Performance

```yaml
processing:
  relationship_highlighting:
    product_insights:
      # Detect popular categories
      pattern_detection:
        popular_categories:
          type: frequency
          source: products
          field: category
          threshold: 10
      
      # Highlight top performers
      conditional_highlighting:
        - source: products
          condition: "item.sales_count > 100"
          insight_name: "Top Seller"
          context: "High-performing product"
        - source: products
          condition: "item.rating > 4.5"
          insight_name: "Highly Rated"
          context: "Customer favorite"
      
      # Calculate performance metrics
      derived_fields:
        - "revenue_per_unit = item.total_revenue / item.units_sold"
        - "performance_score = (item.sales_count * item.rating) / 100"
```

### Order Analysis

```yaml
processing:
  relationship_highlighting:
    order_patterns:
      # Link orders with customer data
      link_fields:
        - source: orders
          to: customers
          source_field: customer_id
          target_field: customer_id
      
      # Detect order sequences
      pattern_detection:
        order_trends:
          type: sequence
          source: orders
          field: order_number
          length: 5
      
      # Highlight unusual orders
      conditional_highlighting:
        - source: orders
          condition: "item.amount > 1000"
          insight_name: "Large Order"
          context: "High-value transaction requiring attention"
      
      # Add order context
      context_additions:
        orders: "Order {{item.order_id}} placed by {{item.customer_name}} on {{item.date}}"
```

## Complete Processing Example

```yaml
processing:
  # Step 1: Filter active data
  contextual_filtering:
    active_customers:
      customers:
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
  
  # Step 2: Extract key fields
  format_conversion:
    customer_essentials:
      extract_fields:
        - "customer_id"
        - "name"
        - "lifetime_value"
        - "order_count"
  
  # Step 3: Analyze relationships
  relationship_highlighting:
    customer_analysis:
      # Highlight VIPs
      conditional_highlighting:
        - source: customer_essentials
          condition: "item.lifetime_value > 10000"
          insight_name: "VIP Customer"
          context: "Premium service candidate"
      
      # Calculate metrics
      derived_fields:
        - "avg_order_value = item.lifetime_value / item.order_count"
        - "customer_tier = item.lifetime_value > 5000 ? 'Premium' : 'Standard'"
```

## Output Data Structure

### Link Fields Output
- Creates `{target}_info` field in source records with matched data

### Pattern Detection Output
- Creates `{source}_patterns` with detected frequency patterns
- Creates `{source}_sequences` with detected sequence patterns

### Conditional Highlighting Output
- Creates `{source}_highlights` with flagged records
- Each highlighted record includes `_highlight` metadata

### Context Additions Output
- Adds `_context` field to each record with processed template

### Derived Fields Output
- Adds calculated fields directly to records

## Configuration Reference

```yaml
processing:
  relationship_highlighting:
    source_name:
      # Field-based linking
      link_fields:
        - source: "source_data"
          to: "target_data"
          source_field: "field_name"
          target_field: "field_name"
      
      # JSONPath linking
      jsonpath_links:
        - source: "source_data"
          target: "target_data"
          source_path: "$.field.path"
          target_path: "$.field.path"
          result_field: "linked_data"
      
      # Pattern detection
      pattern_detection:
        pattern_name:
          type: "frequency" | "sequence"
          source: "data_source"
          field: "field_name"
          threshold: 5  # For frequency
          length: 3     # For sequence
      
      # Conditional highlighting
      conditional_highlighting:
        - source: "data_source"
          condition: "expression"
          insight_name: "highlight_name"
          context: "description"
      
      # Context additions
      context_additions:
        data_source: "template with {{item.field}} variables"
      
      # Derived fields
      derived_fields:
        - "field_name = expression"
```

## Best Practices

### Field Linking
- Ensure field types match between source and target
- Use descriptive names for linked data
- Test with sample data to verify relationships

### Pattern Detection
- Choose appropriate thresholds for your data size
- Use frequency patterns for categorical analysis
- Use sequence patterns for ordered numeric data

### Conditional Highlighting
- Write clear, testable conditions
- Provide meaningful insight names and context
- Consider performance impact with large datasets

### Derived Fields
- Use simple expressions for better performance
- Test expressions with representative data
- Consider null/missing value handling

## Next Steps

- [Advanced Operations](./advanced-operations.md) - Further process relationship data
- [Content Summarization](./summarization.md) - Generate statistics from relationship analysis
- [Template Matching](./templates.md) - Format relationship insights into reports
- [Format Conversion](./format-conversion.md) - Extract specific relationship data