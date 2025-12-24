---
title: "Connect MySQL with ShedBoxAI - SQL Database Pipeline"
description: "Integrate MySQL with ShedBoxAI. Export query results and build automated data pipelines."
keywords: [shedboxai mysql, mysql integration, mysql export, sql pipeline, database export]
---

# Connect MySQL with ShedBoxAI

Export data from MySQL and process it with ShedBoxAI pipelines.

## Quick Start

Export data to CSV, then process:

```yaml
data_sources:
  query_results:
    type: csv
    path: "mysql_export.csv"

processing:
  contextual_filtering:
    query_results:
      - field: "active"
        condition: "1"
        new_name: "active_records"

output:
  type: file
  path: "processed_data.csv"
  format: json
```

## Export from MySQL

```bash
# Export query to CSV
mysql -h localhost -u user -p mydb -e \
  "SELECT * FROM customers" | tr '\t' ',' > mysql_export.csv

# Process with ShedBoxAI
shedboxai run pipeline.yaml
```

## Automated Pipeline

```bash
#!/bin/bash
# daily_export.sh

mysql -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASS $MYSQL_DB -e \
  "SELECT * FROM orders WHERE DATE(created_at) = CURDATE()" \
  | tr '\t' ',' > daily_orders.csv

shedboxai run daily_pipeline.yaml
```

## Process Exported Data

### Filter and Aggregate

```yaml
data_sources:
  orders:
    type: csv
    path: "mysql_export.csv"

processing:
  contextual_filtering:
    orders:
      - field: "status"
        condition: "completed"
        new_name: "completed_orders"

  advanced_operations:
    order_summary:
      source: "completed_orders"
      group_by: "customer_id"
      aggregate:
        total_spent: "SUM(amount)"
        order_count: "COUNT(*)"
      sort: "-total_spent"
      limit: 100

output:
  type: file
  path: "customer_summary.json"
  format: json
```

### AI Analysis

```yaml
data_sources:
  customers:
    type: csv
    path: "mysql_export.csv"

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
    segment:
      system: "You are a customer analytics expert."
      user_template: |
        Segment these customers based on their data:

        {% for customer in customers %}
        - {{ customer.name }}: ${{ customer.total_spent }}, {{ customer.orders }} orders
        {% endfor %}

        Provide segmentation recommendations.

output:
  type: file
  path: "customer_segments.md"
  format: json
```

## Related

- [PostgreSQL Integration](/explore/shedboxai/integrations/postgresql)
- [ETL Automation Use Case](/explore/shedboxai/use-cases/etl-automation)
