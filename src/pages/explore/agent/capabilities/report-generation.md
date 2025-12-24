---
title: "Report Generation with ShedBox Agent - Automated Business Reports"
description: "Generate professional reports from your data using natural language. PDF, Excel, Markdown, and more."
keywords: [report generation, automated reports, business reports ai, data reporting, report automation]
---

# Report Generation with ShedBox Agent

Generate professional reports from your data using natural language.

## Describe Your Report

```
You: "Create a monthly sales report for November"

ShedBox Agent:
✓ Connected to sales database
✓ Aggregated November data
✓ Generated visualizations

📊 November 2024 Sales Report

Executive Summary:
- Total Revenue: $487,500 (+12% MoM)
- Orders: 2,847 (+8% MoM)
- Average Order Value: $171.25 (+4% MoM)
- New Customers: 423

[Revenue by Region - Bar Chart]
[Daily Sales Trend - Line Chart]
[Top Products Table]

Export as:
1. PDF Report
2. Excel with data
3. Markdown
4. PowerPoint slides
```

## Report Types

### Executive Summary

```
"Create an executive summary of Q4 performance"
```

```markdown
# Q4 2024 Executive Summary

## Key Metrics
- Revenue: $1.45M (15% above target)
- Customer Growth: 34%
- NPS Score: 52 (up from 47)

## Highlights
- Launched 3 new product lines
- Expanded to 2 new markets
- Reduced churn by 1.2%

## Challenges
- Supply chain delays impacted December
- Higher CAC in new markets
```

### Detailed Analysis

```
"Create a detailed churn analysis report"
```

### Comparison Reports

```
"Compare this month to last month across all metrics"
```

### Trend Reports

```
"Show me 6-month trends for key KPIs"
```

## Output Formats

### PDF

Professional formatted documents:

```
"Generate a PDF report for the board meeting"
```

### Excel

Data-rich workbooks:

```
"Export to Excel with pivot tables and charts"
```

### Markdown

Version-control friendly:

```
"Create a markdown report I can commit to Git"
```

### Email

Direct delivery:

```yaml
output:
  type: email
  to: stakeholders@company.com
  subject: "Weekly Metrics Report - ${WEEK}"
  format: html
```

### Slack

Team notifications:

```yaml
output:
  type: slack
  channel: "#leadership"
  format: summary
```

## Scheduled Reports

Set up recurring reports:

```yaml
# Weekly business review
schedule:
  cron: "0 9 * * 1"  # Every Monday at 9am

data_sources:
  revenue:
    type: postgresql
    query: "SELECT * FROM revenue_summary WHERE week = last_week()"

  customers:
    type: rest_api
    url: https://api.crm.com/customers/metrics

report:
  title: "Weekly Business Review"
  sections:
    - type: summary
      metrics: [revenue, customers, churn]
    - type: chart
      title: "Revenue Trend"
      data: revenue
      chart_type: line
    - type: table
      title: "Top Customers"
      data: customers
      limit: 10

output:
  - type: pdf
    path: reports/weekly_${DATE}.pdf
  - type: email
    to: leadership@company.com
```

## Customization

### Add Your Branding

```
"Use our company colors and add the logo"
```

### Custom Sections

```
"Add a risks and mitigations section"
"Include a glossary at the end"
"Add benchmarks against industry data"
```

### Dynamic Content

```
"Highlight any metrics that are off-target"
"Add commentary explaining significant changes"
```

## Example: Investor Update

```
You: "Create a monthly investor update"

ShedBox Agent:
✓ Pulling data from all sources...

📈 November 2024 Investor Update

Dear Investors,

Financial Highlights:
- ARR: $5.7M (+8% MoM)
- MRR: $475K
- Net Revenue Retention: 115%
- Gross Margin: 78%

Customer Metrics:
- Total Customers: 234
- Enterprise Customers: 28 (+2)
- Logo Churn: 2.1%
- NPS: 52

Product Updates:
- Launched API v2
- 3 new enterprise features
- Mobile app beta released

Looking Ahead:
- Q1 enterprise pipeline: $1.2M
- Hiring: 5 new team members
- Product: AI features in beta

[Appendix with detailed charts and tables]

Export options:
1. PDF for email
2. Notion page
3. Google Doc
```

## Get Started

Generate professional reports with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [Dashboard Creation](/explore/agent/capabilities/dashboard-creation)
- [ShedBox Agent for Founders](/explore/agent/personas/founders)
- [Reporting Use Case](/explore/shedboxai/use-cases/reporting)
