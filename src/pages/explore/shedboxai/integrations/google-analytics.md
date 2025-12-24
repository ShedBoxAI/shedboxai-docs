---
title: "Connect Google Analytics with ShedBoxAI - Web Analytics Pipeline"
description: "Integrate Google Analytics with ShedBoxAI. Export traffic data, analyze user behavior, and build automated reports."
keywords: [shedboxai google analytics, ga4 integration, web analytics, traffic data, analytics api]
---

# Connect Google Analytics with ShedBoxAI

Pull web analytics data from Google Analytics 4 and build traffic analysis pipelines.

## Quick Start

```yaml
data_sources:
  analytics:
    type: rest
    url: "https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport"
    method: POST
    headers:
      Authorization: "Bearer ${GOOGLE_ACCESS_TOKEN}"
      Content-Type: "application/json"
    options:
      json:
        dateRanges:
          - startDate: "30daysAgo"
            endDate: "today"
        dimensions:
          - name: "date"
        metrics:
          - name: "sessions"
          - name: "activeUsers"

output:
  type: file
  path: "analytics.json"
  format: json
```

## Authentication

Use OAuth 2.0 for Google APIs:

```bash
export GOOGLE_ACCESS_TOKEN="your-oauth-token"
export GA_PROPERTY_ID="your-property-id"
```

## Common Pipelines

### Traffic by Source

```yaml
data_sources:
  traffic:
    type: rest
    url: "https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport"
    method: POST
    headers:
      Authorization: "Bearer ${GOOGLE_ACCESS_TOKEN}"
      Content-Type: "application/json"
    options:
      json:
        dateRanges:
          - startDate: "30daysAgo"
            endDate: "today"
        dimensions:
          - name: "sessionSource"
        metrics:
          - name: "sessions"
          - name: "conversions"

processing:
  content_summarization:
    traffic:
      method: "statistical"
      fields: ["sessions", "conversions"]
      summarize: ["sum", "mean", "max"]

output:
  type: file
  path: "traffic_by_source.json"
  format: json
```

### Page Performance

```yaml
data_sources:
  pages:
    type: rest
    url: "https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport"
    method: POST
    headers:
      Authorization: "Bearer ${GOOGLE_ACCESS_TOKEN}"
      Content-Type: "application/json"
    options:
      json:
        dateRanges:
          - startDate: "7daysAgo"
            endDate: "today"
        dimensions:
          - name: "pagePath"
        metrics:
          - name: "screenPageViews"
          - name: "averageSessionDuration"
        limit: 20

output:
  type: file
  path: "page_performance.json"
  format: json
```

### Analytics Insights with AI

```yaml
data_sources:
  traffic:
    type: rest
    url: "https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport"
    method: POST
    headers:
      Authorization: "Bearer ${GOOGLE_ACCESS_TOKEN}"
      Content-Type: "application/json"
    options:
      json:
        dateRanges:
          - startDate: "30daysAgo"
            endDate: "today"
        dimensions:
          - name: "date"
          - name: "sessionSource"
        metrics:
          - name: "sessions"
          - name: "conversions"

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
      system: "You are a web analytics expert."
      user_template: |
        Analyze this traffic data and provide insights:

        {{ traffic | tojson }}

        Identify traffic trends and optimization opportunities.

output:
  type: file
  path: "analytics_insights.md"
  format: json
```

## Related

- [Marketing Use Case](/explore/shedboxai/use-cases/marketing)
- [Reporting Use Case](/explore/shedboxai/use-cases/reporting)
