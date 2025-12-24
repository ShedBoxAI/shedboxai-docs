---
title: "Connect Zendesk with ShedBoxAI - Support Data Pipeline"
description: "Integrate Zendesk with ShedBoxAI. Export tickets, analyze support metrics, and build automated reports."
keywords: [shedboxai zendesk, zendesk integration, support analytics, ticket data, zendesk api]
---

# Connect Zendesk with ShedBoxAI

Pull support data from Zendesk and build customer service analytics pipelines.

## Quick Start

```yaml
data_sources:
  tickets:
    type: rest
    url: "https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json"
    headers:
      Authorization: "Basic ${ZENDESK_AUTH}"
    response_path: "tickets"

output:
  type: file
  path: "tickets.json"
  format: json
```

## Authentication

```bash
# Base64 encode email:token
export ZENDESK_AUTH=$(echo -n "email@example.com/token:your-api-token" | base64)
export ZENDESK_SUBDOMAIN="your-subdomain"
```

## Common Pipelines

### Ticket Volume by Status

```yaml
data_sources:
  tickets:
    type: rest
    url: "https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json"
    headers:
      Authorization: "Basic ${ZENDESK_AUTH}"
    response_path: "tickets"

processing:
  advanced_operations:
    tickets_by_status:
      source: "tickets"
      group_by: "status"
      aggregate:
        ticket_count: "COUNT(*)"
      sort: "-ticket_count"

output:
  type: file
  path: "ticket_status_report.json"
  format: json
```

### Priority Analysis

```yaml
data_sources:
  tickets:
    type: rest
    url: "https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json"
    headers:
      Authorization: "Basic ${ZENDESK_AUTH}"
    response_path: "tickets"

processing:
  contextual_filtering:
    tickets:
      - field: "status"
        condition: "open"
        new_name: "open_tickets"

  advanced_operations:
    open_by_priority:
      source: "open_tickets"
      group_by: "priority"
      aggregate:
        count: "COUNT(*)"
      sort: "-count"

output:
  type: file
  path: "priority_analysis.json"
  format: json
```

### Support Insights with AI

```yaml
data_sources:
  tickets:
    type: rest
    url: "https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json"
    headers:
      Authorization: "Basic ${ZENDESK_AUTH}"
    options:
      params:
        per_page: 50
    response_path: "tickets"

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
      system: "You are a customer support analyst."
      user_template: |
        Analyze these support tickets and identify common issues:

        {% for ticket in tickets %}
        - {{ ticket.subject }} ({{ ticket.status }}, {{ ticket.priority }})
        {% endfor %}

        Provide trends and improvement recommendations.

output:
  type: file
  path: "support_insights.md"
  format: json
```

## Related

- [Customer Analytics Use Case](/explore/shedboxai/use-cases/customer-analytics)
- [Sentiment Analysis Use Case](/explore/shedboxai/use-cases/sentiment-analysis)
