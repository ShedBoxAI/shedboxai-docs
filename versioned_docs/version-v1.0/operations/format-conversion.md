# Format Conversion

Transform your data using field extraction and simple template formatting. Convert data structures and create formatted output from existing data.

## Overview

Format conversion enables you to:
- **Extract specific fields** from data structures
- **Transform data** with simple templates
- **Create formatted output** using variable substitution
- **Process lists and objects** consistently

**Important**: You can use **either** field extraction **or** templates, but not both in the same operation.

## Field Extraction

### Basic Field Extraction

Extract specific fields from data structures:

```yaml
processing:
  format_conversion:
    user_data:
      extract_fields: 
        - "name"
        - "email"
        - "age"
```

### Extracting from Lists

When applied to lists, field extraction creates new objects with only the specified fields:

```yaml
processing:
  format_conversion:
    customer_summary:
      extract_fields:
        - "customer_id"
        - "total_orders"
        - "lifetime_value"
        - "status"
```

**Input:**
```json
[
  {
    "customer_id": "C001",
    "name": "John Doe", 
    "email": "john@example.com",
    "total_orders": 15,
    "lifetime_value": 2500.00,
    "status": "active",
    "internal_notes": "VIP customer"
  }
]
```

**Output:**
```json
[
  {
    "customer_id": "C001",
    "total_orders": 15,
    "lifetime_value": 2500.00,
    "status": "active"
  }
]
```

### Extracting from Objects

For dictionary objects, extract specified fields:

```yaml
processing:
  format_conversion:
    api_response:
      extract_fields:
        - "user_id"
        - "created_at"
        - "status"
```

## Template Processing

### Simple Templates

Transform data using variable substitution templates:

```yaml
processing:
  format_conversion:
    user_profiles:
      template: "{{item.name}} ({{item.age}} years old)"
```

**Important**: Templates only work with **list data**. Each item in the list is available as `{{item}}`.

### Multi-Line Templates

Create formatted text blocks:

```yaml
processing:
  format_conversion:
    customer_cards:
      template: |
        Customer: {{item.name}}
        Email: {{item.email}}
        Status: {{item.status}}
        Orders: {{item.total_orders}}
```

### Variable Access

Access nested data using dot notation:

```yaml
processing:
  format_conversion:
    formatted_orders:
      template: |
        Order #{{item.order_id}}
        Customer: {{item.customer.name}}
        Amount: ${{item.amount}}
        Date: {{item.created_date}}
```

## Real-World Examples

### Customer Summary Cards

```yaml
processing:
  format_conversion:
    customer_summaries:
      template: |
        **{{item.name}}** (ID: {{item.customer_id}})
        - Email: {{item.email}}
        - Status: {{item.status}}
        - Total Orders: {{item.order_count}}
        - Lifetime Value: ${{item.lifetime_value}}
```

### Product Listings

```yaml
processing:
  format_conversion:
    product_catalog:
      template: |
        **{{item.name}}**
        Price: ${{item.price}}
        Category: {{item.category}}
        SKU: {{item.sku}}
        {{item.description}}
```

### Order Processing

```yaml
processing:
  format_conversion:
    order_confirmations:
      template: |
        Order Confirmation #{{item.order_id}}
        
        Customer: {{item.customer_name}}
        Email: {{item.customer_email}}
        
        Items: {{item.item_count}} items
        Subtotal: ${{item.subtotal}}
        Tax: ${{item.tax}}
        Total: ${{item.total}}
        
        Shipping Address:
        {{item.shipping_address}}
```

### Data Extraction Example

Extract only necessary fields for reporting:

```yaml
processing:
  format_conversion:
    monthly_report:
      extract_fields:
        - "month"
        - "revenue"
        - "new_customers"
        - "churn_rate"
        - "growth_percentage"
```

## Configuration Options

### Field Extraction Configuration

```yaml
processing:
  format_conversion:
    source_name:
      extract_fields:
        - "field1"
        - "field2"
        - "nested.field"
```

### Template Configuration

```yaml
processing:
  format_conversion:
    source_name:
      template: "Your template string with {{item.variables}}"
```

### Complete Processing Example

```yaml
processing:
  # Step 1: Filter data
  contextual_filtering:
    active_customers:
      customers:
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
  
  # Step 2: Extract relevant fields
  format_conversion:
    customer_essentials:
      extract_fields:
        - "customer_id"
        - "name"
        - "email"
        - "total_orders"
  
  # Step 3: Format for output (separate operation)
  customer_reports:
    template: |
      Customer Report: {{item.name}}
      ID: {{item.customer_id}}
      Email: {{item.email}}
      Orders: {{item.total_orders}}
```

## Error Handling

### Missing Fields

If a field doesn't exist, it will be set to `null` in extraction or show as empty in templates:

```yaml
processing:
  format_conversion:
    safe_extraction:
      extract_fields:
        - "name"          # Required field
        - "phone"         # May be missing
        - "description"   # Optional field
```

### Invalid Data Types

- **Field extraction**: Works with dictionaries and lists of dictionaries
- **Templates**: Only work with lists (each item becomes `{{item}}`)

## Best Practices

### Field Extraction
- Extract only the fields you need to reduce data size
- Use clear, descriptive field names
- Consider downstream operations when choosing fields

### Templates
- Keep templates simple and readable
- Use clear variable names
- Test templates with sample data
- Remember templates only work with list data

### Performance
- Field extraction is faster than template processing
- Use extraction for data reduction, templates for formatting
- Process smaller datasets when possible

## Configuration Structure

The `format_conversion` configuration follows this structure:

```yaml
processing:
  format_conversion:
    source_data_name:
      # Option 1: Field extraction (for data reduction)
      extract_fields: ["field1", "field2", "field3"]
      
      # Option 2: Template processing (for formatting)
      template: "Template string with {{item.variables}}"
      
      # Note: Cannot use both extract_fields and template together
```

## Next Steps

- [Content Summarization](./summarization.md) - Generate insights from formatted data
- [Template Matching](./templates.md) - Advanced template processing
- [Advanced Operations](./advanced-operations.md) - Further data processing
- [Relationship Highlighting](./relationships.md) - Link formatted data with other sources