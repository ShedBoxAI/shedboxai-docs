---
title: "ShedBoxAI for ETL Automation - Extract Transform Load Pipelines"
description: "Use ShedBoxAI for ETL automation. Build extract, transform, load pipelines with simple YAML configuration."
keywords: [shedboxai etl, etl automation, extract transform load, data pipeline automation, etl tool]
---

# ShedBoxAI for ETL Automation

Automate ETL workflows with ShedBoxAI. Extract from any source, transform with powerful operations, and load anywhere.

## ETL Use Cases

### Basic ETL Pipeline

Extract, transform, and load data:

```yaml
# Extract
data_sources:
  source_data:
    type: rest
    url: "https://api.example.com/data"
    headers:
      Authorization: "Bearer ${API_KEY}"
    response_path: "data"

# Transform
processing:
  contextual_filtering:
    source_data:
      - field: "status"
        condition: "active"
        new_name: "active_records"

  format_conversion:
    active_records:
      date_fields: ["created_at", "updated_at"]
      date_format: "%Y-%m-%d"

# Load
output:
  type: file
  path: "transformed_data.json"
  format: json
```

### Scheduled ETL

Run pipelines on a schedule (with cron):

```bash
# Run daily at 6am
0 6 * * * shedboxai run daily_etl.yaml
```

### Multi-Source ETL

Combine data from multiple sources:

```yaml
data_sources:
  source_a:
    type: csv
    path: "data_a.csv"

  source_b:
    type: rest
    url: "https://api.example.com/b"
    headers:
      Authorization: "Bearer ${API_KEY}"
    response_path: "data"

  source_c:
    type: csv
    path: "data_c.csv"

processing:
  relationship_highlighting:
    source_a:
      link_fields:
        - source: "source_a"
          source_field: "id"
          to: "source_b"
          target_field: "id"

output:
  type: file
  path: "combined_data.json"
  format: json
```

### Data Aggregation ETL

```yaml
data_sources:
  sales:
    type: csv
    path: "daily_sales.csv"

processing:
  advanced_operations:
    daily_summary:
      source: "sales"
      group_by: "date"
      aggregate:
        total_revenue: "SUM(amount)"
        order_count: "COUNT(*)"
        avg_order: "AVG(amount)"
      sort: "-date"

output:
  type: file
  path: "daily_summary.json"
  format: json
```

## Built-in Processing Operations

ShedBoxAI includes operations for:

- **Filtering** - `contextual_filtering` with conditions
- **Transformation** - `format_conversion` for data types
- **Aggregation** - `advanced_operations` with group_by and aggregate
- **Joining** - `relationship_highlighting` to link data sources
- **Summarization** - `content_summarization` for statistics

## Get Started

```bash
pip install shedboxai
shedboxai run etl_pipeline.yaml
```

[Data Sources Documentation →](/docs/configuration/data-sources)
