---
title: "Sentiment Analysis with ShedBox Agent - AI-Powered Text Analysis"
description: "Analyze sentiment in customer feedback, reviews, and support tickets using natural language AI."
keywords: [sentiment analysis, text analysis ai, customer feedback analysis, review sentiment, nps analysis]
---

# Sentiment Analysis with ShedBox Agent

Analyze customer sentiment across feedback, reviews, and support tickets.

## Analyze Any Text Data

```
You: "Analyze the sentiment of these customer reviews"

ShedBox Agent:
✓ Analyzed 1,247 reviews

Sentiment Overview:
- Positive: 68% (848 reviews)
- Neutral: 22% (274 reviews)
- Negative: 10% (125 reviews)

Overall Sentiment Score: 7.2/10

Top Positive Themes:
1. "Easy to use" - mentioned 234 times
2. "Great support" - mentioned 189 times
3. "Time saver" - mentioned 156 times

Top Negative Themes:
1. "Slow loading" - mentioned 45 times
2. "Missing features" - mentioned 38 times
3. "Pricing" - mentioned 29 times
```

## Use Cases

### Customer Reviews

```
"Analyze sentiment in our App Store reviews"
"What are customers saying about the new feature?"
"Compare sentiment before and after the update"
```

### Support Tickets

```
"Categorize support tickets by customer emotion"
"Identify frustrated customers who need attention"
"What issues are causing the most negative feedback?"
```

### Social Media

```
"Analyze brand mentions on Twitter"
"Track sentiment around our product launch"
"Compare our sentiment to competitors"
```

### Survey Responses

```
"Analyze open-ended NPS responses"
"Categorize feedback by topic and sentiment"
"What drives detractors vs promoters?"
```

## Example Workflow

```
You: [Uploads support_tickets.csv]
You: "Analyze customer sentiment and identify issues"

ShedBox Agent:
✓ Loaded 3,456 support tickets
✓ Analyzing text content...

📊 Sentiment Analysis Results

Overall Distribution:
- 🟢 Positive/Satisfied: 42%
- 🟡 Neutral/Informational: 38%
- 🔴 Negative/Frustrated: 20%

Trend (Last 30 Days):
[Line chart showing sentiment over time]
⚠️ Negative sentiment increased 5% after Oct 15 update

Topic Analysis:

| Topic | Volume | Sentiment | Trend |
|-------|--------|-----------|-------|
| Login issues | 234 | 🔴 -0.7 | ↑ 23% |
| New UI | 189 | 🟡 0.1 | New |
| Billing | 156 | 🟡 0.2 | → |
| Speed | 142 | 🔴 -0.5 | ↑ 15% |
| Features | 98 | 🟢 0.4 | ↓ 5% |

Urgent Attention:
23 tickets marked as "angry" or "frustrated" requiring escalation

You: "Show me the tickets about login issues"

ShedBox Agent:
Login Issues Analysis (234 tickets):

Common Patterns:
1. "Password reset not working" - 67 tickets
2. "2FA issues" - 45 tickets
3. "Session timeout" - 38 tickets
4. "SSO not connecting" - 28 tickets

Sample Negative Ticket:
"I've been trying to log in for 2 hours! Password reset emails aren't
coming through. This is unacceptable for a paid product."
Sentiment: -0.9, Urgency: High

Recommendation: Investigate email delivery issues with password reset
```

## Generated Pipeline

Sentiment analysis becomes automated:

```yaml
data_sources:
  tickets:
    type: csv
    path: support_tickets.csv

ai_interface:
  provider: anthropic
  prompts:
    analyze_sentiment:
      system: "You are a sentiment analysis expert."
      user_template: |
        Analyze the sentiment of this support ticket:

        {{ticket_content}}

        Return:
        - sentiment_score: -1 to 1
        - sentiment_label: positive/neutral/negative
        - topics: list of topics mentioned
        - urgency: low/medium/high
        - key_phrases: important phrases

processing:
  transform:
    - operation: ai_enrich
      source_field: ticket_content
      prompt: analyze_sentiment

  aggregate:
    group_by: [topic, week]
    metrics:
      - avg_sentiment: avg(sentiment_score)
      - ticket_count: count
      - negative_ratio: count(sentiment_label == 'negative') / count

output:
  type: file
  path: sentiment_report.json
```

## Analysis Features

| Feature | Description |
|---------|-------------|
| Sentiment Score | Numeric score from -1 (negative) to 1 (positive) |
| Topic Extraction | Automatic identification of topics discussed |
| Entity Recognition | Identify products, features, people mentioned |
| Urgency Detection | Flag tickets needing immediate attention |
| Trend Analysis | Track sentiment changes over time |
| Comparative Analysis | Compare sentiment across segments |

## Get Started

Understand your customer sentiment at scale.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [ShedBoxAI Sentiment Analysis](/explore/shedboxai/use-cases/sentiment-analysis)
- [Report Generation](/explore/agent/capabilities/report-generation)
- [Trend Analysis](/explore/agent/capabilities/trend-analysis)
