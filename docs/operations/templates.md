# Template Matching

Transform data using Jinja2 templates for flexible output formatting. Generate reports, documents, and structured content from your data.

## Overview

Template matching provides:
- **Jinja2 template engine** for flexible formatting
- **Dynamic content generation** from data
- **Variable substitution** and data processing
- **Conditional logic** and loops in templates

## Configuration

```yaml
processing:
  template_matching:
    template_name:
      template: |
        # Report for {{name}}
        
        Total Sales: ${{total_sales}}
        Orders: {{order_count}}
        
        {% for order in orders %}
        - {{order.date}}: ${{order.amount}}
        {% endfor %}
      
      variables:
        report_date: "2024-01-01"
        company: "My Company"
```

## Basic Templates

### Simple Data Formatting
```yaml
processing:
  template_matching:
    customer_summary:
      template: |
        Customer: {{name}}
        Email: {{email}}
        Status: {{status}}
        Last Order: {{last_order_date}}
```

### Template with Variables
```yaml
processing:
  template_matching:
    report_with_vars:
      template: |
        # {{company_name}} Report
        Generated on: {{report_date}}
        
        Customer: {{customer.name}}
        Total Value: ${{customer.lifetime_value}}
      
      variables:
        company_name: "ACME Corp"
        report_date: "2024-01-15"
```

## Advanced Templates

### Conditional Content
```yaml
processing:
  template_matching:
    personalized_message:
      template: |
        Dear {{name}},
        
        {% if tier == 'VIP' %}
        As a VIP customer, you have exclusive access to our premium features.
        {% elif tier == 'Premium' %}
        Thank you for being a Premium member!
        {% else %}
        Welcome to our service!
        {% endif %}
        
        Your account status: {{status}}
```

### Loops and Lists
```yaml
processing:
  template_matching:
    order_summary:
      template: |
        # Order Summary
        
        {% for order in orders %}
        ## Order #{{order.id}}
        - Date: {{order.date}}
        - Amount: ${{order.total}}
        - Items: {{order.items|length}}
        
        {% for item in order.items %}
          - {{item.name}}: {{item.quantity}} x ${{item.price}}
        {% endfor %}
        
        {% endfor %}
```

## Template Files

### Using Template ID
```yaml
processing:
  template_matching:
    from_file:
      template_id: "customer_report_template"
      variables:
        generated_date: "2024-01-01"
```

Place your template file at `customer_report_template.j2` in your working directory.

## Real-World Examples

### Customer Report
```yaml
processing:
  template_matching:
    customer_report:
      template: |
        # Customer Analysis Report
        
        **Customer:** {{customer.name}}
        **ID:** {{customer.id}}
        **Status:** {{customer.status}}
        
        ## Summary
        - Total Orders: {{customer.order_count}}
        - Lifetime Value: ${{customer.lifetime_value}}
        - Average Order: ${{customer.avg_order_value}}
        
        ## Recent Orders
        {% for order in customer.recent_orders %}
        - {{order.date}}: ${{order.amount}} ({{order.status}})
        {% endfor %}
        
        {% if customer.lifetime_value > 1000 %}
        **VIP Customer** - Eligible for premium support
        {% endif %}
      
      variables:
        report_generated: "{{now()}}"
```

### Email Template
```yaml
processing:
  template_matching:
    welcome_email:
      template: |
        Subject: Welcome to {{company_name}}, {{customer.name}}!
        
        Dear {{customer.name}},
        
        Welcome to {{company_name}}! We're excited to have you as a customer.
        
        Your account details:
        - Email: {{customer.email}}
        - Member Since: {{customer.signup_date}}
        - Account Type: {{customer.tier}}
        
        {% if customer.tier == 'Premium' %}
        As a Premium member, you get:
        - Priority support
        - Extended warranty
        - Exclusive discounts
        {% endif %}
        
        Best regards,
        The {{company_name}} Team
      
      variables:
        company_name: "ACME Corporation"
```

### Financial Report
```yaml
processing:
  template_matching:
    financial_report:
      template: |
        # Financial Summary Report
        **Period:** {{period}}
        **Generated:** {{report_date}}
        
        ## Key Metrics
        | Metric | Value |
        |--------|-------|
        | Total Revenue | ${{total_revenue}} |
        | Total Orders | {{total_orders}} |
        | Average Order | ${{avg_order_value}} |
        | Growth Rate | {{growth_rate}}% |
        
        ## Top Products
        {% for product in top_products %}
        {{loop.index}}. **{{product.name}}**
           - Sales: {{product.units_sold}} units
           - Revenue: ${{product.revenue}}
        {% endfor %}
        
        ## Monthly Breakdown
        {% for month in monthly_data %}
        - **{{month.name}}**: ${{month.revenue}} ({{month.growth}}% growth)
        {% endfor %}
      
      variables:
        period: "Q1 2024"
        report_date: "2024-04-01"
```

## Template Features

### Built-in Jinja2 Features
- `{% if condition %}...{% endif %}` - Conditional blocks
- `{% for item in list %}...{% endfor %}` - Loops
- `{{variable}}` - Variable substitution
- `{{list|length}}` - Built-in filters
- `{{loop.index}}` - Loop variables

### Variable Access
- Direct variables: `{{name}}`
- Object properties: `{{customer.name}}`
- List items: `{{orders[0].amount}}`
- Variables from config: `{{company_name}}`

## Complete Processing Example

```yaml
processing:
  # Step 1: Filter and prepare data
  contextual_filtering:
    active_customers:
      customers:
        - field: status
          condition: "== 'active'"
          new_name: "active_customers"
  
  # Step 2: Generate report
  template_matching:
    customer_report:
      template: |
        # Active Customer Report
        **Generated:** {{generated_date}}
        **Total Active Customers:** {{customers|length}}
        
        {% for customer in customers %}
        ## {{customer.name}}
        - Email: {{customer.email}}
        - Orders: {{customer.order_count}}
        - Value: ${{customer.lifetime_value}}
        
        {% endfor %}
      
      variables:
        generated_date: "2024-01-15"
```

## Configuration Reference

```yaml
processing:
  template_matching:
    template_name:
      # Option 1: Inline template
      template: |
        Your Jinja2 template content here
        {{variable_name}}
      
      # Option 2: Template file
      template_id: "template_filename"  # Looks for template_filename.j2
      
      # Optional: Additional variables
      variables:
        key1: "value1"
        key2: "value2"
```

## Best Practices

### Template Design
- Use clear, descriptive variable names
- Add comments for complex logic
- Test templates with sample data
- Keep templates focused and modular

### Performance
- Avoid complex calculations in templates
- Use simple variable access patterns
- Consider template caching for repeated use

### Maintainability
- Use template files for complex templates
- Document template variables and expected data structure
- Use consistent formatting and styling

## Next Steps

- [Format Conversion](./format-conversion.md) - Prepare data for template processing
- [Content Summarization](./summarization.md) - Generate data summaries for templates
- [Advanced Operations](./advanced-operations.md) - Process template output further