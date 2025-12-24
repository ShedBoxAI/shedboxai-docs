---
title: "ShedBoxAI for Marketing - Campaign Analytics & Attribution Pipelines"
description: "Use ShedBoxAI for marketing data pipelines. Analyze campaigns, track attribution, and segment audiences with AI."
keywords: [shedboxai marketing, marketing analytics, campaign tracking, attribution, audience segmentation]
---

# ShedBoxAI for Marketing

Build marketing data pipelines with ShedBoxAI. Unify campaign data, track attribution, and create AI-powered segments.

## Marketing Use Cases

### Multi-Channel Campaign Analysis

Combine data from all marketing channels:

```yaml
data_sources:
  google_ads:
    type: csv
    path: "google_ads_export.csv"

  facebook:
    type: csv
    path: "facebook_ads_export.csv"

processing:
  advanced_operations:
    campaign_performance:
      source: "google_ads"
      group_by: "campaign_name"
      aggregate:
        spend: "SUM(cost)"
        impressions: "SUM(impressions)"
        conversions: "SUM(conversions)"
      sort: "-conversions"

output:
  type: file
  path: "campaign_performance.json"
  format: json
```

### AI-Powered Audience Segmentation

Use AI to create customer segments:

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
      system: "You are a marketing analyst."
      user_template: |
        Create audience segments from this customer data:

        {% for customer in customers %}
        - {{ customer.name }}: ${{ customer.total_spent }}, {{ customer.purchase_count }} purchases, {{ customer.last_purchase }}
        {% endfor %}

        Consider: purchase history, demographics, engagement patterns.
        Create 3-5 actionable segments with targeting recommendations.

output:
  type: file
  path: "audience_segments.md"
  format: json
```

### Attribution Reporting

Track marketing attribution:

```yaml
data_sources:
  touchpoints:
    type: csv
    path: "marketing_touchpoints.csv"

  conversions:
    type: csv
    path: "conversions.csv"

processing:
  relationship_highlighting:
    touchpoints:
      link_fields:
        - source: "touchpoints"
          source_field: "user_id"
          to: "conversions"
          target_field: "user_id"

  advanced_operations:
    attribution:
      source: "touchpoints"
      group_by: "first_touch_channel"
      aggregate:
        attributed_conversions: "COUNT(*)"
        attributed_revenue: "SUM(revenue)"
      sort: "-attributed_revenue"

output:
  type: file
  path: "attribution_report.json"
  format: json
```

## Why Marketing Teams Choose ShedBoxAI

| Pain Point | Solution |
|------------|----------|
| Data silos | Unified pipelines |
| Manual Excel work | Automated reports |
| No AI insights | Built-in LLM |
| Expensive tools | Free & open source |

## Get Started

```bash
pip install shedboxai
shedboxai run marketing_pipeline.yaml
```

[Quick Start Guide →](/docs/getting-started/quick-start)
