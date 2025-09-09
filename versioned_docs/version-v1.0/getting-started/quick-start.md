---
description: ShedBoxAI quick start guide - build your first AI data pipeline in 5 minutes with YAML configuration. No coding required, just simple configuration files.
keywords: [shedboxai quick start, ai data pipeline tutorial, yaml configuration guide, data processing framework, claude code integration]
---

# Quick Start

Get up and running with ShedBoxAI in just a few minutes. This guide will walk you through creating your first AI-powered data processing pipeline with simple YAML configuration.

## Overview

ShedBoxAI transforms complex data processing workflows into simple YAML configurations. Just two steps to get started:

1. **Create a YAML configuration file**
2. **Run `shedboxai run config.yaml`**

The framework handles everything else: data connections, transformations, AI integration, and output formatting.

:::tip AI-Powered Configuration
Want to generate configurations with Claude Code or other AI assistants? Download the [AI Assistant Guide](/AI_ASSISTANT_GUIDE.txt) - it contains all the syntax patterns and examples needed for AI to create perfect ShedBoxAI configs for you.
:::

## Your First Pipeline

Let's create a simple pipeline that processes user data and generates insights.

### Step 1: Create Sample Data

Create a file called `data/users.csv`:

```csv
name,age,city,status
John Doe,30,New York,active
Jane Smith,25,Los Angeles,active
Bob Johnson,45,Chicago,inactive
Alice Brown,35,Miami,active
```

### Step 2: Create Configuration

Create `config.yaml`:

```yaml
# Data sources configuration
data_sources:
  users:
    type: csv
    path: data/users.csv

# Processing configuration
processing:
  contextual_filtering:
    users:
      - field: age
        condition: "> 18"
      - field: status
        condition: "== 'active'"
        new_name: "adult_active_users"
  
  format_conversion:
    adult_active_users:
      template: |
        **{{item.name}}** ({{item.age}} years)
        - Location: {{item.city}}
        - Status: {{upper(item.status)}}

# Output configuration  
output:
  type: file
  path: output/results.json
  format: json
```

### Step 3: Run Your Pipeline

```bash
shedboxai run config.yaml
```

### Expected Output

The pipeline will:
1. Load user data from CSV
2. Filter for active users over 18
3. Format each user with a template
4. Save results to `output/results.json`

## Key Concepts

### Data Sources
Connect to various data sources:
- **CSV/JSON/YAML files**
- **REST APIs** 
- **Text files**
- **Inline data**

### Operations
Transform your data with 6 operation types:
- **Contextual Filtering** - Filter data with expressions
- **Format Conversion** - Transform with templates  
- **Content Summarization** - Statistical analysis
- **Relationship Highlighting** - Link and derive data
- **Advanced Operations** - Group, aggregate, sort
- **Template Matching** - Jinja2 templating

### Expression Engine
Use built-in functions in conditions and templates:
```yaml
condition: "> avg(map(users, 'age'))"
template: "{{upper(concat(item.first_name, ' ', item.last_name))}}"
```

## Next Steps

- [Build Your First Pipeline](./first-pipeline.md) - More detailed walkthrough
- [Claude Code Integration](../claude-code-integration.md) - AI-powered configuration generation
- [Configuration Guide](../configuration/data-sources.md) - Complete configuration reference
- [Operations Reference](../operations/index.md) - All available operations
- [Examples](../examples/index.md) - Real-world use cases

## Advanced Features

- [Data Introspection](../introspection/overview.md) - Automated data analysis
- [AI Interface Configuration](../configuration/ai-interface.md) - Integrate with AI models
- [Template Operations](../operations/templates.md) - Advanced data formatting

## Need Help?

- Check the [CLI Reference](../cli-reference/) for all command options
- Visit [Troubleshooting](../troubleshooting/) for common issues
- See [Examples](../examples/) for more complex scenarios