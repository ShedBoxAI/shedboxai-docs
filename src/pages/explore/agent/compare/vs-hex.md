---
title: "ShedBox Agent vs Hex - Data Workflow Platform Comparison"
description: "Compare ShedBox Agent and Hex for data analysis. YAML pipelines vs collaborative notebooks."
keywords: [shedbox agent vs hex, hex alternative, data notebook, ai data analysis]
---

# ShedBox Agent vs Hex

Compare ShedBox Agent with Hex for data analysis and workflows.

## Quick Comparison

| Feature | ShedBox Agent | Hex |
|---------|---------------|-----|
| Interface | Conversational AI | Notebook + SQL |
| Output | YAML pipelines | Notebooks, apps |
| Collaboration | Pipeline sharing | Real-time editing |
| Data Sources | APIs, DBs, files | Primarily databases |
| Code Required | None | SQL/Python |
| Deployment | YAML configs | Hex apps |

## Different Approaches to Data

### Hex: Collaborative Notebooks

Hex provides a modern notebook experience:
- SQL and Python cells
- Real-time collaboration
- Interactive visualizations
- Shareable data apps

### ShedBox Agent: Conversational Pipelines

ShedBox Agent uses natural language:

```
"Show me weekly revenue trends from Stripe,
broken down by product category"

✓ Connects to Stripe API
✓ Aggregates by week and category
✓ Generates visualization
✓ Creates reusable pipeline
```

## Key Differentiators

### No Code Required

Work entirely in natural language:

```
"Join my PostgreSQL customers with Stripe payments
and find high-value customers who churned"
```

vs Hex requiring SQL:

```sql
SELECT c.*, p.total_spent
FROM customers c
JOIN payments p ON c.id = p.customer_id
WHERE p.total_spent > 1000
AND c.status = 'churned'
```

### API-First Data Access

ShedBox Agent excels at API connections:

```yaml
data_sources:
  stripe:
    type: rest_api
    url: https://api.stripe.com/v1/charges
    auth:
      type: bearer
      token_env: STRIPE_KEY

  hubspot:
    type: rest_api
    url: https://api.hubspot.com/crm/v3/objects/deals
    auth:
      type: bearer
      token_env: HUBSPOT_KEY

processing:
  join:
    sources: [stripe, hubspot]
    on: customer_email
```

### Portable Pipelines

Export analyses as standalone YAML—run anywhere:

```bash
# Run on any machine
shedboxai run revenue_analysis.yaml

# Schedule with cron
0 8 * * * shedboxai run revenue_analysis.yaml
```

## When to Choose Each

### Choose ShedBox Agent When:

- Non-technical users need data access
- Connecting to SaaS APIs
- Building automated pipelines
- Portable, version-controlled configs

### Choose Hex When:

- Technical users prefer SQL/Python
- Real-time collaboration is key
- Building internal data apps
- Complex notebook-style exploration

## Try ShedBox Agent

Natural language data analysis for everyone.

[Get Started →](/docs/getting-started/quick-start)

## Related

- [ShedBox Agent vs Deepnote AI](/explore/agent/compare/vs-deepnote-ai)
- [ShedBox Agent for Business Analysts](/explore/agent/personas/business-analysts)
