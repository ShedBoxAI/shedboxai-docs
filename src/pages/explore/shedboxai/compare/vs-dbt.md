---
title: "ShedBoxAI vs dbt - Full Pipeline vs SQL Transformation"
description: "Compare ShedBoxAI with dbt. Understand when to use full-pipeline YAML vs SQL-focused transformation."
keywords: [shedboxai vs dbt, dbt alternative, sql transformation, data transformation, etl vs elt]
---

# ShedBoxAI vs dbt

dbt revolutionized SQL-based data transformation. ShedBoxAI offers a broader pipeline framework that includes extraction, AI processing, and more.

## Quick Comparison

| Feature | ShedBoxAI | dbt |
|---------|-----------|-----|
| **Focus** | Full pipeline (E+T+L) | Transformation (T) |
| **Configuration** | YAML | SQL + YAML |
| **Data Sources** | Any (CSV, API, DB) | Warehouse only |
| **AI Integration** | Built-in | Limited |
| **Use Case** | Complete workflows | SQL transformations |

## Key Differences

### Scope of Work

dbt focuses on transforming data already in your warehouse:

```sql
-- models/active_customers.sql
SELECT *
FROM {{ ref('raw_customers') }}
WHERE status = 'active'
```

ShedBoxAI handles the full pipeline including extraction:

```yaml
data_sources:
  customers:
    type: rest
    url: "https://api.example.com/customers"
    headers:
      Authorization: "Bearer ${API_TOKEN}"
    response_path: "data"

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

### AI Processing

ShedBoxAI includes native AI capabilities:

```yaml
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
    sentiment:
      user_template: |
        Analyze sentiment:
        {% for item in feedback %}
        - {{ item.text }}
        {% endfor %}
```

dbt requires external integrations for AI processing.

## Complementary Tools

ShedBoxAI and dbt can work together:
- Use ShedBoxAI for extraction and AI processing
- Use dbt for SQL transformations in your warehouse

## When to Choose dbt

- You work primarily with SQL transformations
- Your data is already in a data warehouse
- You need dbt's testing and documentation features
- Your team thinks in SQL

## When to Choose ShedBoxAI

- You need to extract data from external sources
- You want built-in AI processing
- You prefer a single tool for the full pipeline
- You're not warehouse-centric

## Get Started

- [Quick Start Guide](/docs/getting-started/quick-start)
- [Compare with Airflow](/explore/shedboxai/compare/vs-airflow)
- [View all comparisons](/explore/shedboxai/compare)
