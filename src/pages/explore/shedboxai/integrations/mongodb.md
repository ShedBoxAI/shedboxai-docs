---
title: "Connect MongoDB with ShedBoxAI - NoSQL Data Pipeline"
description: "Integrate MongoDB with ShedBoxAI. Export collections via MongoDB Data API for automated processing."
keywords: [shedboxai mongodb, mongodb integration, nosql data, mongodb api, document database]
---

# Connect MongoDB with ShedBoxAI

Pull data from MongoDB using the Data API and build analytics pipelines.

## Quick Start

MongoDB Atlas provides a Data API for REST access:

```yaml
data_sources:
  documents:
    type: rest
    url: "https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action/find"
    method: POST
    headers:
      api-key: "${MONGODB_API_KEY}"
      Content-Type: "application/json"
    options:
      json:
        dataSource: "Cluster0"
        database: "mydb"
        collection: "users"
    response_path: "documents"

output:
  type: file
  path: "mongodb_users.json"
  format: json
```

## Authentication

```bash
export MONGODB_API_KEY="your-api-key"
export APP_ID="your-app-id"
```

## Common Pipelines

### Export Collection

```yaml
data_sources:
  users:
    type: rest
    url: "https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action/find"
    method: POST
    headers:
      api-key: "${MONGODB_API_KEY}"
      Content-Type: "application/json"
    options:
      json:
        dataSource: "Cluster0"
        database: "mydb"
        collection: "users"
        limit: 1000
    response_path: "documents"

output:
  type: file
  path: "users_export.json"
  format: json
```

### Query with Filter

```yaml
data_sources:
  active_users:
    type: rest
    url: "https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action/find"
    method: POST
    headers:
      api-key: "${MONGODB_API_KEY}"
      Content-Type: "application/json"
    options:
      json:
        dataSource: "Cluster0"
        database: "mydb"
        collection: "users"
        filter:
          status: "active"
    response_path: "documents"

processing:
  content_summarization:
    active_users:
      method: "statistical"
      fields: ["age", "purchaseCount"]
      summarize: ["count", "mean", "min", "max"]

output:
  type: file
  path: "active_users_summary.json"
  format: json
```

### Data Insights with AI

```yaml
data_sources:
  orders:
    type: rest
    url: "https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action/find"
    method: POST
    headers:
      api-key: "${MONGODB_API_KEY}"
      Content-Type: "application/json"
    options:
      json:
        dataSource: "Cluster0"
        database: "mydb"
        collection: "orders"
        limit: 50
    response_path: "documents"

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
        Analyze these MongoDB documents:

        {{ orders | tojson }}

        Identify patterns and insights.

output:
  type: file
  path: "mongodb_insights.md"
  format: json
```

## Alternative: Export to CSV

For databases without a REST API, export to CSV first:

```bash
# Export MongoDB collection to CSV
mongoexport --db mydb --collection users --type=csv \
  --fields=name,email,age,status --out=users.csv
```

Then process with ShedBoxAI:

```yaml
data_sources:
  users:
    type: csv
    path: "users.csv"

processing:
  contextual_filtering:
    users:
      - field: "status"
        condition: "active"
        new_name: "active_users"

output:
  type: file
  path: "processed_users.json"
  format: json
```

## Related

- [PostgreSQL Integration](/explore/shedboxai/integrations/postgresql)
- [REST APIs Integration](/explore/shedboxai/integrations/rest-apis)
