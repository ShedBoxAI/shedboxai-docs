---
title: "Data Cleaning with ShedBox Agent - AI-Powered Data Quality"
description: "Clean and standardize data using natural language. Fix missing values, duplicates, formats, and outliers automatically."
keywords: [data cleaning, data quality, clean data ai, data standardization, fix data]
---

# Data Cleaning with ShedBox Agent

Clean messy data using natural language—no manual spreadsheet work required.

## Describe the Problem

```
You: "This data has a lot of issues. Clean it up."

ShedBox Agent:
✓ Analyzing data quality...

Issues Found:
1. Missing Values: 234 rows with empty email (5.2%)
2. Duplicates: 45 duplicate records by customer_id
3. Format Issues: Mixed date formats (MM/DD/YYYY and YYYY-MM-DD)
4. Outliers: 12 records with negative amounts
5. Inconsistent: State names (CA, California, calif.)

Would you like me to:
1. Fix all issues with recommended settings
2. Address each issue one by one
3. Show me samples of problematic data
```

## Common Cleaning Operations

### Handle Missing Values

```
"Fill missing values in the status column with 'Unknown'"
"Remove rows where email is empty"
"Replace null amounts with the column average"
```

### Remove Duplicates

```
"Remove duplicate rows"
"Keep only the most recent record for each customer"
"Find and show me potential duplicates by name and email"
```

### Standardize Formats

```
"Convert all dates to YYYY-MM-DD format"
"Standardize phone numbers to (XXX) XXX-XXXX"
"Fix inconsistent state abbreviations"
```

### Fix Data Types

```
"Convert the amount column to numbers"
"Parse the date strings into proper dates"
"Convert yes/no to true/false"
```

### Handle Outliers

```
"Flag records with amounts more than 3 standard deviations from mean"
"Cap values at the 99th percentile"
"Remove obvious data entry errors"
```

## Example Workflow

```
You: [Uploads messy_customers.csv]
You: "Analyze data quality and fix issues"

ShedBox Agent:
✓ Loaded 10,234 rows

📊 Data Quality Report:

| Issue | Count | % of Data | Severity |
|-------|-------|-----------|----------|
| Missing email | 512 | 5.0% | High |
| Invalid email | 89 | 0.9% | Medium |
| Duplicate records | 156 | 1.5% | High |
| Mixed date formats | 2,340 | 22.9% | Medium |
| Inconsistent states | 890 | 8.7% | Low |

Recommended Fixes:
1. Remove 512 rows with missing email (required field)
2. Remove 156 duplicate records (keep first)
3. Standardize dates to YYYY-MM-DD
4. Map state names to 2-letter codes
5. Validate and flag invalid emails

Proceed with recommended fixes?

You: "Yes, but keep the rows with missing email, just flag them"

ShedBox Agent:
✓ Added 'email_missing' flag column
✓ Removed 156 duplicates
✓ Standardized 2,340 date values
✓ Normalized 890 state values
✓ Flagged 89 invalid emails

Cleaned data summary:
- Original rows: 10,234
- Final rows: 10,078
- Rows removed: 156 (duplicates only)
- Fields modified: 3,230

Export cleaned data?
```

## Generated Pipeline

Cleaning operations become reusable:

```yaml
data_sources:
  raw_data:
    type: csv
    path: messy_customers.csv

processing:
  # Add flag for missing emails
  transform:
    - operation: add_field
      name: email_missing
      value: "email IS NULL"

  # Remove duplicates
  deduplicate:
    key: customer_id
    keep: first

  # Standardize dates
  transform:
    - operation: parse_date
      field: signup_date
      formats: ["MM/DD/YYYY", "YYYY-MM-DD", "DD-MM-YYYY"]
      output_format: "YYYY-MM-DD"

  # Normalize states
  transform:
    - operation: map_values
      field: state
      mapping:
        California: CA
        calif: CA
        New York: NY
        # ... more mappings

  # Validate emails
  validate:
    - field: email
      rule: email_format
      action: flag

output:
  type: file
  path: cleaned_customers.csv
```

## Validation Rules

ShedBox Agent supports common validations:

| Type | Rule | Example |
|------|------|---------|
| Email | Format check | `user@domain.com` |
| Phone | Pattern match | `(555) 123-4567` |
| URL | Valid URL | `https://example.com` |
| Date | Date format | `2024-01-15` |
| Number | Numeric check | `123.45` |
| Range | Min/max | `0 < value < 1000` |
| Enum | Allowed values | `status IN (active, inactive)` |

## Get Started

Clean your messy data with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [CSV Analysis Capability](/explore/agent/capabilities/csv-analysis)
- [Data Transformation Capability](/explore/agent/capabilities/data-transformation)
- [ETL Automation Use Case](/explore/shedboxai/use-cases/etl-automation)
