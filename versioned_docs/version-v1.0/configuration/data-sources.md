# Data Sources

ShedBoxAI supports multiple data source types with advanced authentication and configuration options. Connect to local files, REST APIs, and inline data with comprehensive error handling and retry logic.

## Overview

Data sources are the foundation of your pipeline. ShedBoxAI supports:

- **Local Files**: CSV, JSON, YAML, Text
- **REST APIs**: Full HTTP support with authentication
- **Inline Data**: Embed data directly in configuration
- **Advanced Features**: Authentication flows, response processing, error handling

## Local File Sources

### CSV Files

Connect to CSV files with advanced parsing options:

```yaml
data_sources:
  sales_data:
    type: csv
    path: data/sales.csv
    options:
      encoding: utf-8
      delimiter: "|"
      skiprows: 1
      dtype:
        amount: "float64"
        date: "datetime64"
```

**CSV Options:**
- `encoding`: Character encoding (utf-8, latin-1, cp1252)
- `delimiter`: Field separator (comma, pipe, tab)
- `skiprows`: Skip header rows
- `dtype`: Column data types

### JSON Files

Load structured JSON data:

```yaml
data_sources:
  config_data:
    type: json
    path: data/config.json
```

### YAML Files

Parse YAML configuration files:

```yaml
data_sources:
  application_config:
    type: yaml
    path: config/app.yaml
```

### Text Files

Load raw text with automatic encoding detection:

```yaml
data_sources:
  log_files:
    type: text
    path: logs/application.log
    options:
      encoding: utf-8  # Auto-fallback to latin-1, cp1252, iso-8859-1
```

## Inline Data Sources

Embed data directly in your configuration:

```yaml
data_sources:
  # CSV-style inline data
  sample_users:
    type: csv
    data:
      - name: "John Doe"
        age: 30
        department: "Engineering"
      - name: "Jane Smith"
        age: 28
        department: "Marketing"
  
  # JSON inline data
  api_config:
    type: json
    data:
      endpoints:
        - name: "users"
          url: "https://api.example.com/users"
      settings:
        timeout: 30
        retries: 3
  
  # Text inline data
  system_info:
    type: text
    data: |
      System Status: Operational
      Last Updated: 2024-01-15
      Active Services: 12
```

## REST API Sources

### Basic API Integration

Connect to REST APIs with full HTTP support:

```yaml
data_sources:
  weather_api:
    type: rest
    url: https://api.weatherapi.com/v1/current.json
    method: GET
    headers:
      Authorization: Bearer ${WEATHER_API_KEY}
      User-Agent: ShedBoxAI/1.0
    options:
      params:
        q: "London"
        aqi: "yes"
      timeout: 30
```

### Advanced API Configuration

Handle complex API interactions:

```yaml
data_sources:
  complex_api:
    type: rest
    url: https://api.example.com/v2/analytics
    method: POST
    headers:
      Content-Type: application/json
      Authorization: Bearer ${API_TOKEN}
    options:
      json:
        filters:
          date_range: "30d"
          metrics: ["revenue", "users", "conversion"]
        format: "detailed"
    response_path: "data.results.metrics"  # Extract nested data
```

### Response Path Extraction

Extract specific data from API responses:

```yaml
data_sources:
  # Extract deeply nested data
  user_profiles:
    type: rest
    url: https://api.example.com/users
    response_path: "data.users.*.profile"  # All user profiles
  
  # Multiple extractions
  api_metrics:
    type: rest
    url: https://api.example.com/metrics
    response_path: "dashboard.widgets.chart_data"  # Specific data only
```

## Authentication

### Environment Variable Authentication

Secure credential management:

```yaml
data_sources:
  secure_api:
    type: rest
    url: https://api.example.com/secure-data
    headers:
      Authorization: Bearer ${API_TOKEN}
      X-API-Key: ${SECONDARY_KEY}
```

**Environment Setup:**
```bash
# .env file
API_TOKEN=your_token_here
SECONDARY_KEY=your_secondary_key
WEATHER_API_KEY=your_weather_key
```

### Multi-Stage Token Flow

Enterprise authentication with automatic token management:

