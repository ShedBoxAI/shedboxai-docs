---
title: "Anomaly Detection with ShedBox Agent - Find Data Outliers"
description: "Automatically detect anomalies, outliers, and unusual patterns in your data using AI-powered analysis."
keywords: [anomaly detection, outlier detection, data anomalies, unusual patterns, data monitoring]
---

# Anomaly Detection with ShedBox Agent

Automatically detect anomalies and unusual patterns in your data.

## Find Anomalies Automatically

```
You: "Check this data for anomalies"

ShedBox Agent:
✓ Analyzing 45,678 records...

🚨 Anomalies Detected

Summary:
- Critical: 3
- Warning: 12
- Info: 28

Critical Anomalies:

1. Revenue Spike (Dec 15)
   Value: $45,000 (normal: $8,000-$12,000)
   Deviation: +375% from expected

2. Zero Transactions (Dec 18, 2-4 PM)
   Expected: 150-200 transactions
   Actual: 0
   Duration: 2 hours

3. Unusual Refund Pattern
   Last 24h refunds: 234 (normal: 15-25)
   Increase: +936%

Would you like to:
1. Investigate any anomaly
2. Set up ongoing monitoring
3. Export anomaly report
```

## Detection Methods

### Statistical Anomalies

```
"Find values more than 3 standard deviations from the mean"
"Identify outliers in the amount field"
```

### Pattern-Based

```
"Detect unusual patterns in user behavior"
"Find sequences that don't match normal flow"
```

### Time-Based

```
"Alert when today's metrics are significantly different from typical"
"Detect unusual spikes or drops in traffic"
```

### Comparative

```
"Find customers behaving differently than their segment"
"Identify products with unusual sales patterns"
```

## Use Cases

### Revenue Monitoring

```
"Monitor daily revenue for anomalies"
"Alert if revenue drops more than 20% from expected"
```

### Fraud Detection

```
"Find suspicious transaction patterns"
"Identify accounts with unusual activity"
```

### System Health

```
"Monitor error rates for anomalies"
"Detect unusual latency patterns"
```

### Customer Behavior

```
"Find customers with sudden behavior changes"
"Detect unusual churn patterns"
```

## Example Workflow

```
You: "Monitor our daily metrics for anomalies"

ShedBox Agent:
What metrics should I monitor?

You: "Revenue, signups, errors, and API latency"

ShedBox Agent:
✓ Analyzing historical data to establish baselines...

Baselines Established:

| Metric | Normal Range | Alert Threshold |
|--------|-------------|-----------------|
| Daily Revenue | $8k-$15k | ±40% |
| Signups | 80-150/day | ±50% |
| Error Rate | 0.1%-0.5% | >1% |
| API Latency | 100-200ms | >500ms |

Monitoring now active. I'll alert you when anomalies occur.

---

[2 hours later]

🚨 Anomaly Alert

Metric: API Latency
Current: 847ms (normal: 100-200ms)
Start Time: 2:45 PM
Duration: 15 minutes (ongoing)

Correlation Analysis:
- Error rate also elevated (2.3%)
- No change in traffic volume
- Specific endpoint affected: /api/v1/search

Possible Causes:
1. Database query slowdown
2. Third-party API timeout
3. Memory pressure

Would you like me to:
1. Pull detailed logs
2. Check database metrics
3. Notify on-call team
```

## Generated Pipeline

Anomaly detection becomes automated:

```yaml
data_sources:
  metrics:
    type: postgresql
    connection_env: DATABASE_URL
    query: |
      SELECT
        DATE(created_at) as date,
        SUM(revenue) as revenue,
        COUNT(*) as transactions,
        AVG(latency_ms) as avg_latency
      FROM daily_metrics
      WHERE created_at >= NOW() - INTERVAL '90 days'
      GROUP BY 1

processing:
  # Calculate statistical baselines
  transform:
    - operation: window
      partition_by: []
      order_by: date
      frame: "ROWS BETWEEN 30 PRECEDING AND 1 PRECEDING"
      compute:
        - name: revenue_mean
          function: AVG(revenue)
        - name: revenue_std
          function: STDDEV(revenue)

    # Calculate z-scores
    - operation: add_field
      name: revenue_zscore
      expression: (revenue - revenue_mean) / revenue_std

    # Flag anomalies
    - operation: add_field
      name: is_anomaly
      expression: ABS(revenue_zscore) > 3

  # Filter to anomalies
  filter:
    condition: is_anomaly = true

schedule:
  cron: "0 * * * *"  # Every hour

alerts:
  - name: critical_anomaly
    condition: ABS(revenue_zscore) > 4
    severity: critical
    notify:
      pagerduty: service_key
      slack: "#alerts-critical"

  - name: warning_anomaly
    condition: ABS(revenue_zscore) > 3
    severity: warning
    notify:
      slack: "#alerts"

output:
  type: file
  path: anomalies/{{DATE}}.json
```

## Alert Configuration

| Severity | Threshold | Response |
|----------|-----------|----------|
| Info | 2σ deviation | Log for review |
| Warning | 3σ deviation | Slack notification |
| Critical | 4σ deviation | PagerDuty + SMS |

## Get Started

Start detecting anomalies in your data.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [Trend Analysis](/explore/agent/capabilities/trend-analysis)
- [Dashboard Creation](/explore/agent/capabilities/dashboard-creation)
- [ShedBox Agent for Ops Teams](/explore/agent/personas/ops-teams)
