---
title: "ShedBoxAI for API Aggregation - Multi-API Data Collection"
description: "Use ShedBoxAI to aggregate data from multiple APIs. Build unified views from REST APIs with YAML configuration."
keywords: [shedboxai api aggregation, multi api, api data collection, rest api pipeline, api integration]
---

# ShedBoxAI for API Aggregation

Aggregate data from multiple APIs with ShedBoxAI. Build unified views from any REST API with simple YAML.

## API Aggregation Use Cases

### Multi-API Dashboard

Combine data from multiple services:

```yaml
data_sources:
  stripe:
    type: rest
    url: "https://api.stripe.com/v1/charges"
    headers:
      Authorization: "Bearer ${STRIPE_SECRET_KEY}"
    response_path: "data"

  hubspot:
    type: rest
    url: "https://api.hubspot.com/crm/v3/objects/deals"
    headers:
      Authorization: "Bearer ${HUBSPOT_ACCESS_TOKEN}"
    response_path: "results"

  zendesk:
    type: rest
    url: "https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json"
    headers:
      Authorization: "Basic ${ZENDESK_AUTH}"
    response_path: "tickets"

processing:
  content_summarization:
    stripe:
      method: "statistical"
      fields: ["amount"]
      summarize: ["sum", "count"]

  content_summarization:
    hubspot:
      method: "statistical"
      fields: ["properties.amount"]
      summarize: ["sum", "count"]

output:
  type: file
  path: "daily_dashboard.json"
  format: json
```

### API with Filtering

Filter API responses before processing:

```yaml
data_sources:
  all_records:
    type: rest
    url: "https://api.example.com/records"
    headers:
      Authorization: "Bearer ${API_KEY}"
    response_path: "data"

processing:
  contextual_filtering:
    all_records:
      - field: "status"
        condition: "active"
        new_name: "active_records"
      - field: "created_at"
        condition: ">2024-01-01"
        new_name: "recent_records"

output:
  type: file
  path: "filtered_records.json"
  format: json
```

### Authentication Types

Support for multiple auth methods:

```yaml
data_sources:
  # Bearer token
  service_a:
    type: rest
    url: "https://api.service-a.com/data"
    headers:
      Authorization: "Bearer ${SERVICE_A_TOKEN}"

  # Basic auth (base64 encoded user:pass)
  service_b:
    type: rest
    url: "https://api.service-b.com/data"
    headers:
      Authorization: "Basic ${SERVICE_B_AUTH}"

  # API key in header
  service_c:
    type: rest
    url: "https://api.service-c.com/data"
    headers:
      X-API-Key: "${SERVICE_C_API_KEY}"

output:
  type: file
  path: "aggregated_data.json"
  format: json
```

### Aggregated Metrics

Calculate metrics across API sources:

```yaml
data_sources:
  orders:
    type: rest
    url: "https://api.shopify.com/orders.json"
    headers:
      X-Shopify-Access-Token: "${SHOPIFY_TOKEN}"
    response_path: "orders"

processing:
  advanced_operations:
    order_metrics:
      source: "orders"
      group_by: "financial_status"
      aggregate:
        order_count: "COUNT(*)"
        total_value: "SUM(total_price)"
        avg_order: "AVG(total_price)"
      sort: "-total_value"

output:
  type: file
  path: "order_metrics.json"
  format: json
```

## Why ShedBoxAI for API Aggregation

| Challenge | Solution |
|-----------|----------|
| Different auth methods | All auth types supported |
| Response parsing | Flexible response_path |
| Rate limiting | Configurable delays |
| Data unification | Relationship highlighting |

## Get Started

```bash
pip install shedboxai
shedboxai run api_pipeline.yaml
```

[Data Sources Documentation →](/docs/configuration/data-sources)
