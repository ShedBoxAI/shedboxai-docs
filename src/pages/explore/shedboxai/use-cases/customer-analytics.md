---
title: "ShedBoxAI for Customer Analytics - CDP Alternative & Segmentation"
description: "Use ShedBoxAI for customer analytics. Build a lightweight CDP, create segments, and generate insights with AI."
keywords: [shedboxai customer analytics, cdp alternative, customer segmentation, customer 360, customer data platform]
---

# ShedBoxAI for Customer Analytics

Build a lightweight customer data platform with ShedBoxAI. Unify customer data, create segments, and generate AI insights.

## Customer Analytics Use Cases

### Customer 360 View

Combine data from all touchpoints:

```yaml
data_sources:
  crm:
    type: rest
    url: "https://api.hubspot.com/crm/v3/objects/contacts"
    headers:
      Authorization: "Bearer ${HUBSPOT_ACCESS_TOKEN}"
    response_path: "results"

  transactions:
    type: csv
    path: "transactions.csv"

  support:
    type: csv
    path: "support_tickets.csv"

processing:
  relationship_highlighting:
    crm:
      link_fields:
        - source: "crm"
          source_field: "properties.email"
          to: "transactions"
          target_field: "email"
        - source: "crm"
          source_field: "properties.email"
          to: "support"
          target_field: "customer_email"

output:
  type: file
  path: "customer_360.json"
  format: json
```

### AI-Powered Segmentation

Create intelligent customer segments:

```yaml
data_sources:
  customers:
    type: csv
    path: "customer_data.csv"

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
        Segment these customers into actionable groups:

        {% for customer in customers %}
        - {{ customer.name }}: ${{ customer.lifetime_value }} LTV, {{ customer.orders }} orders, {{ customer.last_purchase }}
        {% endfor %}

        Consider: value tiers, behavior patterns, lifecycle stage.
        Create 4-5 segments with recommended actions for each.

output:
  type: file
  path: "customer_segments.md"
  format: json
```

### Churn Risk Analysis

Identify at-risk customers:

```yaml
data_sources:
  activity:
    type: csv
    path: "customer_activity.csv"

processing:
  contextual_filtering:
    activity:
      - field: "days_since_login"
        condition: ">30"
        new_name: "inactive_customers"

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
    churn_analysis:
      system: "You are a customer success analyst."
      user_template: |
        Analyze churn risk for these inactive customers:

        {% for customer in inactive_customers %}
        - {{ customer.name }}: {{ customer.days_since_login }} days inactive, ${{ customer.monthly_value }} MRR
        {% endfor %}

        Categorize by risk level and suggest retention actions.

output:
  type: file
  path: "churn_risk.md"
  format: json
```

## ShedBoxAI vs Traditional CDP

| Feature | Traditional CDP | ShedBoxAI |
|---------|-----------------|-----------|
| Cost | $50k+/year | Free |
| Setup time | Months | Minutes |
| AI insights | Limited | Built-in |
| Data ownership | Vendor | You |
| Customization | Limited | Full |

## Get Started

```bash
pip install shedboxai
shedboxai run customer_pipeline.yaml
```

[Quick Start Guide →](/docs/getting-started/quick-start)
