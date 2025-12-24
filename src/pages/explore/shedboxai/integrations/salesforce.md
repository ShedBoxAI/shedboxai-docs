---
title: "Connect Salesforce with ShedBoxAI - CRM Data Pipeline"
description: "Integrate Salesforce with ShedBoxAI. Export opportunities, contacts, and accounts for automated reporting."
keywords: [shedboxai salesforce, salesforce integration, crm data, salesforce api, sales analytics]
---

# Connect Salesforce with ShedBoxAI

Pull CRM data from Salesforce and build sales analytics pipelines.

## Quick Start

```yaml
data_sources:
  opportunities:
    type: rest
    url: "https://your-instance.salesforce.com/services/data/v57.0/query"
    headers:
      Authorization: "Bearer ${SALESFORCE_TOKEN}"
    options:
      params:
        q: "SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunity"
    response_path: "records"

output:
  type: file
  path: "opportunities.json"
  format: json
```

## Authentication

Use OAuth token flow for Salesforce:

```yaml
data_sources:
  # Token endpoint
  salesforce_auth:
    type: rest
    url: "https://login.salesforce.com/services/oauth2/token"
    method: POST
    options:
      data:
        grant_type: "password"
        client_id: "${SF_CLIENT_ID}"
        client_secret: "${SF_CLIENT_SECRET}"
        username: "${SF_USERNAME}"
        password: "${SF_PASSWORD}"
    is_token_source: true
    token_for: ["opportunities"]

  # Data endpoint
  opportunities:
    type: rest
    url: "https://your-instance.salesforce.com/services/data/v57.0/query"
    requires_token: true
    token_source: "salesforce_auth"
```

## Common Pipelines

### Pipeline Analysis

```yaml
data_sources:
  opportunities:
    type: rest
    url: "https://your-instance.salesforce.com/services/data/v57.0/query"
    headers:
      Authorization: "Bearer ${SALESFORCE_TOKEN}"
    options:
      params:
        q: "SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunity WHERE IsClosed = false"
    response_path: "records"

processing:
  advanced_operations:
    pipeline_by_stage:
      source: "opportunities"
      group_by: "StageName"
      aggregate:
        total_value: "SUM(Amount)"
        deal_count: "COUNT(*)"
        avg_deal: "AVG(Amount)"
      sort: "-total_value"

output:
  type: file
  path: "pipeline_analysis.json"
  format: json
```

### Won Deals Report

```yaml
data_sources:
  opportunities:
    type: rest
    url: "https://your-instance.salesforce.com/services/data/v57.0/query"
    headers:
      Authorization: "Bearer ${SALESFORCE_TOKEN}"
    options:
      params:
        q: "SELECT Id, Name, Amount, CloseDate, OwnerId FROM Opportunity WHERE StageName = 'Closed Won'"
    response_path: "records"

processing:
  content_summarization:
    opportunities:
      method: "statistical"
      fields: ["Amount"]
      summarize: ["sum", "count", "mean", "max"]

output:
  type: file
  path: "won_deals_summary.json"
  format: json
```

### Sales Insights with AI

```yaml
data_sources:
  opportunities:
    type: rest
    url: "https://your-instance.salesforce.com/services/data/v57.0/query"
    headers:
      Authorization: "Bearer ${SALESFORCE_TOKEN}"
    options:
      params:
        q: "SELECT Name, Amount, StageName, CloseDate FROM Opportunity LIMIT 50"
    response_path: "records"

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
      system: "You are a sales analyst."
      user_template: |
        Analyze this sales pipeline and provide insights:

        {% for opp in opportunities %}
        - {{ opp.Name }}: ${{ opp.Amount }} ({{ opp.StageName }})
        {% endfor %}

        Identify trends and recommendations.

output:
  type: file
  path: "sales_insights.md"
  format: json
```

## Related

- [HubSpot Integration](/explore/shedboxai/integrations/hubspot)
- [Sales Ops Use Case](/explore/shedboxai/use-cases/sales-ops)
