---
title: "ShedBoxAI for Data Scientists - ML Data Prep & Feature Pipelines"
description: "Use ShedBoxAI for data science workflows. Prepare ML datasets, engineer features, and automate data processing."
keywords: [shedboxai data science, ml data pipeline, feature engineering, data preparation, machine learning data]
---

# ShedBoxAI for Data Scientists

Streamline data science workflows with ShedBoxAI. Prepare datasets, engineer features, and automate repetitive data work.

## Data Science Use Cases

### Dataset Preparation

Prepare training data from multiple sources:

```yaml
data_sources:
  raw_features:
    type: csv
    path: "raw_data.csv"

  labels:
    type: csv
    path: "labels.csv"

processing:
  relationship_highlighting:
    raw_features:
      link_fields:
        - source: "raw_features"
          source_field: "id"
          to: "labels"
          target_field: "id"

  contextual_filtering:
    raw_features:
      - field: "quality_score"
        condition: ">0.8"
        new_name: "high_quality_data"

output:
  type: file
  path: "training_data.json"
  format: json
```

### Feature Engineering

Create and document features:

```yaml
data_sources:
  transactions:
    type: csv
    path: "transactions.csv"

processing:
  advanced_operations:
    user_features:
      source: "transactions"
      group_by: "user_id"
      aggregate:
        total_transactions: "COUNT(*)"
        avg_amount: "AVG(amount)"
        total_spent: "SUM(amount)"
        min_amount: "MIN(amount)"
        max_amount: "MAX(amount)"
      sort: "-total_spent"

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
    document:
      system: "You are a data scientist documenting features for the ML team."
      user_template: |
        Document these engineered features:

        {% for feature in user_features %}
        - User {{ feature.user_id }}: {{ feature.total_transactions }} txns, avg ${{ feature.avg_amount }}
        {% endfor %}

        Provide: feature descriptions, data types, expected ranges, and usage recommendations.

output:
  type: file
  path: "feature_documentation.md"
  format: json
```

### Data Quality Checks

Validate data before model training:

```yaml
data_sources:
  dataset:
    type: csv
    path: "training_data.csv"

processing:
  content_summarization:
    dataset:
      method: "statistical"
      fields: ["feature_1", "feature_2", "target"]
      summarize: ["count", "mean", "min", "max"]

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
    quality_check:
      system: "You are a data quality analyst for ML pipelines."
      user_template: |
        Check this dataset for issues:

        {% for row in dataset | batch(10) | first %}
        {{ row | tojson }}
        {% endfor %}

        Look for: missing values, outliers, class imbalance, data leakage risks.

output:
  type: file
  path: "quality_report.md"
  format: json
```

## Why Data Scientists Choose ShedBoxAI

| Task | Traditional | ShedBoxAI |
|------|-------------|-----------|
| Data prep | Python scripts | YAML config |
| Documentation | Manual | AI-generated |
| Reproducibility | Notebooks | Version-controlled YAML |
| Collaboration | Code review | Config review |

## Get Started

```bash
pip install shedboxai
shedboxai run ml_pipeline.yaml
```

[Quick Start Guide →](/docs/getting-started/quick-start)
