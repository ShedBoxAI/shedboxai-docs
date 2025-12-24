---
title: "Connect Airtable with ShedBoxAI - Base Export Pipeline"
description: "Integrate Airtable with ShedBoxAI. Export bases, automate workflows, and add AI processing."
keywords: [shedboxai airtable, airtable integration, airtable api, airtable export, airtable automation]
---

# Connect Airtable with ShedBoxAI

Pull data from Airtable bases and build automated processing pipelines.

## Quick Start

```yaml
data_sources:
  records:
    type: rest
    url: "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}"
    headers:
      Authorization: "Bearer ${AIRTABLE_TOKEN}"
    response_path: "records"

output:
  type: file
  path: "airtable_data.json"
  format: json
```

## Authentication

Get your Personal Access Token from airtable.com/account:

```bash
export AIRTABLE_TOKEN="pat..."
export AIRTABLE_BASE_ID="app..."
```

## Common Pipelines

### Table Export

```yaml
data_sources:
  projects:
    type: rest
    url: "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Projects"
    headers:
      Authorization: "Bearer ${AIRTABLE_TOKEN}"
    options:
      params:
        filterByFormula: "{Status} = 'Active'"
    response_path: "records"

output:
  type: file
  path: "active_projects.json"
  format: json
```

### Multi-Table Processing

```yaml
data_sources:
  projects:
    type: rest
    url: "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Projects"
    headers:
      Authorization: "Bearer ${AIRTABLE_TOKEN}"
    response_path: "records"

  tasks:
    type: rest
    url: "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks"
    headers:
      Authorization: "Bearer ${AIRTABLE_TOKEN}"
    response_path: "records"

processing:
  relationship_highlighting:
    projects:
      link_fields:
        - source: "projects"
          source_field: "id"
          to: "tasks"
          target_field: "project_id"

output:
  type: file
  path: "project_tasks.json"
  format: json
```

### Filter and Aggregate

```yaml
data_sources:
  tasks:
    type: rest
    url: "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks"
    headers:
      Authorization: "Bearer ${AIRTABLE_TOKEN}"
    response_path: "records"

processing:
  contextual_filtering:
    tasks:
      - field: "fields.Status"
        condition: "Complete"
        new_name: "completed_tasks"

  advanced_operations:
    tasks_by_project:
      source: "completed_tasks"
      group_by: "fields.Project"
      aggregate:
        task_count: "COUNT(*)"
      sort: "-task_count"

output:
  type: file
  path: "task_summary.json"
  format: json
```

### AI-Powered Analysis

```yaml
data_sources:
  content:
    type: rest
    url: "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Content"
    headers:
      Authorization: "Bearer ${AIRTABLE_TOKEN}"
    response_path: "records"

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
      system: "You are a content analyst."
      user_template: |
        Analyze this Airtable content:

        {% for record in content %}
        - {{ record.fields.Name }}: {{ record.fields.Description }}
        {% endfor %}

        Identify patterns and suggest improvements.

output:
  type: file
  path: "content_analysis.md"
  format: json
```

## Related

- [Notion Integration](/explore/shedboxai/integrations/notion)
- [API Aggregation Use Case](/explore/shedboxai/use-cases/api-aggregation)
