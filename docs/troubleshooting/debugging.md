# Debugging Guide

Comprehensive guide for troubleshooting ShedBoxAI issues, from configuration errors to performance problems.

## Quick Diagnostic Checklist

### Before You Start
1. **Verify Installation**: `shedboxai --version`
2. **Check Configuration**: `shedboxai validate config.yaml`
3. **Enable Verbose Logging**: Add `-v` or `--verbose` to any command
4. **Test with Sample Data**: Use small datasets first

## Common Error Categories

## Configuration Errors

### YAML Syntax Issues

**Error**: `yaml.scanner.ScannerError: mapping values are not allowed here`

**Cause**: Invalid YAML syntax, often indentation or character issues.

**Solution**:
```bash
# Validate YAML syntax
shedboxai validate config.yaml

# Common issues:
# 1. Mixed tabs and spaces
# 2. Missing colons after keys  
# 3. Incorrect indentation
```

**Example Fix**:
```yaml
# ❌ Incorrect
data_sources:
customers:  # Missing space after colon
  type csv  # Missing colon

# ✅ Correct
data_sources:
  customers:
    type: csv
```

### Missing Required Fields

**Error**: `ValidationError: field required`

**Cause**: Required configuration fields are missing.

**Debug Steps**:
```bash
# Check configuration structure
shedboxai validate config.yaml --verbose

# Review required fields in documentation
shedboxai help config
```

**Common Missing Fields**:
```yaml
# Always required
data_sources:
  source_name:
    type: csv          # Required
    path: data.csv     # Required

processing:
  operation_name:
    source: source_name  # Required - references data_sources

output:
  type: file           # Required
  path: output.json    # Required
```

### Invalid Field References

**Error**: `KeyError: 'field_name' not found in source data`

**Cause**: Configuration references non-existent fields.

**Debug Strategy**:
```bash
# Inspect data schema first
shedboxai introspect data.csv --include schema

# Check field names in configuration
grep -n "field:" config.yaml
```

**Solution**:
```yaml
# Use introspection results to verify field names
processing:
  contextual_filtering:
    filter_name:
      source: customers
      conditions:
        - field: customer_id  # Must exist in customers data
          condition: "customer_id > 0"
```

## Data Source Errors

### File Not Found

**Error**: `FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'`

**Debug Steps**:
```bash
# Check current directory
pwd
ls -la

# Verify file path
shedboxai introspect data.csv --verbose
```

**Solutions**:
```yaml
# Use absolute paths
data_sources:
  customers:
    path: /full/path/to/data.csv

# Or relative to config file location
data_sources:
  customers:
    path: ./data/customers.csv
```

### CSV Parsing Issues

**Error**: `pandas.errors.ParserError: Expected 5 fields in line 10, saw 7`

**Diagnosis**:
```bash
# Inspect problematic lines
head -n 15 data.csv | tail -n 5

# Check for delimiter issues
shedboxai introspect data.csv --csv-delimiter ';' --verbose
```

**Solutions**:
```yaml
data_sources:
  problematic_csv:
    type: csv
    path: data.csv
    options:
      delimiter: ";"        # Specify correct delimiter
      quotechar: '"'        # Handle quoted fields
      encoding: utf-8       # Set correct encoding
      error_bad_lines: false # Skip problematic lines
```

### JSON Structure Problems

**Error**: `JSONDecodeError: Expecting ',' delimiter: line 5 column 10`

**Debug Approach**:
```bash
# Validate JSON structure
python -m json.tool data.json

# Check for common issues
cat data.json | grep -n "'"  # Single quotes (invalid JSON)
```

**Common Fixes**:
```yaml
data_sources:
  api_data:
    type: json
    path: data.json
    options:
      array_path: "$.data"     # Extract nested arrays
      encoding: utf-8          # Handle encoding issues
      strict: false            # Allow lenient parsing
```

## Processing Errors

### Expression Evaluation Failures

