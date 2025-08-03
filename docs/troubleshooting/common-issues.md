# Common Issues

Solutions to frequently encountered problems when using ShedBoxAI. This guide covers installation issues, configuration errors, data source problems, and runtime errors.

## Installation Issues

### Package Installation Problems

#### Issue: `pip install shedboxai` fails
```bash
ERROR: Could not find a version that satisfies the requirement shedboxai
```

**Solutions:**
1. **Update pip**: `pip install --upgrade pip`
2. **Check Python version**: Requires Python 3.8+
3. **Use specific index**: `pip install -i https://pypi.org/simple/ shedboxai`
4. **Clear pip cache**: `pip cache purge`

#### Issue: Permission denied during installation
```bash
ERROR: Could not install packages due to an EnvironmentError: [Errno 13] Permission denied
```

**Solutions:**
1. **Use user install**: `pip install --user shedboxai`
2. **Use virtual environment**: `python -m venv venv && source venv/bin/activate`
3. **Use sudo** (not recommended): `sudo pip install shedboxai`

### Dependency Conflicts

#### Issue: Conflicting package versions
```bash
ERROR: pip's dependency resolver does not currently consider all the packages that are installed
```

**Solutions:**
1. **Create fresh virtual environment**:
   ```bash
   python -m venv fresh_env
   source fresh_env/bin/activate  # Linux/Mac
   # or
   fresh_env\Scripts\activate  # Windows
   pip install shedboxai
   ```

2. **Use pip-tools for dependency management**:
   ```bash
   pip install pip-tools
   pip-compile requirements.in
   pip-sync requirements.txt
   ```

## Configuration Errors

### YAML Syntax Issues

#### Issue: Invalid YAML syntax
```bash
Error: Invalid YAML syntax in config.yaml
yaml.scanner.ScannerError: while scanning for the next token found character '\t' that cannot start any token
```

**Solutions:**
1. **Use spaces instead of tabs**: YAML requires spaces for indentation
2. **Validate YAML syntax**: Use online YAML validators
3. **Check quote consistency**: Ensure matching quotes
4. **Proper list syntax**: Use `-` for list items

**Example Fix:**
```yaml
# ❌ Incorrect (uses tabs)
data_sources:
	users:
		type: csv

# ✅ Correct (uses spaces)
data_sources:
  users:
    type: csv
```

### Missing Required Fields

#### Issue: Missing required configuration sections
```bash
Error: Missing required field 'data_sources' in configuration
```

**Solutions:**
1. **Add required sections**:
   ```yaml
   # Minimum required configuration
   data_sources:
     example:
       type: csv
       path: data.csv
   
   output:
     type: print
   ```

2. **Check section names**: Ensure correct spelling and case
3. **Validate structure**: Follow documentation examples

### Environment Variable Issues

#### Issue: Environment variables not found
```bash
Error: Environment variable 'OPENAI_API_KEY' not found
```

**Solutions:**
1. **Set environment variables**:
   ```bash
   # Linux/Mac
   export OPENAI_API_KEY="your_key_here"
   
   # Windows
   set OPENAI_API_KEY=your_key_here
   ```

2. **Use .env files**:
   ```bash
   # Create .env file in project root
   echo "OPENAI_API_KEY=your_key_here" > .env
   ```

3. **Check variable names**: Ensure exact spelling
4. **Verify accessibility**: `echo $OPENAI_API_KEY`

## Data Source Problems

### File Not Found Errors

#### Issue: CSV/JSON/YAML files not found
```bash
Error: File not found: data/users.csv
```

**Solutions:**
1. **Check file path**: Verify relative/absolute paths
2. **Verify file exists**: `ls -la data/users.csv`
3. **Check permissions**: Ensure file is readable
4. **Use absolute paths** when relative paths fail:
   ```yaml
   data_sources:
     users:
       type: csv
       path: /full/path/to/data/users.csv
   ```

### API Connection Issues

#### Issue: REST API connection failures
```bash
Error: Failed to connect to https://api.example.com/data
HTTPSConnectionPool: Max retries exceeded
```

**Solutions:**
1. **Check URL accessibility**: `curl https://api.example.com/data`
2. **Verify API credentials**: Test with Postman or curl
3. **Check network connectivity**: Firewall, VPN, proxy settings
4. **Add timeout settings**:
   ```yaml
   data_sources:
     api:
       type: rest
       url: https://api.example.com/data
       options:
         timeout: 60
   ```

### Authentication Problems

#### Issue: API authentication failures
```bash
Error: 401 Unauthorized - Invalid API key
```

**Solutions:**
1. **Verify API key**: Check key validity and permissions
2. **Check header format**:
   ```yaml
   headers:
     Authorization: Bearer ${API_KEY}  # Not "Token" or other formats
   ```
3. **Test authentication separately**: Use curl to verify
4. **Check token expiration**: Renew if expired

### Data Format Issues

#### Issue: Unsupported or corrupted data formats
```bash
Error: Unable to parse CSV file - delimiter detection failed
```

**Solutions:**
1. **Specify format options**:
   ```yaml
   data_sources:
     custom_csv:
       type: csv
       path: data.csv
       options:
         delimiter: "|"
         encoding: "latin-1"
         skiprows: 2
   ```

2. **Check file encoding**: Use `file` command on Linux/Mac
3. **Validate data structure**: Open file in text editor
4. **Handle special characters**: Specify proper encoding

## Processing Errors

### Expression Engine Issues

#### Issue: Expression syntax errors
```bash
Error: Invalid expression syntax: "age > 18 &&& status == 'active'"
```

