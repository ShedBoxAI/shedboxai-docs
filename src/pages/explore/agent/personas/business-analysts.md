---
title: "ShedBox Agent for Business Analysts - Data Without Code"
description: "How business analysts use ShedBox Agent to access data, create reports, and drive decisions without SQL."
keywords: [shedbox agent business analysts, business analyst tools, no code data analysis, ba tools]
---

# ShedBox Agent for Business Analysts

Access any data source and create insights without writing code.

## The Business Analyst Challenge

Business analysts need data access but often face:
- Dependency on data teams for queries
- Long wait times for report requests
- Limited self-service options
- Tools that require SQL knowledge

**ShedBox Agent gives you direct data access through natural language.**

## How Business Analysts Use ShedBox Agent

### Direct Data Access

```
"Show me total revenue by product category for last quarter"

✓ Connects to your data source
✓ Runs the analysis
✓ Creates visualization
✓ Exports to your preferred format
```

### No SQL Required

Ask questions in plain English:

```
"Which marketing channels have the best ROI?"
"What's the trend in customer support tickets?"
"Compare this month's sales to the same month last year"
```

### Self-Service Reports

Create reports you can refresh anytime:

```yaml
# Your reusable report
data_sources:
  sales:
    type: rest_api
    url: https://api.your-crm.com/deals
    auth:
      type: bearer
      token_env: CRM_TOKEN

processing:
  filter:
    field: close_date
    condition: "last_quarter"
  aggregate:
    group_by: product_category
    metrics:
      - revenue: sum(amount)
      - deals: count

output:
  type: file
  path: quarterly_sales.xlsx
```

## Key Benefits for Business Analysts

### 1. Independence from Data Teams

- Query data yourself using natural language
- No tickets, no waiting
- Iterate on analyses in real-time

### 2. Multiple Data Sources

Access all your business data:

| Source | What You Can Access |
|--------|---------------------|
| Salesforce | Deals, accounts, activities |
| HubSpot | Contacts, marketing data |
| Stripe | Revenue, subscriptions |
| Google Analytics | Traffic, conversions |
| Databases | Any SQL data |

### 3. Stakeholder-Ready Output

Generate reports in business-friendly formats:

```
"Create a PowerPoint-ready summary of Q3 performance"
"Export this analysis to Excel with charts"
"Generate a PDF report for the board meeting"
```

### 4. Repeatable Analysis

Save and rerun any analysis:

```bash
# Monthly refresh
shedboxai run monthly_business_review.yaml

# Share with colleagues
shedboxai run monthly_business_review.yaml --output shared_drive/
```

## Common BA Workflows

### Performance Tracking

```
"Create a dashboard showing KPIs vs targets for this quarter"
```

### Customer Segmentation

```
"Segment customers by purchase frequency and average order value"
```

### Process Analysis

```
"What's the average time from lead to close by sales rep?"
```

### Competitive Analysis

```
"Compare our pricing data with competitor benchmarks"
```

### Budget vs Actual

```
"Show budget vs actual spend by department, highlight variances over 10%"
```

## Example: Sales Pipeline Analysis

```
You: "Show me the sales pipeline by stage with conversion rates"

ShedBox Agent:
✓ Connects to Salesforce
✓ Pulls opportunity data
✓ Calculates stage-to-stage conversion
✓ Creates funnel visualization

Pipeline Analysis:
- Lead → Qualified: 45% conversion
- Qualified → Proposal: 62% conversion
- Proposal → Negotiation: 38% conversion
- Negotiation → Won: 55% conversion

Bottleneck identified: Proposal → Negotiation stage
Recommendation: Review proposal quality and follow-up timing
```

## Get Started

Take control of your data access.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [ShedBox Agent for Product Managers](/explore/agent/personas/product-managers)
- [Report Generation Capability](/explore/agent/capabilities/report-generation)
- [Dashboard Creation](/explore/agent/capabilities/dashboard-creation)
