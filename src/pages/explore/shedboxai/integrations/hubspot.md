---
title: "Connect HubSpot with ShedBoxAI - Marketing & Sales Data Pipeline"
description: "Integrate HubSpot with ShedBoxAI. Export contacts, deals, and marketing data for automated analytics."
keywords: [shedboxai hubspot, hubspot integration, crm pipeline, marketing data, hubspot api]
---

# Connect HubSpot with ShedBoxAI

Pull marketing and sales data from HubSpot and build analytics pipelines.

## Quick Start

```yaml
data_sources:
  contacts:
    type: rest
    url: "https://api.hubapi.com/crm/v3/objects/contacts"
    headers:
      Authorization: "Bearer ${HUBSPOT_TOKEN}"
    options:
      params:
        limit: 100
    response_path: "results"

output:
  type: file
  path: "contacts.json"
  format: json
```

## Authentication

```bash
export HUBSPOT_TOKEN="pat-na1-..."
```

## Common Pipelines

### Deal Pipeline Analysis

```yaml
data_sources:
  deals:
    type: rest
    url: "https://api.hubapi.com/crm/v3/objects/deals"
    headers:
      Authorization: "Bearer ${HUBSPOT_TOKEN}"
    options:
      params:
        limit: 100
        properties: "dealname,amount,dealstage,closedate"
    response_path: "results"

processing:
  advanced_operations:
    deals_by_stage:
      source: "deals"
      group_by: "properties.dealstage"
      aggregate:
        total_value: "SUM(properties.amount)"
        deal_count: "COUNT(*)"
      sort: "-total_value"

output:
  type: file
  path: "deal_pipeline.json"
  format: json
```

### Contact Segmentation

```yaml
data_sources:
  contacts:
    type: rest
    url: "https://api.hubapi.com/crm/v3/objects/contacts"
    headers:
      Authorization: "Bearer ${HUBSPOT_TOKEN}"
    options:
      params:
        limit: 100
        properties: "email,firstname,lastname,lifecyclestage"
    response_path: "results"

processing:
  advanced_operations:
    contacts_by_lifecycle:
      source: "contacts"
      group_by: "properties.lifecyclestage"
      aggregate:
        contact_count: "COUNT(*)"
      sort: "-contact_count"

output:
  type: file
  path: "contact_segments.json"
  format: json
```

### Marketing Insights with AI

```yaml
data_sources:
  contacts:
    type: rest
    url: "https://api.hubapi.com/crm/v3/objects/contacts"
    headers:
      Authorization: "Bearer ${HUBSPOT_TOKEN}"
    options:
      params:
        limit: 50
    response_path: "results"

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
      system: "You are a marketing analyst."
      user_template: |
        Analyze these contacts and provide segmentation insights:

        {% for contact in contacts %}
        - {{ contact.properties.email }}: {{ contact.properties.lifecyclestage }}
        {% endfor %}

output:
  type: file
  path: "marketing_insights.md"
  format: json
```

## Related

- [Salesforce Integration](/explore/shedboxai/integrations/salesforce)
- [Marketing Use Case](/explore/shedboxai/use-cases/marketing)
