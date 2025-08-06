# Introspection Overview

ShedBoxAI's introspection feature is specifically designed to make writing configurations effortless with AI assistants like Claude Code. It analyzes your data sources and generates LLM-optimized documentation that enables AI to write perfect ShedBoxAI configurations for you.

## What is Introspection?

Introspection is an **LLM-powered configuration assistant** that:
- **Deeply analyzes your data sources** with statistical profiling and schema detection
- **Generates AI-optimized documentation** specifically formatted for LLMs like Claude Code
- **Provides intelligent recommendations** for processing operations based on your data patterns
- **Makes config writing effortless** - just paste the introspection report to Claude Code and ask for a configuration!

## Key Features

### Deep Data Analysis
- **Advanced Schema Detection**: Full column type inference with pattern recognition (emails, IDs, UUIDs, phone numbers)
- **Statistical Profiling**: Comprehensive stats including quartiles, distributions, and categorical analysis
- **Intelligent Sampling**: Stratified sampling for representative data examples
- **Relationship Discovery**: Automatic detection of primary/foreign key relationships

### LLM Optimization
- **Token Estimation**: Calculates dataset size impact on LLM context windows
- **Processing Recommendations**: AI suggests optimal operations based on data characteristics
- **Configuration Hints**: Intelligent suggestions for filtering, grouping, and aggregation
- **Error Prevention**: Warns about potential issues before they occur

### Supported Data Sources
- **CSV Analysis**: Advanced statistical profiling, categorical detection, identifier recognition
- **JSON Analysis**: Nested structure mapping, schema consistency validation, array analysis
- **REST API Analysis**: Response structure analysis, authentication testing, format validation
- **YAML Analysis**: Configuration validation, structure parsing, key enumeration
- **Text Analysis**: Content structure detection, encoding analysis, pattern recognition

## How It Works

### 1. Define Your Data Sources
You only need to define your data sources in a basic ShedBoxAI configuration - no processing operations required:

```yaml
# config.yaml - Just define your data sources
data_sources:
  users:
    type: csv
    path: data/users.csv
  
  orders:
    type: rest
    url: https://api.example.com/orders
    headers:
      Authorization: Bearer ${API_TOKEN}
```

### 2. Run Introspection
Execute the introspection command to analyze your data sources:

```bash
# Generate LLM-optimized analysis report
shedboxai introspect config.yaml --include-samples -o analysis.md
```

### 3. Get LLM-Ready Documentation
Introspection produces a comprehensive markdown report that includes:
- **Data Source Validation**: Connection status and error detection
- **Schema Analysis**: Detailed structure and statistical profiling  
- **LLM Processing Notes**: Token estimates and context window warnings
- **Operation Recommendations**: AI-suggested pipeline configurations
- **Sample Data**: Representative examples for AI context understanding

### 4. Error Detection and Validation
Introspection identifies common data source problems:
- **File Issues**: Missing files, permission problems, encoding errors
- **API Problems**: Authentication failures, network connectivity, rate limiting
- **Configuration Errors**: Missing environment variables, invalid formats
- **Data Quality Issues**: Schema inconsistencies, large dataset warnings

## Benefits

### Data Source Validation
- **Connection Testing**: Verify all data sources are accessible before building pipelines
- **Error Detection**: Identify file, API, authentication, and configuration problems early
- **Environment Variable Validation**: Check missing API keys and credentials
- **Permission Verification**: Ensure file access rights and API permissions are correct

### LLM-Powered Configuration
- **AI-Ready Reports**: Generate documentation specifically formatted for Claude Code and other LLMs
- **Effortless Config Writing**: Simply paste the introspection report to AI assistants for instant pipeline generation
- **Intelligent Recommendations**: Get AI-suggested operations based on your actual data patterns
- **Token Optimization**: Understand dataset size impact on LLM context windows

### Pipeline Planning
- **Schema Understanding**: Deep analysis of data structure, types, and relationships
- **Statistical Profiling**: Comprehensive stats including distributions and data quality metrics
- **Relationship Discovery**: Automatic detection of foreign keys and joinable fields
- **Performance Insights**: Size warnings and optimization recommendations

## LLM-Optimized Output

Introspection generates detailed reports specifically designed for AI consumption:

