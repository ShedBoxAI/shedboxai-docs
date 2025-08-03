# Output Formats

Configure how ShedBoxAI saves and presents your processed data.

## Overview

ShedBoxAI supports flexible output configuration:
- **File Output**: JSON, YAML formats
- **Console Output**: Pretty-printed results
- **Auto-creation**: Output directories created automatically

## Basic Output Configuration

### File Output

Save results to files:

```yaml
output:
  type: file
  path: output/results.json
  format: json
```

### Console Output

Print results to console:

```yaml
output:
  type: print
```

## Output Formats

### JSON Format

Structured JSON output with formatting options:

```yaml
output:
  type: file
  path: output/data.json
  format: json
  options:
    indent: 2           # Pretty formatting
    ensure_ascii: false # Allow Unicode characters
    sort_keys: true     # Sort object keys
```

**Example Output:**
```json
{
  "filtered_customers": [
    {
      "name": "John Smith",
      "age": 34,
      "segment": "Premium"
    }
  ],
  "summary_stats": {
    "total_customers": 150,
    "avg_age": 32.5
  }
}
```

### YAML Format

Human-readable YAML output:

```yaml
output:
  type: file
  path: output/data.yaml
  format: yaml
```

**Example Output:**
```yaml
filtered_customers:
  - name: John Smith
    age: 34
    segment: Premium
summary_stats:
  total_customers: 150
  avg_age: 32.5
```

## Supported Output Types

ShedBoxAI supports two output types:

### File Output
- **JSON**: Structured data output
- **YAML**: Human-readable format

### Console Output
- **Print**: Direct console output

**Note**: Only JSON and YAML file formats are currently supported.

## Directory Handling

Output directories are automatically created if they don't exist:

```yaml
output:
  type: file
  path: output/nested/directory/results.json  # Creates full path
  format: json
```

## Next Steps

- [Operations](../operations/) - Process data before output
- [CLI Reference](../cli-reference/run-command.md) - Command-line output options
- [Examples](../examples/) - Real-world output configurations