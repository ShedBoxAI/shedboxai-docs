---
title: "Connect PostgreSQL with ShedBoxAI - SQL Database Pipeline"
description: "Integrate PostgreSQL with ShedBoxAI. Export query results and build automated data pipelines."
keywords: [shedboxai postgresql, postgres integration, postgresql export, sql pipeline, database export]
---

# Connect PostgreSQL with ShedBoxAI

Export data from PostgreSQL and process it with ShedBoxAI pipelines.

## Quick Start

Export data to CSV, then process:

```yaml
data_sources:
  query_results:
    type: csv
    path: "postgres_export.csv"

processing:
  contextual_filtering:
    query_results:
      - field: "status"
        condition: "active"
        new_name: "active_records"

output:
  type: file
  path: "processed_data.csv"
  format: json
```

## Export from PostgreSQL

```bash
# Export query to CSV
psql -h localhost -d mydb -c "COPY (SELECT * FROM users) TO STDOUT WITH CSV HEADER" > postgres_export.csv

# Then process with ShedBoxAI
shedboxai run pipeline.yaml
```

## Automated Export Script

Create a script for automated exports:

```bash
#!/bin/bash
# export_and_process.sh

# Export from Postgres
psql -h $PG_HOST -d $PG_DB -U $PG_USER -c \
  "COPY (SELECT * FROM orders WHERE created_at > NOW() - INTERVAL '1 day') TO STDOUT WITH CSV HEADER" \
  > daily_orders.csv

# Process with ShedBoxAI
shedboxai run daily_pipeline.yaml
```

## Process Exported Data

### Filter and Summarize

```yaml
data_sources:
  orders:
    type: csv
    path: "postgres_export.csv"

processing:
  content_summarization:
    orders:
      method: "statistical"
      fields: ["amount", "quantity"]
      summarize: ["sum", "count", "mean", "min", "max"]

output:
  type: file
  path: "order_stats.json"
  format: json
```

### Group and Aggregate

```yaml
data_sources:
  orders:
    type: csv
    path: "postgres_export.csv"

processing:
  advanced_operations:
    sales_by_region:
      source: "orders"
      group_by: "region"
      aggregate:
        total_revenue: "SUM(amount)"
        order_count: "COUNT(*)"
        avg_order: "AVG(amount)"
      sort: "-total_revenue"

output:
  type: file
  path: "sales_by_region.json"
  format: json
```

### AI Analysis

```yaml
data_sources:
  orders:
    type: csv
    path: "postgres_export.csv"

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
      system: "You are a data analyst."
      user_template: |
        Analyze this order data:

        {% for order in orders %}
        - Order {{ order.id }}: ${{ order.amount }} from {{ order.region }}
        {% endfor %}

        Provide trends and insights.

output:
  type: file
  path: "order_analysis.md"
  format: json
```

## Related

- [MySQL Integration](/explore/shedboxai/integrations/mysql)
- [MongoDB Integration](/explore/shedboxai/integrations/mongodb)
