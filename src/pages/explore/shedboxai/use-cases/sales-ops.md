---
title: "ShedBoxAI for Sales Operations - Pipeline & Forecasting Automation"
description: "Use ShedBoxAI for sales ops. Automate pipeline analysis, lead scoring, and forecasting with AI-powered data pipelines."
keywords: [shedboxai sales ops, sales operations, pipeline analysis, lead scoring, sales forecasting, crm automation]
---

# ShedBoxAI for Sales Operations

Automate sales operations with ShedBoxAI. Build pipelines for CRM analysis, lead scoring, and AI-powered forecasting.

## Sales Ops Use Cases

### Pipeline Analysis

Analyze your sales pipeline from Salesforce:

```yaml
data_sources:
  opportunities:
    type: rest
    url: "https://${SF_INSTANCE}.salesforce.com/services/data/v58.0/query"
    method: GET
    headers:
      Authorization: "Bearer ${SF_ACCESS_TOKEN}"
    options:
      params:
        q: "SELECT Id, Amount, StageName, CloseDate FROM Opportunity"
    response_path: "records"

processing:
  advanced_operations:
    stage_metrics:
      source: "opportunities"
      group_by: "StageName"
      aggregate:
        deal_count: "COUNT(*)"
        total_value: "SUM(Amount)"
        avg_deal_size: "AVG(Amount)"
      sort: "-total_value"

output:
  type: file
  path: "pipeline_analysis.json"
  format: json
```

### AI Lead Scoring

Use AI to score and prioritize leads:

```yaml
data_sources:
  leads:
    type: csv
    path: "leads_export.csv"

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
    score:
      system: "You are a sales analyst. Score leads 1-100 based on likelihood to convert."
      user_template: |
        Score these leads:

        {% for lead in leads %}
        - {{ lead.company }}: {{ lead.industry }}, {{ lead.employee_count }} employees, {{ lead.engagement_score }} engagement
        {% endfor %}

        Consider: company size, engagement level, industry fit.
        Return a ranked list with scores and reasoning.

output:
  type: file
  path: "scored_leads.md"
  format: json
```

### Sales Forecasting

Generate AI-powered forecasts:

```yaml
data_sources:
  historical:
    type: csv
    path: "closed_won_deals.csv"

  pipeline:
    type: csv
    path: "current_pipeline.csv"

processing:
  content_summarization:
    historical:
      method: "statistical"
      fields: ["amount"]
      summarize: ["sum", "count", "mean"]

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
    forecast:
      system: "You are a sales forecasting analyst."
      user_template: |
        Based on historical performance and current pipeline, forecast next quarter's revenue:

        Historical closed deals:
        {% for deal in historical %}
        - {{ deal.close_date }}: ${{ deal.amount }}
        {% endfor %}

        Current pipeline:
        {% for opp in pipeline %}
        - {{ opp.name }}: ${{ opp.amount }}, {{ opp.stage }}, {{ opp.probability }}%
        {% endfor %}

        Provide forecast with confidence intervals.

output:
  type: file
  path: "sales_forecast.md"
  format: json
```

## Why Sales Ops Teams Choose ShedBoxAI

| Challenge | Solution |
|-----------|----------|
| CRM data exports | Automated extraction |
| Excel forecasting | AI-powered predictions |
| Manual reporting | Scheduled pipelines |
| No AI tools | Built-in LLM support |

## Related Integrations

- [Salesforce Integration](/explore/shedboxai/integrations/salesforce)
- [HubSpot Integration](/explore/shedboxai/integrations/hubspot)

## Get Started

```bash
pip install shedboxai
shedboxai run sales_pipeline.yaml
```

[Quick Start Guide →](/docs/getting-started/quick-start)
