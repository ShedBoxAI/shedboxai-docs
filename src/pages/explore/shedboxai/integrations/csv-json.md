---
title: "Process CSV & JSON with ShedBoxAI - File Data Pipeline"
description: "Process CSV and JSON files with ShedBoxAI. Filter, transform, aggregate, and add AI insights to file data."
keywords: [shedboxai csv, shedboxai json, csv processing, json pipeline, file data processing]
---

# Process CSV & JSON with ShedBoxAI

ShedBoxAI makes it easy to process CSV and JSON files with powerful transformations and AI.

## CSV Processing

### Basic CSV Pipeline

```yaml
data_sources:
  customers:
    type: csv
    path: "customers.csv"

processing:
  contextual_filtering:
    customers:
      - field: "status"
        condition: "active"
        new_name: "active_customers"

output:
  type: file
  path: "active_customers.json"
  format: json
```

### CSV Options

```yaml
data_sources:
  data:
    type: csv
    path: "data.csv"
    options:
      delimiter: ";"
      encoding: "utf-8"
      header: 0
```

### CSV Aggregation

```yaml
data_sources:
  sales:
    type: csv
    path: "sales.csv"

processing:
  advanced_operations:
    sales_by_region:
      source: "sales"
      group_by: "region"
      aggregate:
        total_sales: "SUM(amount)"
        order_count: "COUNT(*)"
        avg_order: "AVG(amount)"
      sort: "-total_sales"

output:
  type: file
  path: "sales_by_region.json"
  format: json
```

## JSON Processing

### Basic JSON Pipeline

```yaml
data_sources:
  data:
    type: json
    path: "data.json"

processing:
  contextual_filtering:
    data:
      - field: "type"
        condition: "important"
        new_name: "important_items"

output:
  type: file
  path: "filtered.json"
  format: json
```

### Inline JSON Data

```yaml
data_sources:
  sample:
    type: json
    data:
      - name: "Item 1"
        value: 100
      - name: "Item 2"
        value: 200

processing:
  content_summarization:
    sample:
      method: "statistical"
      fields: ["value"]
      summarize: ["sum", "mean", "count"]

output:
  type: file
  path: "summary.json"
  format: json
```

## CSV + AI

```yaml
data_sources:
  reviews:
    type: csv
    path: "reviews.csv"

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
      system: "You are a sentiment analyst."
      user_template: |
        Analyze sentiment in these reviews:

        {% for review in reviews %}
        - {{ review.text }}
        {% endfor %}

        Provide overall sentiment and key themes.

output:
  type: file
  path: "sentiment_analysis.md"
  format: json
```

## Multiple Files

### Join CSV Files

```yaml
data_sources:
  file_a:
    type: csv
    path: "data_a.csv"

  file_b:
    type: csv
    path: "data_b.csv"

processing:
  relationship_highlighting:
    file_a:
      link_fields:
        - source: "file_a"
          source_field: "id"
          to: "file_b"
          target_field: "id"

output:
  type: file
  path: "combined.json"
  format: json
```

## Related

- [ETL Automation Use Case](/explore/shedboxai/use-cases/etl-automation)
- [Data Sources Documentation](/docs/configuration/data-sources)
