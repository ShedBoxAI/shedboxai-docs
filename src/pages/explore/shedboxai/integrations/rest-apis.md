---
title: "Connect Any REST API with ShedBoxAI - Universal API Integration"
description: "Connect any REST API with ShedBoxAI. Flexible configuration for authentication, pagination, and data processing."
keywords: [shedboxai rest api, api integration, rest api pipeline, api data, universal connector]
---

# Connect Any REST API with ShedBoxAI

ShedBoxAI can connect to any REST API with flexible configuration for auth, pagination, and processing.

## Quick Start

```yaml
data_sources:
  api_data:
    type: rest
    url: "https://api.example.com/data"
    headers:
      Authorization: "Bearer ${API_TOKEN}"
    response_path: "data"

output:
  type: file
  path: "data.json"
  format: json
```

## Authentication Types

### Bearer Token

```yaml
data_sources:
  api:
    type: rest
    url: "https://api.example.com/data"
    headers:
      Authorization: "Bearer ${API_TOKEN}"
```

### Basic Auth

```yaml
data_sources:
  api:
    type: rest
    url: "https://api.example.com/data"
    options:
      auth: ["${API_USER}", "${API_PASS}"]
```

### API Key in Header

```yaml
data_sources:
  api:
    type: rest
    url: "https://api.example.com/data"
    headers:
      X-API-Key: "${API_KEY}"
```

### OAuth 2.0 Token Flow

```yaml
data_sources:
  # Token source
  auth_endpoint:
    type: rest
    url: "https://auth.example.com/token"
    method: POST
    options:
      data:
        grant_type: "client_credentials"
        client_id: "${CLIENT_ID}"
        client_secret: "${CLIENT_SECRET}"
    is_token_source: true
    token_for: ["protected_endpoint"]

  # Protected endpoint
  protected_endpoint:
    type: rest
    url: "https://api.example.com/data"
    requires_token: true
    token_source: "auth_endpoint"
```

## Request Methods

### GET Request

```yaml
data_sources:
  api:
    type: rest
    url: "https://api.example.com/users"
    method: GET
    options:
      params:
        limit: 100
        status: "active"
```

### POST Request

```yaml
data_sources:
  api:
    type: rest
    url: "https://api.example.com/query"
    method: POST
    headers:
      Content-Type: "application/json"
    options:
      json:
        query: "SELECT * FROM data"
        limit: 100
```

## Response Handling

### Extract Nested Data

```yaml
data_sources:
  api:
    type: rest
    url: "https://api.example.com/data"
    response_path: "data.results"  # Navigate to nested array
```

### Multiple Response Paths

```yaml
data_sources:
  users:
    type: rest
    url: "https://api.example.com/users"
    response_path: "data.users"

  metadata:
    type: rest
    url: "https://api.example.com/users"
    response_path: "meta"
```

## Processing API Data

```yaml
data_sources:
  api_data:
    type: rest
    url: "https://api.example.com/transactions"
    headers:
      Authorization: "Bearer ${API_TOKEN}"
    response_path: "transactions"

processing:
  contextual_filtering:
    api_data:
      - field: "status"
        condition: "completed"
        new_name: "completed_transactions"

  advanced_operations:
    summary:
      source: "completed_transactions"
      group_by: "category"
      aggregate:
        total_amount: "SUM(amount)"
        count: "COUNT(*)"
      sort: "-total_amount"

output:
  type: file
  path: "transaction_summary.json"
  format: json
```

## Related

- [API Aggregation Use Case](/explore/shedboxai/use-cases/api-aggregation)
- [Data Sources Documentation](/docs/configuration/data-sources)