**Error**: `ExpressionError: Invalid expression: 'age > twenty'`

**Cause**: Invalid expression syntax in conditions or calculated fields.

**Debug Process**:
```bash
# Test expressions individually
shedboxai run config.yaml --debug-expressions

# Check field types
shedboxai introspect data.csv --include schema
```

**Valid Expression Examples**:
```yaml
processing:
  contextual_filtering:
    adults:
      conditions:
        # ✅ Correct numeric comparison
        - field: age
          condition: "age > 20"
        
        # ✅ String comparison
        - field: status
          condition: "status == 'active'"
        
        # ✅ Date comparison
        - field: created_date
          condition: "created_date > '2024-01-01'"
        
        # ❌ Common errors
        # condition: "age > twenty"        # String where number expected
        # condition: "age == '20'"         # String comparison with number
        # condition: "Age > 20"            # Wrong field name case
```

### Memory Issues

**Error**: `MemoryError: Unable to allocate array`

**Symptoms**:
- Process killed by OS
- Extremely slow processing
- System becomes unresponsive

**Solutions**:
```yaml
processing:
  performance_optimization:
    # Process in chunks
    batch_size: 1000
    
    # Use streaming for large files
    streaming: true
    
    # Limit memory usage
    max_memory: "2GB"
    
    # Sample large datasets
    sample_size: 10000
```

**Command Line Options**:
```bash
# Limit processing to smaller chunks
shedboxai run config.yaml --batch-size 500

# Use streaming mode
shedboxai run config.yaml --streaming

# Process sample only
shedboxai run config.yaml --sample 5000
```

## AI Interface Errors

### API Authentication Issues

**Error**: `401 Unauthorized: Invalid API key`

**Debug Checklist**:
```bash
# Check environment variables
echo $OPENAI_API_KEY
echo $ANTHROPIC_API_KEY

# Test API directly
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

**Configuration Fix**:
```yaml
ai_interface:
  model:
    type: rest
    url: https://api.openai.com/v1/chat/completions
    headers:
      Authorization: "Bearer ${OPENAI_API_KEY}"
      Content-Type: application/json
    options:
      model: gpt-4
```

### Rate Limiting

**Error**: `429 Too Many Requests: Rate limit exceeded`

**Solutions**:
```yaml
ai_interface:
  rate_limiting:
    requests_per_minute: 10    # Slow down requests
    retry_attempts: 3          # Retry failed requests
    backoff_factor: 2          # Exponential backoff
    
  batch_processing:
    enabled: true              # Batch multiple prompts
    batch_size: 5             # Requests per batch
```

### Prompt Too Long

**Error**: `400 Bad Request: Token limit exceeded`

**Debug and Fix**:
```bash
# Check prompt length
shedboxai run config.yaml --debug-prompts --dry-run

# Count tokens
echo "{{your_prompt}}" | wc -w  # Rough estimate
```

**Solutions**:
```yaml
ai_interface:
  prompts:
    analysis:
      # Truncate data if too long
      max_input_tokens: 3000
      
      # Use summary instead of full data
      user_template: |
        Analyze this summary: {{data | summarize(500)}}
        
      # Split processing into chunks
      chunk_processing: true
      chunk_size: 1000
```

## Performance Issues

### Slow Processing

**Symptoms**:
- Processing takes hours instead of minutes
- High CPU/memory usage
- No progress indicators

**Diagnosis**:
```bash
# Enable performance profiling
shedboxai run config.yaml --profile --verbose

# Check bottlenecks
shedboxai run config.yaml --debug --timing
```

**Optimization Strategies**:
```yaml
processing:
  performance:
    # Use parallel processing
    parallel: true
    max_workers: 4
    
    # Optimize operations order
    operation_order:
      - contextual_filtering  # Filter early to reduce data
      - format_conversion    # Transform smaller dataset
      - ai_interface        # Process final results
    
    # Cache intermediate results
    caching:
      enabled: true
      strategy: lru
      max_size: 1000
