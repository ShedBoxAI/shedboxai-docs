---
title: "Dashboard Creation with ShedBox Agent - Visual Analytics"
description: "Create data dashboards using natural language. Visualize metrics, track KPIs, and share insights automatically."
keywords: [dashboard creation, data visualization, business dashboard, analytics dashboard, visual reporting]
---

# Dashboard Creation with ShedBox Agent

Create data dashboards using natural language—no BI tool experience needed.

## Describe Your Dashboard

```
You: "Create a sales dashboard with key metrics"

ShedBox Agent:
✓ Connected to your sales data
✓ Generating dashboard...

📊 Sales Dashboard

┌─────────────────────────────────────────────────┐
│  Revenue        │  Orders      │  AOV          │
│  $487,500       │  2,847       │  $171.25      │
│  ↑ 12% MoM      │  ↑ 8% MoM    │  ↑ 4% MoM     │
└─────────────────────────────────────────────────┘

[Revenue Trend - Line Chart - Last 12 Months]
[Orders by Region - Bar Chart]
[Top Products - Table]
[Conversion Funnel - Funnel Chart]

Would you like to:
1. Customize any chart
2. Add more metrics
3. Schedule daily refresh
4. Export or share
```

## Dashboard Types

### Executive Dashboard

```
"Create an executive dashboard with company KPIs"
```

Key metrics at a glance for leadership.

### Sales Dashboard

```
"Build a sales performance dashboard"
```

Pipeline, revenue, rep performance, forecasts.

### Marketing Dashboard

```
"Create a marketing analytics dashboard"
```

Campaigns, channels, CAC, conversions.

### Product Dashboard

```
"Build a product usage dashboard"
```

Active users, feature adoption, retention.

### Operations Dashboard

```
"Create an ops dashboard for daily monitoring"
```

Orders, inventory, fulfillment, SLAs.

## Visualization Types

| Chart Type | Best For |
|------------|----------|
| Line Chart | Trends over time |
| Bar Chart | Category comparisons |
| Pie/Donut | Part-to-whole |
| Table | Detailed data |
| Metric Card | Single KPI values |
| Funnel | Conversion stages |
| Heat Map | Patterns in data |
| Scatter Plot | Correlations |

## Example Workflow

```
You: "I need a dashboard to track customer health"

ShedBox Agent:
What data sources should I connect?

You: "Our PostgreSQL database and Zendesk"

ShedBox Agent:
✓ Connected to PostgreSQL
✓ Connected to Zendesk

📊 Customer Health Dashboard

┌────────────────────────────────────────────────────┐
│ Health Overview                                    │
├────────────────────────────────────────────────────┤
│ Healthy: 78%  │  At Risk: 15%  │  Churning: 7%    │
└────────────────────────────────────────────────────┘

[Customer Health Trend - 90 Days]
Shows movement between health categories over time

[At-Risk Customers - Table]
| Customer | Health Score | Last Activity | Open Tickets |
|----------|-------------|---------------|--------------|
| Acme Inc | 45 | 21 days ago | 3 |
| TechCo | 52 | 14 days ago | 2 |
...

[Support Ticket Volume by Customer Segment]
Bar chart showing ticket distribution

[NPS by Health Category]
Average NPS: Healthy (62), At Risk (28), Churning (-12)

You: "Add alerts for customers dropping below 50 health score"

ShedBox Agent:
✓ Added alert configuration

When health_score < 50:
- Slack notification to #customer-success
- Email to account owner
- Add to "At Risk" queue
```

## Generated Pipeline

Dashboards are powered by pipelines:

```yaml
data_sources:
  customers:
    type: postgresql
    connection_env: DATABASE_URL
    query: |
      SELECT
        customer_id,
        name,
        health_score,
        last_activity_date,
        mrr
      FROM customers
      WHERE status = 'active'

  tickets:
    type: rest_api
    url: https://your-domain.zendesk.com/api/v2/tickets
    auth:
      type: basic
      username_env: ZENDESK_USER
      password_env: ZENDESK_TOKEN

processing:
  join:
    sources: [customers, tickets]
    left_key: customer_id
    right_key: requester_id
    type: left

  aggregate:
    group_by: customer_id
    metrics:
      - open_tickets: count(status == 'open')
      - avg_ticket_age: avg(age_days)

  transform:
    - operation: add_field
      name: health_category
      expression: |
        CASE
          WHEN health_score >= 70 THEN 'Healthy'
          WHEN health_score >= 40 THEN 'At Risk'
          ELSE 'Churning'
        END

schedule:
  cron: "0 */4 * * *"  # Every 4 hours

alerts:
  - condition: health_score < 50 AND previous_health_score >= 50
    notify:
      slack: "#customer-success"
      email: "{{account_owner_email}}"

output:
  type: dashboard
  refresh: 4h
```

## Sharing & Export

### Export Options

```
"Export this dashboard as PDF"
"Create a shareable link"
"Send this to stakeholders@company.com every Monday"
```

### Embedding

Embed dashboards in other tools:

```html
<iframe src="https://shedbox.ai/embed/dashboard/abc123" />
```

## Get Started

Create dashboards with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [Report Generation](/explore/agent/capabilities/report-generation)
- [Trend Analysis](/explore/agent/capabilities/trend-analysis)
- [Reporting Use Case](/explore/shedboxai/use-cases/reporting)
