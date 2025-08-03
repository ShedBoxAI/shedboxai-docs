# `shedboxai run` Command

Execute your configured data processing pipelines with options for output and logging control.

## Basic Usage

```bash
shedboxai run config.yaml
```

## Command Syntax

```bash
shedboxai run [OPTIONS] CONFIG_FILE
```

### Arguments

- `CONFIG_FILE` - Path to your YAML configuration file (required)

### Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--output` | `-o` | Specify output file path | `-o results.json` |
| `--verbose` | `-v` | Enable detailed logging | `-v` |
| `--quiet` | `-q` | Suppress log messages | `-q` |

## Detailed Options

### Output Control

#### `--output` / `-o`
Specify where to save pipeline results:

```bash
# Save to JSON file
shedboxai run config.yaml -o results.json

# Save to custom path
shedboxai run config.yaml -o /path/to/results.json
```

**Output Format:**
- All output is saved in JSON format regardless of file extension

### Logging Control

#### `--verbose` / `-v`
Enable detailed logging for debugging:

```bash
shedboxai run config.yaml -v
```

**Verbose Output Includes:**
- Data source connection details
- Processing step execution
- Record counts and transformations
- Error details and stack traces

#### `--quiet` / `-q`
Suppress all log messages except errors:

```bash
shedboxai run config.yaml -q
```

**Quiet Mode:**
- Only critical errors are displayed
- No informational messages
- Faster execution (no logging overhead)

## Usage Examples

### Basic Execution

```bash
# Run pipeline with default settings
shedboxai run pipeline.yaml

# Run with verbose logging
shedboxai run pipeline.yaml --verbose

# Run quietly (errors only)
shedboxai run pipeline.yaml --quiet
```

### Output Management

```bash
# Save results to specific file
shedboxai run config.yaml -o analysis_results.json

# Save with timestamp
shedboxai run config.yaml -o "results_$(date +%Y%m%d_%H%M%S).json"

# Save to different directory
shedboxai run config.yaml -o output/daily_analysis.yaml
```

### Combined Options

```bash
# Verbose execution with custom output
shedboxai run config.yaml -v -o debug_results.json

# Quiet execution for production
shedboxai run config.yaml -q -o production_output.json

# Development debugging
shedboxai run config.yaml --verbose --output detailed_debug.yaml
```

## Configuration File Requirements

### Valid Configuration Files

The configuration file must be valid YAML with required sections:

```yaml
# Minimum required configuration
data_sources:
  example:
    type: csv
    path: data.csv

output:
  type: print
```

### Configuration Validation

The command validates your configuration before execution:

- **YAML Syntax**: Valid YAML format
- **Required Sections**: Must have `data_sources`
- **Data Source Paths**: Files must exist and be readable
- **API Credentials**: Environment variables must be set
- **Output Paths**: Directories must be writable

## Exit Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 0 | Success | Pipeline completed successfully |
| 1 | Error | Any error occurred during execution |
| 130 | Cancelled | Operation cancelled by user (Ctrl+C) |

## Error Handling

### Common Errors and Solutions

#### Configuration Errors
```bash
Error: Invalid YAML syntax in config.yaml
Solution: Validate YAML syntax using online validator
```

#### Data Source Errors
```bash
Error: File not found: data/users.csv
Solution: Check file path and ensure file exists
```

#### Permission Errors
```bash
Error: Permission denied writing to output/results.json
Solution: Check directory permissions or run with appropriate privileges
```

#### API Errors
```bash
Error: API authentication failed for OpenAI
Solution: Verify OPENAI_API_KEY environment variable is set
```

### Debug Mode

Use verbose mode to debug issues:

```bash
shedboxai run config.yaml -v -o debug.json 2>&1 | tee debug.log
```

This will:
- Enable verbose logging (`-v`)
- Save output to `debug.json`
- Capture both stdout and stderr
- Save log to `debug.log` file

## Performance Considerations

### Large Datasets

For large datasets, consider:

```bash
# Time execution
time shedboxai run config.yaml -o results.json

# Use verbose mode for detailed logging
shedboxai run config.yaml -v
```

## Environment Variables


### Optional Variables

Environment variables for API access may be required depending on your configuration:

```bash
# For AI-powered features (if configured)
export OPENAI_API_KEY="your_openai_key"
export ANTHROPIC_API_KEY="your_claude_key"
```

## Automation

### Basic Script Usage

Use in shell scripts:

```bash
#!/bin/bash
# Run pipeline with error handling
if shedboxai run config.yaml -q -o results.json; then
    echo "Pipeline completed successfully"
else
    echo "Pipeline failed with exit code $?"
fi
```

### With Timeout

```bash
# Limit execution time
timeout 300 shedboxai run config.yaml -o results.json  # 5 minutes max
```

## Troubleshooting

### Common Issues

1. **Configuration not found**
   ```bash
   Error: Configuration file 'config.yaml' not found
   Solution: Verify file path and current directory
   ```

2. **Permission denied**
   ```bash
   Error: Permission denied: Cannot write to output directory
   Solution: Check directory permissions or use different output path
   ```

3. **API rate limits**
   ```bash
   Error: Rate limit exceeded for API calls
   Solution: Add delays in configuration or reduce batch size
   ```

4. **Memory issues**
   ```bash
   Error: Memory allocation failed
   Solution: Process data in smaller chunks or increase available memory
   ```

### Getting Help

```bash
# Show command help
shedboxai run --help

# Enable verbose logging for debugging
shedboxai run config.yaml -v
```

## Next Steps

- [Introspect Command](./introspect-command.md) - Analyze data sources
- [Configuration Guide](../configuration/data-sources.md) - Create and optimize configurations
- [Troubleshooting](../troubleshooting/common-issues.md) - Resolve common issues
- [Examples](../examples/) - Real-world usage patterns