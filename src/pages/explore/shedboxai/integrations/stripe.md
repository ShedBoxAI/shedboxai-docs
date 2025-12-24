---
title: "Connect Stripe with ShedBoxAI - Payment Data Pipeline"
description: "Integrate Stripe with ShedBoxAI. Export payment data, analyze revenue, and build financial reports."
keywords: [shedboxai stripe, stripe integration, stripe api, payment data, revenue analytics]
---

# Connect Stripe with ShedBoxAI

Pull payment data from Stripe and build revenue analytics pipelines with AI insights.

## Quick Start

```yaml
data_sources:
  charges:
    type: rest
    url: "https://api.stripe.com/v1/charges"
    headers:
      Authorization: "Bearer ${STRIPE_SECRET_KEY}"
    options:
      params:
        limit: 100
    response_path: "data"

output:
  type: file
  path: "charges.json"
  format: json
```

## Authentication

Use your Stripe Secret Key:

```bash
export STRIPE_SECRET_KEY="sk_live_..."
```

## Common Pipelines

### Revenue Summary

```yaml
data_sources:
  charges:
    type: rest
    url: "https://api.stripe.com/v1/charges"
    headers:
      Authorization: "Bearer ${STRIPE_SECRET_KEY}"
    options:
      params:
        limit: 100
    response_path: "data"

processing:
  contextual_filtering:
    charges:
      - field: "status"
        condition: "succeeded"
        new_name: "successful_charges"

  advanced_operations:
    revenue_by_currency:
      source: "successful_charges"
      group_by: "currency"
      aggregate:
        total_revenue: "SUM(amount)"
        transaction_count: "COUNT(*)"
        avg_transaction: "AVG(amount)"
      sort: "-total_revenue"

output:
  type: file
  path: "revenue_summary.json"
  format: json
```

### Subscription Analytics

```yaml
data_sources:
  subscriptions:
    type: rest
    url: "https://api.stripe.com/v1/subscriptions"
    headers:
      Authorization: "Bearer ${STRIPE_SECRET_KEY}"
    options:
      params:
        status: "active"
    response_path: "data"

processing:
  content_summarization:
    subscriptions:
      method: "statistical"
      fields: ["plan.amount"]
      summarize: ["count", "sum", "mean"]

output:
  type: file
  path: "subscription_metrics.json"
  format: json
```

### Revenue with AI Insights

```yaml
data_sources:
  charges:
    type: rest
    url: "https://api.stripe.com/v1/charges"
    headers:
      Authorization: "Bearer ${STRIPE_SECRET_KEY}"
    response_path: "data"

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
      system: "You are a financial analyst."
      user_template: |
        Analyze this payment data and provide insights:

        {% for charge in charges %}
        - Amount: {{ charge.amount }}, Status: {{ charge.status }}, Currency: {{ charge.currency }}
        {% endfor %}

        Provide revenue trends and recommendations.

output:
  type: file
  path: "revenue_insights.md"
  format: json
```

## Related

- [Fintech Use Case](/explore/shedboxai/use-cases/fintech)
- [E-commerce Use Case](/explore/shedboxai/use-cases/ecommerce)
