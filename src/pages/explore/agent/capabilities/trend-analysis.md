---
title: "Trend Analysis with ShedBox Agent - Discover Patterns in Your Data"
description: "Identify trends, patterns, and seasonality in your data using natural language AI analysis."
keywords: [trend analysis, data trends, pattern recognition, time series analysis, forecasting]
---

# Trend Analysis with ShedBox Agent

Discover trends, patterns, and seasonality in your data using natural language.

## Ask About Trends

```
You: "What are the trends in our sales data?"

ShedBox Agent:
✓ Analyzing 24 months of sales data...

📈 Sales Trend Analysis

Overall Trend: Growing (+18% YoY)

Key Patterns:
1. Strong upward trend since March 2024
2. Seasonal peak in November-December
3. Slower months: January, July
4. Weekend sales 35% lower than weekdays

[Trend Visualization with Moving Average]

Growth by Segment:
- Enterprise: +32% YoY (accelerating)
- SMB: +12% YoY (steady)
- Consumer: -5% YoY (declining)

Would you like me to:
1. Forecast next quarter
2. Compare to previous year
3. Break down by region
4. Identify anomalies
```

## Analysis Types

### Growth Trends

```
"Show me revenue growth trends"
"Is user acquisition accelerating or decelerating?"
"What's the trend in customer churn?"
```

### Seasonality

```
"Are there seasonal patterns in our data?"
"When are our peak sales periods?"
"Do we see weekly or monthly cycles?"
```

### Comparisons

```
"Compare this year to last year"
"How does this quarter compare to the same quarter last year?"
"Show year-over-year growth trends"
```

### Forecasting

```
"Forecast sales for the next 3 months"
"What will our user count be at year end?"
"Predict next quarter's revenue"
```

## Example Workflow

```
You: "Analyze trends in our subscription metrics"

ShedBox Agent:
✓ Pulling subscription data...

📊 Subscription Trend Analysis

MRR Trend:
[Line chart showing 12-month MRR growth]
- Current MRR: $475,000
- 12-month change: +$127,000 (+36%)
- Average monthly growth: 2.6%

Growth Components:
| Type | Monthly Avg | Trend |
|------|-------------|-------|
| New MRR | +$18,000 | ↑ Accelerating |
| Expansion | +$8,500 | → Stable |
| Contraction | -$3,200 | ↓ Improving |
| Churn | -$4,800 | → Stable |

Seasonality Detected:
- Q4 shows 40% higher new signups
- January has highest churn (post-annual renewals)
- Summer months show slower growth

Cohort Performance:
[Heatmap showing retention by signup month]
- 2024 cohorts retaining 15% better than 2023
- Enterprise cohorts: 95% retention
- SMB cohorts: 78% retention

You: "What's driving the improvement in 2024 cohorts?"

ShedBox Agent:
Analyzing behavioral differences...

Key Differences (2024 vs 2023 Cohorts):
1. Onboarding completion: 68% → 82% (+14pp)
2. Feature adoption (first week): 3.2 → 4.7 features
3. Support ticket rate: 0.8 → 0.5 per user (-38%)
4. Time to first value: 4.2 days → 2.1 days

Correlation Analysis:
- Onboarding completion strongly correlates with retention (r=0.78)
- Feature adoption in first week predicts LTV (r=0.65)

Recommendation: The improved onboarding (launched Feb 2024) appears to be
the primary driver of better retention.
```

## Trend Detection Methods

| Method | Best For |
|--------|----------|
| Moving Average | Smoothing noise, seeing overall direction |
| YoY Comparison | Removing seasonality |
| Linear Regression | Long-term trend direction |
| Decomposition | Separating trend, seasonality, residual |
| Cohort Analysis | Behavior changes over time |

## Generated Pipeline

Trend analysis becomes automated:

```yaml
data_sources:
  revenue:
    type: postgresql
    connection_env: DATABASE_URL
    query: |
      SELECT
        DATE_TRUNC('month', created_at) as month,
        SUM(amount) as revenue,
        COUNT(*) as transactions,
        COUNT(DISTINCT customer_id) as customers
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '24 months'
      GROUP BY 1
      ORDER BY 1

processing:
  transform:
    # Calculate month-over-month change
    - operation: window
      partition_by: []
      order_by: month
      compute:
        - name: prev_revenue
          function: LAG(revenue, 1)
        - name: mom_change
          expression: (revenue - prev_revenue) / prev_revenue
        - name: yoy_revenue
          function: LAG(revenue, 12)
        - name: yoy_change
          expression: (revenue - yoy_revenue) / yoy_revenue

    # Calculate moving average
    - operation: window
      partition_by: []
      order_by: month
      frame: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW"
      compute:
        - name: moving_avg_3m
          function: AVG(revenue)

ai_interface:
  provider: anthropic
  prompts:
    analyze_trends:
      user_template: |
        Analyze these revenue trends and provide insights:
        {{data}}

        Include:
        - Overall trend direction
        - Seasonality patterns
        - Notable anomalies
        - Forecast for next 3 months

schedule:
  cron: "0 9 1 * *"  # First of each month

output:
  type: email
  to: leadership@company.com
  subject: "Monthly Trend Analysis"
```

## Get Started

Discover patterns in your data with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [Anomaly Detection](/explore/agent/capabilities/anomaly-detection)
- [Dashboard Creation](/explore/agent/capabilities/dashboard-creation)
- [Customer Analytics Use Case](/explore/shedboxai/use-cases/customer-analytics)
