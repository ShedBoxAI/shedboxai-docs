---
description: Install ShedBoxAI Python package with pip. Complete setup guide for AI-powered data processing framework with YAML configuration and Claude Code integration.
keywords: [shedboxai installation, python data pipeline, ai framework setup, yaml data processing, pip install]
---

# Installation

ShedBoxAI is available as a Python package and can be installed via pip. Get started with the AI-powered data processing framework in minutes.

## Requirements

- Python 3.8 or higher
- pip (Python package installer)

## Standard Installation

Install ShedBoxAI using pip:

```bash
pip install shedboxai
```

## Development Installation

For development or to get the latest features:

```bash
# Clone the repository
git clone https://github.com/shedboxai/shedboxai.git
cd shedboxai

# Install in development mode
pip install -e .

# Install with test dependencies
pip install -e ".[test]"
```

## Verify Installation

Verify your installation by running:

```bash
shedboxai --help
```

You should see the ShedBoxAI command-line interface help text.

## Next Steps

- [Quick Start Guide](./quick-start.md) - Get up and running in 5 minutes
- [Your First Pipeline](./first-pipeline.md) - Build your first data processing pipeline
- [Claude Code Integration](../claude-code-integration.md) - AI-powered configuration generation
- [Operations Overview](../operations/index.md) - Learn about data processing operations

## Related Resources

- [Configuration Reference](../configuration/data-sources.md) - Complete YAML configuration guide
- [Examples Gallery](../examples/index.md) - Real-world use cases and tutorials
- [Troubleshooting](../troubleshooting/common-issues.md) - Common installation issues