**Solutions:**
1. **Use correct operators**: `&&` not `&&&`, `||` not `|||`
2. **Check function names**: Use exact function names from documentation
3. **Validate parentheses**: Ensure balanced parentheses
4. **Test expressions**: Start with simple expressions

**Example Fixes:**
```yaml
# ❌ Incorrect
condition: "age > 18 &&& status == 'active'"

# ✅ Correct
condition: "age > 18 && status == 'active'"
```

### Memory Issues

#### Issue: Out of memory errors with large datasets
```bash
Error: MemoryError: Unable to allocate array
```

**Solutions:**
1. **Process in chunks**:
   ```yaml
   data_sources:
     large_file:
       type: csv
       path: huge_dataset.csv
       options:
         chunksize: 10000
   ```

2. **Use streaming mode**:
   ```yaml
   processing:
     streaming: true
   ```

3. **Increase system memory** or use cloud instances
4. **Filter data early** to reduce memory usage

### Template Rendering Issues

#### Issue: Jinja2 template errors
```bash
Error: TemplateError: 'item' is undefined
```

**Solutions:**
1. **Check variable names**: Ensure `item` is available in context
2. **Use safe filters**:
   ```yaml
   template: "{{item.name|default('Unknown')}}"
   ```

3. **Debug template context**: Use `{{item|pprint}}` to see available data
4. **Validate template syntax**: Test templates separately

## AI Integration Issues

### API Rate Limits

#### Issue: Too many API requests
```bash
Error: Rate limit exceeded. Please try again later
```

**Solutions:**
1. **Add delays between requests**:
   ```yaml
   ai_interface:
     retry_config:
       initial_delay: 2
       max_delay: 30
   ```

2. **Use batch processing** instead of individual requests
3. **Implement exponential backoff**
4. **Monitor usage** and upgrade API plan if needed

### Token Limit Exceeded

#### Issue: Input or output too long
```bash
Error: Token limit exceeded (4096 tokens)
```

**Solutions:**
1. **Reduce prompt length**: Summarize input data
2. **Use smaller models**: Switch to models with larger limits
3. **Process in smaller batches**:
   ```yaml
   ai_interface:
     prompts:
       analysis:
         for_each: "data_chunks"
         max_tokens: 2000
   ```

4. **Implement chunking strategy**

### Model Availability

#### Issue: AI model unavailable
```bash
Error: Model 'gpt-4' is not available for your subscription
```

**Solutions:**
1. **Use available models**: Switch to gpt-3.5-turbo or claude-instant
2. **Check API subscription**: Verify model access
3. **Update model configuration**:
   ```yaml
   ai_interface:
     model:
       options:
         model: gpt-3.5-turbo  # Available model
   ```

## Performance Issues

### Slow Processing

#### Issue: Pipeline takes too long to execute
**Solutions:**
1. **Profile performance**: Use `--verbose` flag to identify bottlenecks
2. **Optimize data sources**: Add indexes, use efficient queries
3. **Parallel processing**: Enable parallel operations where possible
4. **Cache intermediate results**: Store processed data for reuse

### High Memory Usage

#### Issue: System running out of memory
**Solutions:**
1. **Monitor memory usage**: Use system monitoring tools
2. **Process incrementally**: Break large datasets into smaller chunks
3. **Optimize operations**: Use efficient algorithms and data structures
4. **Clean up resources**: Ensure proper garbage collection

## Output Issues

### File Permission Errors

#### Issue: Cannot write output files
```bash
Error: Permission denied: Cannot write to output/results.json
```

**Solutions:**
1. **Check directory permissions**: `ls -la output/`
2. **Create output directory**: `mkdir -p output`
3. **Use different output path**: Write to user-accessible directory
4. **Run with appropriate permissions**

### Output Format Problems

#### Issue: Unexpected output format
```bash
Error: Expected JSON output but received text
```

**Solutions:**
1. **Check output configuration**:
   ```yaml
   output:
     type: file
     path: results.json
     format: json  # Explicit format
   ```

2. **Verify file extension**: Use `.json` for JSON, `.yaml` for YAML
3. **Check template output**: Ensure templates produce expected format

## Debugging Strategies

### Enable Verbose Logging

```bash
# Get detailed execution information
shedboxai run config.yaml --verbose

# Save debug output
shedboxai run config.yaml -v 2>&1 | tee debug.log
```

### Test Components Separately

1. **Test data sources**: Use introspection to verify connectivity
   ```bash
   shedboxai introspect sources.yaml
   ```

2. **Test small datasets**: Start with sample data
3. **Test operations individually**: Comment out complex processing
4. **Validate configuration**: Use YAML validators

### Use Development Practices

1. **Version control configurations**: Track changes with git
2. **Start simple**: Begin with basic configurations
3. **Test incrementally**: Add complexity gradually
4. **Document issues**: Keep notes on problems and solutions

## Getting Help

### Community Resources
- Check GitHub issues for similar problems
- Search documentation for specific error messages
- Review examples for configuration patterns

### Creating Bug Reports
When reporting issues, include:
1. **Complete error message**
2. **Configuration file** (sanitized)
3. **Environment information**: OS, Python version, ShedBoxAI version
4. **Steps to reproduce**
5. **Expected vs actual behavior**

### Emergency Workarounds
- Use alternative data sources if one fails
- Skip problematic operations temporarily
- Implement manual fallbacks for critical processes
- Use cached results when available

## Next Steps

- [Debugging Guide](./debugging.md) - Advanced debugging techniques
- [Performance Guide](./performance.md) - Optimization strategies
- [CLI Reference](../cli-reference/) - Complete command documentation
- [Configuration Guide](../configuration/) - Comprehensive configuration help