```yaml
data_sources:
  # Step 1: Obtain authentication token
  auth_service:
    type: rest
    url: https://auth.example.com/oauth/token
    method: POST
    headers:
      Content-Type: application/json
    options:
      json:
        grant_type: "client_credentials"
        client_id: ${OAUTH_CLIENT_ID}
        client_secret: ${OAUTH_CLIENT_SECRET}
        scope: "read:data write:data"
    is_token_source: true
    token_for: ["protected_api", "analytics_api"]
  
  # Step 2: Use token for protected resources
  protected_api:
    type: rest
    url: https://api.example.com/protected/users
    requires_token: true
    token_source: "auth_service"
    headers:
      Content-Type: application/json
  
  # Step 3: Another endpoint using same token
  analytics_api:
    type: rest
    url: https://api.example.com/analytics/reports
    requires_token: true
    token_source: "auth_service"
    method: POST
    options:
      json:
        report_type: "monthly"
        format: "json"
```

### Basic Authentication

Legacy systems support:

```yaml
data_sources:
  legacy_api:
    type: rest
    url: https://legacy.example.com/api/data
    options:
      auth: ["${API_USERNAME}", "${API_PASSWORD}"]
```

### Custom Authentication Headers

Flexible authentication methods:

```yaml
data_sources:
  custom_auth_api:
    type: rest
    url: https://api.example.com/data
    headers:
      X-Auth-Token: ${CUSTOM_TOKEN}
      X-User-ID: ${USER_ID}
      X-Signature: ${COMPUTED_SIGNATURE}
```

## Advanced Features

### Automatic Token Management

- **Token Caching**: Automatic reuse of valid tokens
- **Multi-Endpoint Sharing**: Share tokens across multiple APIs
- **Refresh Logic**: Automatic token renewal
- **Retry Handling**: Intelligent retry on auth failures

### Error Handling

- **Connection Retries**: Automatic retry with exponential backoff
- **Timeout Management**: Configurable timeouts per endpoint
- **Error Classification**: Detailed error reporting
- **Fallback Strategies**: Graceful degradation

### Response Processing

- **Path Extraction**: JSONPath-style data extraction
- **Format Detection**: Automatic content type handling
- **Encoding Detection**: Smart text encoding detection
- **Size Limits**: Configurable response size limits

## Configuration Examples

### Multi-Source Pipeline

```yaml
data_sources:
  # Local customer data
  customers:
    type: csv
    path: data/customers.csv
  
  # External API data
  weather:
    type: rest
    url: https://api.weatherapi.com/v1/current.json
    headers:
      Authorization: Bearer ${WEATHER_API_KEY}
    options:
      params:
        q: "New York"
  
  # Configuration data
  settings:
    type: yaml
    path: config/settings.yaml
  
  # Inline reference data
  categories:
    type: json
    data:
      - id: 1
        name: "Premium"
        discount: 0.15
      - id: 2
        name: "Standard" 
        discount: 0.05
```

### Enterprise API Integration

```yaml
data_sources:
  # OAuth authentication
  oauth_token:
    type: rest
    url: https://auth.enterprise.com/token
    method: POST
    options:
      json:
        grant_type: "client_credentials"
        client_id: ${ENTERPRISE_CLIENT_ID}
        client_secret: ${ENTERPRISE_CLIENT_SECRET}
    is_token_source: true
    token_for: ["crm_api", "analytics_api", "reporting_api"]
  
  # CRM data
  crm_api:
    type: rest
    url: https://api.enterprise.com/crm/customers
    requires_token: true
    token_source: "oauth_token"
    response_path: "data.customers"
  
  # Analytics data
  analytics_api:
    type: rest
    url: https://api.enterprise.com/analytics/metrics
    requires_token: true
    token_source: "oauth_token"
    method: POST
    options:
      json:
        metrics: ["revenue", "conversion", "retention"]
        period: "last_30_days"
    response_path: "results.data"
```

## Best Practices

### Security
- **Never hardcode credentials** in configuration files
- **Use environment variables** for all sensitive data
- **Rotate tokens regularly** in production environments
- **Monitor API usage** and rate limits

### Performance
- **Cache frequently accessed data** locally when possible
- **Use response_path** to extract only needed data
- **Set appropriate timeouts** for different API types
- **Implement retry logic** for critical data sources

### Reliability
- **Test all data sources** with introspection before production
- **Monitor API health** and response times
- **Have fallback strategies** for critical dependencies
- **Log all authentication flows** for debugging

## Next Steps

- [Operations](../operations/) - Process your connected data
- [Operations Reference](../operations/) - Operation-specific configuration
- [AI Interface](./ai-interface.md) - AI model integration
- [CLI Reference](../cli-reference/run-command.md) - Command-line tools