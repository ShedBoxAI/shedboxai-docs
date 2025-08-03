# Data Analyzers

ShedBoxAI's introspection system includes sophisticated analyzers specifically designed to generate LLM-optimized documentation. Each analyzer performs deep analysis to help AI assistants like Claude Code write perfect configurations.

## Overview

ShedBoxAI includes advanced analyzers for:
- **CSV files** - Statistical profiling, pattern recognition, and categorical analysis
- **JSON data** - Nested structure mapping, schema generation, and consistency validation
- **YAML files** - Configuration validation and structure analysis
- **REST APIs** - Response analysis, authentication testing, and schema detection
- **Text files** - Content structure analysis and encoding detection

## CSV Analyzer

Performs comprehensive statistical analysis of CSV files with advanced pattern recognition and LLM optimization.

### Analysis Capabilities
- **Advanced Type Detection**: Distinguishes integers, floats, dates, emails, phone numbers, UUIDs, structured IDs
- **Statistical Profiling**: Full descriptive statistics including quartiles, standard deviation, distributions
- **Pattern Recognition**: Automatically detects email patterns, phone patterns, ID patterns, UUID formats
- **Categorical Analysis**: Identifies categorical columns with value frequency distributions
- **Identifier Detection**: Recognizes primary key candidates and foreign key patterns
- **LLM Optimization**: Token estimation, context window warnings, processing recommendations
- **Stratified Sampling**: Intelligent sampling for representative data examples

### Example Analysis Output
```markdown
## CSV Analysis: customers.csv

### Statistical Summary
- **Records**: 1,250 customers
- **Memory Usage**: 2.3 MB
- **Token Estimate**: ~45,000 tokens
- **Delimiter**: comma (auto-detected)
- **Encoding**: UTF-8

### Schema Analysis
- **customer_id**: integer (unique identifier, range: 1001-5250, primary key candidate)
- **name**: string (avg length: 12.4 chars, pattern: "First Last")
- **email**: string (email pattern, 98.2% valid format, unique count: 1,227)
- **total_spent**: float (currency, range: $0.00-$15,000.00, quartiles: [250, 850, 2100, 15000])
- **status**: categorical (active: 75%, premium: 15%, inactive: 10%)
- **signup_date**: date (range: 2020-01-15 to 2024-07-20)

### LLM Recommendations
- Key columns detected (customer_id) - suitable for relationship operations
- Numeric columns available (total_spent) - suitable for statistical operations  
- Categorical columns available (status) - suitable for grouping operations
- Email validation recommended for data quality
```

## JSON Analyzer

Performs deep structural analysis of JSON data with nested schema generation and relationship detection.

### Analysis Capabilities
- **Schema Generation**: Creates comprehensive JSON schemas with type inference
- **Nested Structure Mapping**: Analyzes complex nested objects and arrays
- **Consistency Validation**: Checks schema consistency across array elements
- **Relationship Detection**: Identifies potential foreign key relationships
- **Array Analysis**: Detailed analysis of array patterns and element types
- **Field Frequency Analysis**: Tracks optional vs required fields across objects

### Example Analysis Output
```markdown
## JSON Analysis: orders.json

### Structure Summary
- **Format**: JSON array of objects
- **Object Count**: 500 orders
- **Schema Consistency**: 95% (minor variations in optional fields)
- **Nesting Depth**: 3 levels maximum
- **Token Estimate**: ~75,000 tokens

### Generated Schema
- **order_id**: string (required, 100% present, pattern: "ORD-YYYY-NNNN", structured_id)
- **customer_id**: integer (required, foreign key candidate, range: 1001-5250)
- **amount**: float (required, currency format, range: $10.00-$5,000.00)
- **items**: array (optional, 85% present, 1-15 items per order, avg: 3.2)
  - **product_id**: string (required, structured_id pattern)
  - **quantity**: integer (range: 1-50)
  - **price**: float (currency format)
- **shipping_address**: object (optional, 85% present)
  - **street**, **city**, **zip**: strings

### Detected Relationships
- orders.customer_id → customers.customer_id (foreign key, 500/500 matches)
- orders.items.product_id → products.product_id (likely reference)

### LLM Recommendations
- Array structure suitable for format_conversion with extract_fields
- Nested items array ideal for advanced_operations aggregation
- customer_id enables relationship_highlighting with customers data
```

## YAML Analyzer

Validates YAML configuration structure and provides syntax analysis.

### Analysis Capabilities
- **Syntax Validation**: Ensures valid YAML format and structure
- **Schema Validation**: Validates against ShedBoxAI configuration schema
- **Section Analysis**: Identifies and validates configuration sections
- **Key Enumeration**: Lists all configuration keys and their types
- **Best Practice Warnings**: Identifies deprecated options and suggests improvements

### Example Analysis Output
```markdown
## YAML Analysis: config.yaml

### Configuration Validation
- **YAML Syntax**: Valid ✓
- **ShedBoxAI Schema**: Valid configuration ✓
- **Required Sections**: data_sources ✓, output ✓
- **File Size**: 2.1 KB

### Configuration Structure
- **data_sources**: 3 sources configured
  - customers: CSV file
  - orders: REST API with authentication
  - products: JSON file
- **processing**: 4 operations configured
  - contextual_filtering, format_conversion, advanced_operations, template_matching
- **output**: JSON format to results.json

### Validation Results
- No syntax errors detected
- All required fields present
- Best practice: Configuration follows recommended structure
```

