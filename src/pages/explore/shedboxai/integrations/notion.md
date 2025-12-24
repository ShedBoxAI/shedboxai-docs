---
title: "Connect Notion with ShedBoxAI - Knowledge Base Data Pipeline"
description: "Integrate Notion with ShedBoxAI. Export databases, pages, and content for automated processing."
keywords: [shedboxai notion, notion integration, notion api, knowledge base, notion database]
---

# Connect Notion with ShedBoxAI

Pull data from Notion databases and build knowledge management pipelines.

## Quick Start

```yaml
data_sources:
  tasks:
    type: rest
    url: "https://api.notion.com/v1/databases/${DATABASE_ID}/query"
    method: POST
    headers:
      Authorization: "Bearer ${NOTION_TOKEN}"
      Notion-Version: "2022-06-28"
      Content-Type: "application/json"
    response_path: "results"

output:
  type: file
  path: "notion_tasks.json"
  format: json
```

## Authentication

```bash
export NOTION_TOKEN="secret_..."
export DATABASE_ID="your-database-id"
```

## Common Pipelines

### Export Database

```yaml
data_sources:
  database:
    type: rest
    url: "https://api.notion.com/v1/databases/${DATABASE_ID}/query"
    method: POST
    headers:
      Authorization: "Bearer ${NOTION_TOKEN}"
      Notion-Version: "2022-06-28"
      Content-Type: "application/json"
    response_path: "results"

output:
  type: file
  path: "database_export.json"
  format: json
```

### Filter by Status

```yaml
data_sources:
  tasks:
    type: rest
    url: "https://api.notion.com/v1/databases/${DATABASE_ID}/query"
    method: POST
    headers:
      Authorization: "Bearer ${NOTION_TOKEN}"
      Notion-Version: "2022-06-28"
      Content-Type: "application/json"
    options:
      json:
        filter:
          property: "Status"
          select:
            equals: "In Progress"
    response_path: "results"

output:
  type: file
  path: "in_progress_tasks.json"
  format: json
```

### Content Insights with AI

```yaml
data_sources:
  pages:
    type: rest
    url: "https://api.notion.com/v1/databases/${DATABASE_ID}/query"
    method: POST
    headers:
      Authorization: "Bearer ${NOTION_TOKEN}"
      Notion-Version: "2022-06-28"
      Content-Type: "application/json"
    response_path: "results"

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
      system: "You are a productivity analyst."
      user_template: |
        Analyze this Notion database content:

        {% for page in pages %}
        - {{ page.properties.Name.title[0].plain_text if page.properties.Name.title else 'Untitled' }}
        {% endfor %}

        Identify patterns and organization suggestions.

output:
  type: file
  path: "notion_insights.md"
  format: json
```

## Related

- [Airtable Integration](/explore/shedboxai/integrations/airtable)
- [Data Science Use Case](/explore/shedboxai/use-cases/data-science)