```

### High Memory Usage

**Debug Memory Issues**:
```bash
# Monitor memory usage
shedboxai run config.yaml --monitor-memory

# Profile memory allocation
shedboxai run config.yaml --memory-profile
```

**Memory Optimization**:
```yaml
processing:
  memory_optimization:
    # Process in streaming mode
    streaming: true
    
    # Clear intermediate results
    cleanup_intermediate: true
    
    # Use disk for large operations
    disk_spill: true
    spill_directory: "/tmp/shedboxai"
    
    # Limit concurrent operations
    max_concurrent_operations: 2
```

## Network and API Issues

### Connection Timeouts

**Error**: `requests.exceptions.ConnectTimeout: Connection timed out`

**Solutions**:
```yaml
data_sources:
  api_source:
    type: rest_api
    url: https://slow-api.com/data
    options:
      timeout: 60              # Increase timeout
      retry_attempts: 3        # Retry on failure
      retry_delay: 5           # Wait between retries
```

### SSL Certificate Issues

**Error**: `SSL: CERTIFICATE_VERIFY_FAILED`

**Temporary Fix** (not recommended for production):
```yaml
data_sources:
  api_source:
    options:
      verify_ssl: false  # Only for testing
```

**Proper Solution**:
```bash
# Update certificates
pip install --upgrade certifi

# Use custom certificate bundle
export SSL_CERT_FILE=/path/to/certificate.pem
```

## Logging and Debugging

### Enable Detailed Logging

```bash
# Verbose output
shedboxai run config.yaml --verbose

# Debug mode with full stack traces
shedboxai run config.yaml --debug

# Save logs to file
shedboxai run config.yaml --verbose 2>&1 | tee debug.log
```

### Custom Logging Configuration

```yaml
logging:
  level: DEBUG
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  handlers:
    - type: file
      filename: shedboxai.log
      max_size: 10MB
      backup_count: 5
    - type: console
      level: INFO
```

### Dry Run Mode

Test configuration without executing:

```bash
# Validate and show execution plan
shedboxai run config.yaml --dry-run

# Show generated prompts without API calls
shedboxai run config.yaml --dry-run --show-prompts
```

## Advanced Debugging Techniques

### Step-by-Step Execution

```bash
# Process one operation at a time
shedboxai run config.yaml --step-mode

# Stop on first error
shedboxai run config.yaml --stop-on-error

# Continue from specific step
shedboxai run config.yaml --start-from step_name
```

### Data Inspection

```yaml
processing:
  debug_output:
    # Save intermediate results
    save_intermediate: true
    output_directory: "debug_outputs/"
    
    # Add debug information
    include_metadata: true
    include_processing_stats: true
```

### Configuration Testing

```bash
# Test with minimal data
head -n 10 large_file.csv > test_sample.csv
shedboxai run config.yaml  # Update config to use test_sample.csv

# Validate configuration structure
shedboxai validate config.yaml --strict

# Check for unused configuration
shedboxai analyze config.yaml --find-unused
```

## Getting Help

### Built-in Help

```bash
# General help
shedboxai --help

# Command-specific help
shedboxai run --help
shedboxai introspect --help

# Configuration examples
shedboxai examples
```

### Community Resources

- **GitHub Issues**: Report bugs and get help
- **Discord Community**: Real-time support
- **Documentation**: Comprehensive guides and examples
- **Example Configurations**: Pre-built configs for common use cases

### Creating Bug Reports

Include this information when reporting issues:

```bash
# System information
shedboxai --version
python --version
uname -a

# Error reproduction
shedboxai run config.yaml --verbose 2>&1 | tee error_log.txt

# Configuration (remove sensitive data)
cat config.yaml
```

## Related Documentation

- [Performance Optimization](./performance.md) - Advanced performance tuning
- [Configuration Reference](/docs/configuration/overview.md) - Complete configuration guide  
- [CLI Reference](/docs/cli-reference/overview.md) - All command-line options