```markdown
# Data Source Introspection for LLM
Generated: 2024-01-15T10:30:00
Sources Analyzed: 2/2

## LLM Processing Notes
- Context Window: All datasets are small-medium, direct processing suitable
- Key columns detected: customer_id, order_id - suitable for relationship operations
- Numeric columns available: amount, quantity - suitable for statistical operations
- Categorical columns available: status, category - suitable for grouping operations

## Data Sources

### customers.csv
- **Records**: 1,250 customers
- **Schema**: customer_id (integer, unique), name (string), email (string, 98% valid), status (categorical: active 75%, premium 15%, inactive 10%)
- **Sample Data**: [{"customer_id": 1001, "name": "John Smith", "email": "john@email.com", "status": "active"}]
- **LLM Recommendations**: 
  - Use contextual_filtering to segment by status
  - Email column suitable for pattern validation
  - customer_id is primary key for relationships

### orders (REST API)
- **Endpoint**: https://api.example.com/orders
- **Schema**: order_id (string, structured_id pattern), customer_id (integer, foreign key), amount (float, range: $10-$5000)
- **Relationships**: orders.customer_id ↔ customers.customer_id (foreign key)

## Recommended ShedBoxAI Configuration
[Ready-to-use YAML structure with operation suggestions]
```

## Use Cases

### Data Source Validation
Quickly verify your configuration:
- Check if data sources are accessible
- Validate connection settings
- Preview data structure and format
- Identify basic connection issues

### Pipeline Planning
Plan your processing operations:
- Understand basic data structure
- Get simple processing recommendations
- Identify data formats and types
- Plan filtering and transformation steps

### Documentation
Create basic data documentation:
- Generate simple data source overviews
- Share configuration details with team
- Document data source accessibility
- Maintain basic data inventories

## Getting Started

### Basic Usage
Analyze your ShedBoxAI configuration:

```bash
# Analyze data sources in your config
shedboxai introspect config.yaml
```

### Include Sample Data
Add sample data to the report:

```bash
shedboxai introspect config.yaml --include-samples
```

### Error Handling and Troubleshooting
Introspection provides comprehensive error detection with helpful recovery guidance:

```bash
# Skip errors and continue with partial results
shedboxai introspect config.yaml --skip-errors

# Retry specific failed sources after fixing issues
shedboxai introspect config.yaml --retry source1,source2

# Force overwrite existing output
shedboxai introspect config.yaml --force
```

**Common Issues Detected:**
- **Missing Files**: `File not found: /path/to/data.csv 💡 Check file path and permissions`
- **Authentication Failures**: `Invalid credentials 💡 Check API key in environment variables`
- **Missing Environment Variables**: `💡 Create a .env file with required values`
- **Large Datasets**: `💡 Use contextual_filtering to reduce data size for LLM processing`

## Integration with Development

### Development Workflow
Introspection fits into your workflow:

1. **Setup Phase**: Run introspection on new configurations
2. **Planning Phase**: Use report to plan processing operations
3. **Development Phase**: Reference structure information while building
4. **Testing Phase**: Re-run introspection to validate connections
5. **Documentation Phase**: Include introspection results in project docs

### AI Configuration Writing
Introspection enables effortless configuration creation:
- **Copy-paste to Claude Code**: "Create a ShedBoxAI config from this introspection report"
- **Use the AI Assistant Guide**: Download our [AI Assistant Guide](/AI_ASSISTANT_GUIDE.txt) for comprehensive LLM instructions and configuration examples
- **Intelligent operation suggestions**: Based on detected data patterns and relationships
- **Error prevention**: Warns about common pitfalls before they happen
- **Optimization recommendations**: Suggests performance improvements and best practices

## Best Practices

### When to Use
- Run introspection when setting up new configurations
- Use before building complex processing pipelines
- Include in development workflow for validation
- Generate documentation for team sharing

### Documentation Management
- Save introspection results with your project
- Update when data sources change
- Share reports with team members
- Include in project documentation

### Security Considerations
- Use appropriate credentials for data access
- Be careful with sample data in sensitive environments
- Review generated reports for sensitive information
- Follow your organization's data policies

## Next Steps

- [Command Reference](../cli-reference/introspect-command.md) - Complete command options
- [Analyzers](./analyzers.md) - Understanding different analyzer types
- [Documentation Generation](./documentation-generation.md) - Customizing output
- [Getting Started](../getting-started/first-pipeline.md) - Building your first pipeline