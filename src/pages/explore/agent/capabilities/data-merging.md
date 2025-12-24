---
title: "Data Merging with ShedBox Agent - Combine Multiple Data Sources"
description: "Merge data from multiple sources using natural language. Join databases, APIs, and files without SQL."
keywords: [data merging, combine data, join data sources, data integration, merge datasets]
---

# Data Merging with ShedBox Agent

Combine data from multiple sources using natural language—no SQL required.

## Describe What to Merge

```
You: "Merge my customer list with Stripe payment data"

ShedBox Agent:
✓ Loaded customers.csv (2,456 rows)
✓ Connected to Stripe API (3,892 transactions)

Detected matching field: email
- Matched: 2,312 customers (94%)
- Unmatched customers: 144
- Unmatched transactions: 1,580

Merge preview:
| customer_id | name | email | stripe_customer_id | total_payments |
|-------------|------|-------|-------------------|----------------|
| C001 | Alice Smith | alice@... | cus_abc123 | $2,450 |
| C002 | Bob Jones | bob@... | cus_def456 | $890 |

Proceed with merge?
```

## Merge Types

### Inner Join

Only records that match in both sources:

```
"Merge customers with orders, only include customers who have orders"
```

### Left Join

All records from first source, matching from second:

```
"Merge all customers with their orders, include customers without orders"
```

### Full Outer Join

All records from both sources:

```
"Combine both lists and show all records, matched or not"
```

### Union

Stack datasets vertically:

```
"Combine these three CSV files into one"
```

## Matching Strategies

### Exact Match

```
"Join on customer_id"
"Match where email addresses are the same"
```

### Fuzzy Match

```
"Match company names even if spelled slightly differently"
"Join on name, allowing for small variations"
```

### Multiple Keys

```
"Match on both email AND phone number"
"Join where either email or customer_id matches"
```

## Example Workflow

```
You: "I need to combine data from three sources to get a complete customer view"

ShedBox Agent:
What sources do you want to combine?

You: "Salesforce contacts, Stripe customers, and our PostgreSQL users table"

ShedBox Agent:
✓ Connected to Salesforce (5,234 contacts)
✓ Connected to Stripe (4,892 customers)
✓ Connected to PostgreSQL users (6,123 records)

Schema Analysis:

| Source | Key Fields | Unique Records |
|--------|------------|----------------|
| Salesforce | Email, Id | 5,234 |
| Stripe | email, id | 4,892 |
| PostgreSQL | email, user_id | 6,123 |

Recommended merge strategy:
1. Primary key: email (exists in all sources)
2. Join type: Full outer (capture all records)
3. Conflict resolution: Latest timestamp wins

Preview merge?

You: "Yes"

ShedBox Agent:
✓ Merging datasets...

Merge Results:
- Total unique records: 7,456
- Matched across all 3: 3,892 (52%)
- Matched in 2 sources: 1,234 (17%)
- Unique to Salesforce: 1,108
- Unique to Stripe: 421
- Unique to PostgreSQL: 801

Sample merged record:
{
  email: "alice@company.com",
  salesforce_id: "003abc123",
  stripe_id: "cus_xyz789",
  user_id: 12345,
  name: "Alice Smith",           // from Salesforce
  plan: "Enterprise",            // from Stripe
  signup_date: "2023-06-15",     // from PostgreSQL
  lifetime_value: 24500,         // from Stripe
  last_activity: "2024-01-10"    // from PostgreSQL
}

You: "Great, save this as our master customer list"

ShedBox Agent:
✓ Saved to master_customers.json
✓ Created reusable pipeline: customer_360_merge.yaml
```

## Generated Pipeline

Merge logic becomes reusable:

```yaml
data_sources:
  salesforce:
    type: rest_api
    url: https://your-instance.salesforce.com/services/data/v57.0/query
    auth:
      type: oauth2
    params:
      q: "SELECT Id, Email, Name, Company FROM Contact"

  stripe:
    type: rest_api
    url: https://api.stripe.com/v1/customers
    auth:
      type: bearer
      token_env: STRIPE_KEY
    pagination:
      type: cursor
      param: starting_after

  users:
    type: postgresql
    connection_env: DATABASE_URL
    query: "SELECT user_id, email, signup_date, last_activity FROM users"

processing:
  join:
    - sources: [salesforce, stripe]
      left_key: Email
      right_key: email
      type: full_outer
      prefix: [sf_, stripe_]

    - sources: [_result, users]
      left_key: COALESCE(sf_Email, stripe_email)
      right_key: email
      type: full_outer
      prefix: [_, db_]

  transform:
    - operation: coalesce
      fields: [sf_Email, stripe_email, db_email]
      output: email

    - operation: add_field
      name: source_count
      expression: |
        (CASE WHEN sf_Id IS NOT NULL THEN 1 ELSE 0 END) +
        (CASE WHEN stripe_id IS NOT NULL THEN 1 ELSE 0 END) +
        (CASE WHEN db_user_id IS NOT NULL THEN 1 ELSE 0 END)

output:
  type: file
  path: master_customers.json
```

## Handling Conflicts

When the same field exists in multiple sources:

```
"Use the most recent value when there's a conflict"
"Prefer Salesforce data over Stripe for contact info"
"Flag records where sources disagree"
```

## Get Started

Combine your data sources with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [API Integration](/explore/agent/capabilities/api-integration)
- [Data Transformation](/explore/agent/capabilities/data-transformation)
- [CSV Analysis](/explore/agent/capabilities/csv-analysis)