## REST API Analyzer

Performs comprehensive API response analysis with authentication testing and schema detection.

### Analysis Capabilities
- **Response Schema Analysis**: Full JSON schema generation from API responses
- **Authentication Testing**: Validates headers, tokens, and authentication flows
- **Pagination Detection**: Identifies pagination patterns and metadata
- **Error Response Analysis**: Tests error conditions and response formats
- **Rate Limiting Detection**: Identifies rate limits and throttling patterns
- **Data Structure Analysis**: Same deep analysis as JSON analyzer for response data

### Example Analysis Output
```markdown
## REST API Analysis: https://api.example.com/v1/users

### Connection Analysis
- **URL**: https://api.example.com/v1/users
- **Status**: ✅ Connected (200 OK)
- **Authentication**: Bearer token required ✓
- **Response Time**: 245ms
- **Rate Limit**: 1000 requests/hour detected
- **Content Type**: application/json

### Response Schema
- **Root Structure**: Object with data array and metadata
- **data**: array of user objects (20 users per page)
  - **id**: integer (unique identifier, sequential)
  - **username**: string (alphanumeric, 3-20 chars, unique)
  - **email**: string (email pattern, 100% valid)
  - **created_at**: string (ISO 8601 timestamp)
  - **profile**: object (optional, 60% present)
- **pagination**: object (page info)
  - **page**, **per_page**, **total**: integers
- **meta**: object (response metadata)

### LLM Recommendations
- Pagination detected - configure page size for large datasets
- User ID suitable for relationship operations
- Consider caching responses for performance
- Authentication headers properly configured
```

## Text Analyzer

Analyzes text files for content structure and encoding.

### Analysis Capabilities
- **Content Structure Detection**: Identifies markdown, plain text, or structured formats
- **Encoding Analysis**: Detects character encoding and validates readability
- **Size Analysis**: File size, line count, and character statistics
- **Sample Extraction**: Provides content samples for LLM processing

### Example Analysis Output
```markdown
## Text Analysis: documentation.md

### Content Summary
- **File Size**: 45.2 KB
- **Line Count**: 1,247 lines
- **Encoding**: UTF-8 ✓
- **Format**: Markdown document

### Content Structure
- **Headers**: 15 sections detected
- **Code Blocks**: 23 code samples
- **Lists**: 45 bulleted/numbered lists
- **Content Type**: Technical documentation

### Sample Content
```
# ShedBoxAI Configuration Guide

## Data Sources
Configure your data sources using YAML...
```

### LLM Recommendations
- Text content suitable for template_matching operations
- Structured format ideal for content_summarization
- Consider extracting code blocks for separate processing
```

## LLM Integration Features

All analyzers include specialized features for AI configuration generation:

### Token Estimation
- **Context Window Planning**: Calculates approximate token usage for LLM processing
- **Size Warnings**: Alerts when datasets may exceed context limits
- **Sampling Recommendations**: Suggests optimal sample sizes for analysis

### Processing Recommendations
- **Operation Suggestions**: Recommends specific ShedBoxAI operations based on data patterns
- **Performance Optimization**: Suggests filtering and aggregation strategies
- **Relationship Guidance**: Identifies potential joins and connections between sources
- **Error Prevention**: Warns about common configuration pitfalls

### Configuration Assistance
- **Ready-to-Use Examples**: Provides sample YAML configurations
- **Field Mapping**: Suggests field names and extraction patterns
- **Operation Sequencing**: Recommends optimal operation ordering for pipelines

## Using Introspection with Claude Code

The introspection output is specifically designed for AI configuration generation:

### Step 1: Run Introspection
```bash
shedboxai introspect config.yaml --include-samples -o analysis.md
```

### Step 2: Copy to Claude Code
Paste the entire `analysis.md` content to Claude Code with a prompt like:

```
"Based on this data introspection report, create a ShedBoxAI configuration that:
- Filters active customers with high lifetime value
- Aggregates sales by region and product category  
- Generates a summary report with top performers
- Exports results to JSON format"
```

### Step 3: AI Configuration Generation
Claude Code will use the detailed schema information, sample data, and LLM recommendations to generate a perfect configuration that handles:
- Correct field names and types
- Optimal operation sequencing
- Proper filtering conditions
- Appropriate aggregation strategies
- Error-free YAML syntax

## Best Practices

### Getting Maximum Value
- **Include Sample Data**: Use `--include-samples` for better AI configuration generation
- **Large Datasets**: Let introspection warn about context window limits
- **Multiple Sources**: Analyzers automatically detect relationships between sources
- **API Sources**: Ensure authentication is configured for complete analysis

### Working with AI Assistants
- **Complete Reports**: Paste the full introspection report to Claude Code for best results
- **Specific Requests**: Be clear about what you want your configuration to accomplish
- **Iterative Refinement**: Use introspection insights to refine and optimize configurations
- **Error Prevention**: Trust the LLM recommendations to avoid common pitfalls

## Next Steps

- [Introspection Overview](./overview.md) - Getting started with introspection
- [Command Reference](../cli-reference/introspect-command.md) - Complete command options
- [Configuration Guide](../configuration/data-sources.md) - Data source setup