# `shedboxai introspect` Command

Analyze data sources defined in your configuration file and generate detailed documentation.

## Basic Usage

```bash
shedboxai introspect config.yaml
```

## Command Syntax

```bash
shedboxai introspect [OPTIONS] CONFIG_FILE
```

## Description

The `introspect` command analyzes data sources configured in your YAML file to generate:
- Data source structure documentation
- Sample data insights
- Configuration validation
- Processing recommendations

## Arguments

### CONFIG_FILE
Path to your ShedBoxAI configuration file containing data source definitions.

## Options

### Basic Options

#### `-o, --output PATH`
Output file for introspection results.
- **Default**: `introspection.md`
- **Format**: Markdown (`.md`)

```bash
shedboxai introspect config.yaml -o analysis.md
shedboxai introspect config.yaml --output report.md
```

#### `-v, --verbose`
Enable verbose logging.

```bash
shedboxai introspect config.yaml --verbose
```

#### `-q, --quiet`
Suppress log messages.

```bash
shedboxai introspect config.yaml --quiet
```

### Introspection-Specific Options

#### `--retry SOURCES`
Retry specific failed sources (comma-separated).

```bash
shedboxai introspect config.yaml --retry source1,source2
```

#### `--skip-errors`
Continue processing if some sources fail.

```bash
shedboxai introspect config.yaml --skip-errors
```

#### `--force`
Overwrite existing output file.

```bash
shedboxai introspect config.yaml --force
```

#### `--validate`
Validate existing introspection against current sources.

```bash
shedboxai introspect config.yaml --validate
```

#### `--include-samples`
Include sample data in output (default: off).

```bash
shedboxai introspect config.yaml --include-samples
```



## Examples

### Basic Usage

```bash
# Analyze data sources in configuration
shedboxai introspect config.yaml

# Save to custom output file
shedboxai introspect config.yaml -o analysis.md

# Include sample data structures
shedboxai introspect config.yaml --include-samples
```

### Error Handling

```bash
# Continue even if some sources fail
shedboxai introspect config.yaml --skip-errors

# Retry specific failed sources
shedboxai introspect config.yaml --retry source1,source2

# Overwrite existing output
shedboxai introspect config.yaml --force
```

### Validation

```bash
# Validate existing introspection file
shedboxai introspect config.yaml --validate

# Quiet mode for automated scripts
shedboxai introspect config.yaml --quiet
```

## Output Format

The introspect command generates a comprehensive Markdown report containing:

- **Data source summaries** - Connection details and basic statistics
- **Schema analysis** - Field types and structure documentation  
- **Sample data** - Representative data examples (if `--include-samples` used)
- **Processing recommendations** - Suggested ShedBoxAI configurations
- **Validation results** - Data quality assessments

### Example Output Structure

```markdown
# Data Source Introspection Report

## Configuration Analysis
- **Sources Found**: 2
- **Total Records Analyzed**: 1,500
- **Generated**: 2024-01-15 10:30:00

## Data Sources

### customers
- **Type**: CSV
- **Path**: ./data/customers.csv
- **Records**: 1,000
- **Fields**: customer_id, name, email, status

### orders  
- **Type**: JSON
- **Path**: ./data/orders.json
- **Records**: 500
- **Fields**: order_id, customer_id, amount, date

## Processing Recommendations
- Use contextual filtering to clean data
- Apply format conversion for field extraction
- Consider relationship highlighting between sources
```

## Performance Considerations

### Large Data Sources

For configurations with large data sources:

```bash
# Use verbose mode to monitor progress
shedboxai introspect config.yaml -v

# Skip problematic sources
shedboxai introspect config.yaml --skip-errors
```

## Integration Examples

### With Claude Code
```bash
# Generate analysis for Claude Code
shedboxai introspect config.yaml --include-samples --output analysis.md

# Use the analysis.md content with Claude Code to:
# "Create optimized ShedBoxAI configuration based on this data analysis"
```

### Automated Documentation
```bash
#!/bin/bash
# Generate up-to-date documentation
shedboxai introspect production_config.yaml \
  --force --output data_sources_docs.md
```

## Error Handling

### Common Errors

**Configuration file not found:**
```bash
shedboxai introspect nonexistent.yaml
# Error: Configuration file not found: nonexistent.yaml
```

**Data source connection failed:**
```bash
# Error: Failed to connect to data source 'customers'
# Solution: Check file paths and permissions in configuration
```

**Output file permissions:**
```bash
# Error: Permission denied writing to introspection.md
# Solution: Check directory permissions or use different output path
```

### Troubleshooting

#### Source Connection Issues
```bash
# Use verbose mode to diagnose
shedboxai introspect config.yaml --verbose

# Skip problematic sources
shedboxai introspect config.yaml --skip-errors
```

#### Retry Failed Sources
```bash
# After identifying failed sources, retry specifically
shedboxai introspect config.yaml --retry source1,source2
```

## Next Steps

- [`shedboxai run`](./run-command.md) - Execute processing configurations  
- [Introspection Overview](../introspection/overview.md) - Learn more about introspection features
- [Configuration Guide](../configuration/data-sources.md) - Configure data sources properly