---
title: "Connect Shopify with ShedBoxAI - E-commerce Data Pipeline"
description: "Integrate Shopify with ShedBoxAI. Export orders, products, and customer data for automated analytics."
keywords: [shedboxai shopify, shopify integration, ecommerce data, order analytics, shopify api]
---

# Connect Shopify with ShedBoxAI

Pull e-commerce data from Shopify and build sales analytics pipelines.

## Quick Start

```yaml
data_sources:
  orders:
    type: rest
    url: "https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-01/orders.json"
    headers:
      X-Shopify-Access-Token: "${SHOPIFY_TOKEN}"
    response_path: "orders"

output:
  type: file
  path: "orders.json"
  format: json
```

## Authentication

```bash
export SHOPIFY_STORE="your-store-name"
export SHOPIFY_TOKEN="shpat_..."
```

## Common Pipelines

### Order Summary

```yaml
data_sources:
  orders:
    type: rest
    url: "https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-01/orders.json"
    headers:
      X-Shopify-Access-Token: "${SHOPIFY_TOKEN}"
    options:
      params:
        status: "any"
        limit: 250
    response_path: "orders"

processing:
  advanced_operations:
    orders_by_status:
      source: "orders"
      group_by: "financial_status"
      aggregate:
        order_count: "COUNT(*)"
        total_revenue: "SUM(total_price)"
      sort: "-total_revenue"

output:
  type: file
  path: "order_summary.json"
  format: json
```

### Inventory Check

```yaml
data_sources:
  products:
    type: rest
    url: "https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-01/products.json"
    headers:
      X-Shopify-Access-Token: "${SHOPIFY_TOKEN}"
    response_path: "products"

processing:
  contextual_filtering:
    products:
      - field: "variants.0.inventory_quantity"
        condition: "< 10"
        new_name: "low_stock"

output:
  type: file
  path: "low_stock_products.json"
  format: json
```

### Sales Insights with AI

```yaml
data_sources:
  orders:
    type: rest
    url: "https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-01/orders.json"
    headers:
      X-Shopify-Access-Token: "${SHOPIFY_TOKEN}"
    options:
      params:
        limit: 50
    response_path: "orders"

ai_interface:
  model:
    type: rest
    url: "https://api.anthropic.com/v1/messages"
    method: POST
    headers:
      x-api-key: "${ANTHROPIC_API_KEY}"
      Content-Type: "application/json"
    options:
      model: "claude-sonnet-4-20250514"

  prompts:
    analyze:
      system: "You are an e-commerce analyst."
      user_template: |
        Analyze these orders and provide sales insights:

        {% for order in orders %}
        - Order {{ order.name }}: ${{ order.total_price }} ({{ order.financial_status }})
        {% endfor %}

        Identify trends and growth opportunities.

output:
  type: file
  path: "sales_insights.md"
  format: json
```

## Related

- [E-commerce Use Case](/explore/shedboxai/use-cases/ecommerce)
- [Stripe Integration](/explore/shedboxai/integrations/stripe)
