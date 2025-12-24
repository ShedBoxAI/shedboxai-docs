---
title: "CSV Analysis with ShedBox Agent - Natural Language Data Exploration"
description: "Analyze CSV files with natural language. Filter, aggregate, visualize, and transform CSV data without coding."
keywords: [csv analysis, csv ai, analyze csv, csv data processing, natural language csv]
---

# CSV Analysis with ShedBox Agent

Analyze CSV files using natural language—no spreadsheet formulas needed.

## Upload and Explore

Simply describe what you want to know:

```
You: "Analyze this sales data and show me the top products"

ShedBox Agent:
✓ Loaded sales.csv (15,234 rows, 12 columns)
✓ Analyzed product performance

Top 10 Products by Revenue:
1. Product A - $245,000 (2,450 units)
2. Product B - $189,000 (1,890 units)
3. Product C - $156,000 (3,120 units)
...

Would you like to:
- See trends over time?
- Break down by region?
- Export this analysis?
```

## What You Can Do

### Quick Summaries

```
"Give me an overview of this data"
"What are the key statistics?"
"How many unique values are in the status column?"
```

### Filtering

```
"Show me only rows where status is 'Active'"
"Filter for orders over $1,000"
"Find all records from California"
```

### Aggregation

```
"Total sales by region"
"Average order value by customer segment"
"Count of orders by month"
```

### Visualizations

```
"Create a bar chart of sales by category"
"Show a line chart of monthly trends"
"Make a pie chart of market share"
```

### Data Quality

```
"Are there any missing values?"
"Find duplicate rows"
"Check for outliers in the amount column"
```

## Example Workflow

```
You: [Uploads customers.csv]
You: "What's in this file?"

ShedBox Agent:
Customers.csv Overview:
- Rows: 5,432
- Columns: 8 (id, name, email, signup_date, plan, mrr, status, region)

Key Statistics:
- Active customers: 4,891 (90%)
- Plans: Free (2,100), Pro (2,150), Enterprise (1,182)
- Total MRR: $487,500
- Regions: North America (52%), Europe (31%), Asia (17%)

You: "Show me MRR by plan type"

ShedBox Agent:
MRR by Plan:
- Enterprise: $295,500 (60.6%)
- Pro: $172,000 (35.3%)
- Free: $20,000 (4.1%)

[Bar chart visualization]

Average MRR per customer:
- Enterprise: $250
- Pro: $80
- Free: $9.50

You: "Which enterprise customers have the highest MRR?"

ShedBox Agent:
Top 10 Enterprise Customers by MRR:
1. Acme Corp - $2,400/mo
2. TechStart Inc - $1,800/mo
3. Global Systems - $1,500/mo
...

You: "Export this to a new CSV"

ShedBox Agent:
✓ Exported top_enterprise_customers.csv
```

## Supported Operations

| Operation | Examples |
|-----------|----------|
| Filter | `status == 'Active'`, `amount > 1000` |
| Sort | `ORDER BY revenue DESC` |
| Group | `GROUP BY region, category` |
| Aggregate | `SUM`, `COUNT`, `AVG`, `MIN`, `MAX` |
| Join | Combine multiple CSV files |
| Transform | Add columns, rename, calculate |
| Export | CSV, JSON, Excel |

## Generated Pipeline

Every analysis creates a reusable pipeline:

```yaml
data_sources:
  customers:
    type: csv
    path: customers.csv

processing:
  filter:
    field: plan
    condition: "== 'Enterprise'"
  aggregate:
    group_by: region
    metrics:
      - total_mrr: sum(mrr)
      - customer_count: count
  sort:
    by: total_mrr
    order: desc
  limit: 10

output:
  type: file
  path: enterprise_by_region.csv
```

## Large File Support

ShedBox Agent handles large CSV files efficiently:
- Streaming processing for files over 100MB
- Memory-efficient aggregations
- Progress indicators for long operations

## Get Started

Upload your CSV and start exploring.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [Data Cleaning Capability](/explore/agent/capabilities/data-cleaning)
- [Data Merging Capability](/explore/agent/capabilities/data-merging)
- [CSV & JSON Processing](/explore/shedboxai/integrations/csv-json)
