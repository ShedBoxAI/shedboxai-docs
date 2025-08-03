# Performance Optimization

Guide to optimizing ShedBoxAI performance for data processing pipelines.

## Quick Performance Checklist

### Immediate Optimizations
1. **Filter early**: Apply contextual filtering before other operations
2. **Use smaller datasets**: Start with sample data for development
3. **Enable AI parallel processing**: Set `parallel: true` for AI prompts when processing multiple records
4. **Monitor with verbose output**: Use `--verbose` to identify bottlenecks

## Performance Profiling

### Built-in Profiling Tools

```bash
# Basic verbose output with timing information
shedboxai run config.yaml --verbose

# Introspection for understanding data size
shedboxai introspect config.yaml --include-samples
```

The `--verbose` flag provides detailed execution information including:
- Data source connection times
- Processing operation durations
- Record counts at each stage
- Error messages and warnings

## Data Loading Optimization

### File Format Considerations

**Performance Ranking** (fastest to slowest):
1. **CSV** - Simple, widely supported, fast parsing
2. **JSON** - Structured but slower parsing
3. **YAML** - Human-readable but slowest

```yaml
# CSV optimization
data_sources:
  optimized:
    type: csv
    path: data.csv
    options:
      encoding: utf-8
      delimiter: ","
```

### Large Dataset Strategies

For large datasets, use early filtering to reduce processing load:

```yaml
processing:
  # Filter early to reduce dataset size
  contextual_filtering:
    recent_data:
      source: large_dataset
      conditions:
        - field: date
          condition: ">= '2024-01-01'"
          new_name: "filtered_data"
```

## Processing Optimization

### Operation Ordering

**Optimal Processing Order**:
1. **Contextual Filtering** - Reduce dataset size early
2. **Relationship Highlighting** - Join only necessary data
3. **Format Conversion** - Transform final dataset
4. **AI Processing** - Process minimal, clean data

```yaml
processing:
  # ✅ Optimal: Filter first (reduces dataset size)
  contextual_filtering:
    users:
      - field: status
        condition: "== 'active'"
        new_name: "active_users"
  
  # Then process smaller dataset
  format_conversion:
    user_analysis:
      source: active_users  # Smaller dataset
      extract_fields:
        - user_id
        - name
        - total_spent
```

### Parallel AI Processing

For AI operations that process multiple records individually:

```yaml
ai_interface:
  prompts:
    individual_analysis:
      user_template: |
        Customer: {{name}}
        Spending: ${{total_spent}}
        Generate a brief customer profile.
      
      for_each: user_analysis    # Process each record individually
      parallel: true            # Use parallel processing for speed
      max_tokens: 150           # Limit response length
```

## Memory Optimization

### Memory-Efficient Configuration

```yaml
processing:
  # Filter early to reduce memory usage
  contextual_filtering:
    small_dataset:
      source: large_source
      conditions:
        - field: relevant_field
          condition: "== 'target_value'"
          new_name: "filtered_data"

# Limit AI processing to essential data only
ai_interface:
  prompts:
    efficient_analysis:
      system: "Be concise. Provide brief analysis."
      user_template: "{{filtered_data | first(10)}}"  # Limit data size
      max_tokens: 100  # Limit response length
```

### Large Dataset Strategies

1. **Filter aggressively**: Reduce data size as early as possible
2. **Use `extract_fields`**: Only extract fields you need
3. **Limit AI processing**: Process only essential records
4. **Sample for development**: Use small datasets for testing

```yaml
# Development configuration with sampling
data_sources:
  development:
    type: csv
    path: large_dataset.csv
    options:
      nrows: 1000  # Limit to first 1000 rows for testing
```

## AI Processing Optimization

### Prompt Optimization

```yaml
ai_interface:
  prompts:
    optimized_analysis:
      # Minimize token usage
      system: "Analyze data efficiently. Be concise."
      
      user_template: |
        Data: {{customer_data}}
        Provide 3-bullet analysis.  # Limit response length
      
      # Response controls
      max_tokens: 150           # Limit response length
      temperature: 0.1          # Reduce creativity for consistency
```

### Learning vs Production Mode

Use `store_only` mode for development to avoid API costs:

```yaml
ai_interface:
  prompt_storage:
    enabled: true
    store_only: true        # Learning mode - no API costs
    directory: "prompts"
    
  prompts:
    analysis:
      system: "Analyze customer data."
      user_template: "{{customer_data}}"
```

Switch to production mode when ready:

```yaml
ai_interface:
  model:
    type: rest
    url: https://api.openai.com/v1/chat/completions
    headers:
      Authorization: Bearer ${OPENAI_API_KEY}
      Content-Type: application/json
    options:
      model: gpt-3.5-turbo
      
  prompt_storage:
    store_only: false       # Production mode
```

## Output Optimization

### Output Format Selection

```yaml
output:
  type: file
  path: results.json
  format: json              # Most compatible format
```

## Performance Testing

### Development Best Practices

1. **Start small**: Test with sample data (100-1000 records)
2. **Use verbose output**: Monitor performance with `--verbose`
3. **Test incrementally**: Add complexity gradually
4. **Profile regularly**: Check performance after changes

```bash
# Test with sample data
shedboxai run config.yaml --verbose

# Test introspection performance
shedboxai introspect config.yaml --include-samples --verbose
```

## Performance Troubleshooting

### Common Performance Issues

#### Slow Data Loading
```bash
# Diagnose loading issues with verbose output
shedboxai run config.yaml --verbose

# Common causes:
# 1. Large file sizes
# 2. Network latency (API sources)
# 3. Complex data structures
```

**Solutions:**
- Filter data early to reduce processing load
- Use simpler data formats (CSV vs JSON)
- Check network connectivity for API sources

#### High Memory Usage
```bash
# Monitor with verbose output
shedboxai run config.yaml --verbose

# Signs of high memory usage:
# - Slow processing
# - System becoming unresponsive
# - Out of memory errors
```

**Solutions:**
- Filter data early with contextual filtering
- Use `extract_fields` to select only needed columns
- Process smaller datasets during development
- Limit AI processing to essential records

#### Slow AI Processing

**Solutions:**
- Use `parallel: true` for multiple record processing
- Limit `max_tokens` to reduce response time
- Use shorter, more focused prompts
- Consider using `store_only: true` for development

## Best Practices Summary

### Development Phase
1. **Start small**: Test with 100-1000 records
2. **Use verbose output**: Monitor performance with `--verbose`
3. **Filter early**: Apply contextual filtering first
4. **Limit AI processing**: Use `store_only: true` for development

### Production Phase
1. **Filter aggressively**: Reduce data size as much as possible
2. **Use parallel AI processing**: Enable `parallel: true` for multi-record AI operations
3. **Optimize prompts**: Use concise prompts with token limits
4. **Monitor performance**: Use `--verbose` to track execution times

### Scaling Guidelines
- **< 1K records**: Default configuration should work well
- **1K-10K records**: Apply early filtering, use parallel AI processing
- **> 10K records**: Aggressive filtering essential, consider processing in batches

## Related Documentation

- [Common Issues](./common-issues.md) - Troubleshooting errors and issues
- [Debugging Guide](./debugging.md) - Advanced debugging techniques
- [Operations Reference](../operations/index.md) - Understanding all available operations