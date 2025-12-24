---
title: "API Integration with ShedBox Agent - Connect Any REST API"
description: "Connect to any REST API using natural language. ShedBox Agent handles authentication, pagination, and data extraction."
keywords: [api integration, rest api ai, connect api, api data extraction, natural language api]
---

# API Integration with ShedBox Agent

Connect to any REST API using natural language—ShedBox Agent handles the complexity.

## Just Describe Your API

```
You: "Connect to the Stripe API and show me recent charges"

ShedBox Agent:
What's your Stripe API key? (I'll store it securely)

You: [Provides API key]

ShedBox Agent:
✓ Connected to Stripe
✓ Authenticated successfully
✓ Pulled recent charges

Last 10 Charges:
1. $150.00 - customer_abc - succeeded - 2 hours ago
2. $299.00 - customer_def - succeeded - 3 hours ago
3. $49.00 - customer_ghi - succeeded - 5 hours ago
...

Total today: $4,250 across 47 transactions
```

## Supported Authentication Types

### Bearer Token

```
"Connect to the GitHub API with my personal access token"
```

### API Key

```
"Connect to the Mailchimp API using my API key"
```

### OAuth 2.0

```
"Connect to Salesforce with OAuth"
```

### Basic Auth

```
"Connect to our internal API with username and password"
```

## Automatic Pagination

ShedBox Agent handles pagination automatically:

```
You: "Get all users from our API"

ShedBox Agent:
✓ Detected cursor-based pagination
✓ Fetching page 1/12...
✓ Fetching page 2/12...
...
✓ Retrieved 2,847 total users

Summary:
- Active users: 2,456
- Inactive users: 391
- Admins: 45
```

## Example Integrations

### E-commerce

```
"Connect to Shopify and show me today's orders"
"Pull product inventory from our WooCommerce store"
"Get customer data from BigCommerce"
```

### CRM

```
"Connect to HubSpot and list all deals in the pipeline"
"Pull contact data from Salesforce"
"Get recent activities from Pipedrive"
```

### Marketing

```
"Connect to Google Analytics and show traffic this week"
"Pull campaign performance from Mailchimp"
"Get ad spend from the Facebook Ads API"
```

### Payments

```
"Connect to Stripe for subscription data"
"Pull transactions from PayPal"
"Get invoice data from Quickbooks"
```

## Generated Pipeline

Every API connection creates a reusable config:

```yaml
data_sources:
  stripe_charges:
    type: rest_api
    url: https://api.stripe.com/v1/charges
    auth:
      type: bearer
      token_env: STRIPE_SECRET_KEY
    params:
      limit: 100
      created[gte]: "${YESTERDAY}"
    pagination:
      type: cursor
      param: starting_after
      cursor_path: data[-1].id
      has_more_path: has_more

processing:
  filter:
    field: status
    condition: "== 'succeeded'"
  aggregate:
    group_by: currency
    metrics:
      - total_amount: sum(amount)
      - transaction_count: count

output:
  type: file
  path: daily_charges.json
```

## Handling Complex APIs

### Nested Endpoints

```
You: "Get all orders and their line items from Shopify"

ShedBox Agent:
✓ Fetching orders from /orders endpoint
✓ Expanding line_items for each order
✓ Flattening nested data

Total: 234 orders with 567 line items
```

### Rate Limiting

```
ShedBox Agent automatically:
✓ Respects rate limits
✓ Implements exponential backoff
✓ Optimizes request batching
```

### Error Handling

```
ShedBox Agent:
⚠️ Received 401 Unauthorized from API
The API key may be expired. Would you like to:
1. Provide a new API key
2. Check the authentication settings
```

## Combine Multiple APIs

Join data across APIs:

```
You: "Compare Stripe revenue with Salesforce closed deals"

ShedBox Agent:
✓ Connected to Stripe
✓ Connected to Salesforce
✓ Matching by customer email

Revenue Comparison (Last 30 days):
- Stripe Revenue: $87,500
- Salesforce Closed Won: $92,000
- Discrepancy: $4,500 (5.1%)

Unmatched transactions: 12
Would you like to investigate the discrepancies?
```

## Get Started

Connect your APIs with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [REST APIs Integration](/explore/shedboxai/integrations/rest-apis)
- [Data Merging Capability](/explore/agent/capabilities/data-merging)
- [ShedBox Agent for Developers](/explore/agent/personas/developers)
