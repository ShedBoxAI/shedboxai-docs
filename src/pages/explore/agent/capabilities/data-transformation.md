---
title: "Data Transformation with ShedBox Agent - Reshape Your Data"
description: "Transform data structures using natural language. Pivot, reshape, calculate, and derive new fields without code."
keywords: [data transformation, reshape data, pivot data, data manipulation, transform data ai]
---

# Data Transformation with ShedBox Agent

Reshape and transform your data using natural language.

## Describe the Transformation

```
You: "Convert this wide format to long format"

ShedBox Agent:
Current format (wide):
| id | jan_sales | feb_sales | mar_sales |
|----|-----------|-----------|-----------|
| 1  | 100       | 150       | 120       |

Transformed (long):
| id | month | sales |
|----|-------|-------|
| 1  | jan   | 100   |
| 1  | feb   | 150   |
| 1  | mar   | 120   |

Would you like to apply this transformation?
```

## Common Transformations

### Pivot / Unpivot

```
"Pivot this data so each region becomes a column"
"Unpivot the monthly columns into a single column"
```

### Add Calculated Fields

```
"Add a profit margin column (revenue - cost) / revenue"
"Calculate year-over-year growth"
"Add a customer segment based on total spend"
```

### Reshape Structure

```
"Flatten the nested JSON"
"Expand the tags array into separate rows"
"Combine first_name and last_name into full_name"
```

### Type Conversions

```
"Convert the date strings to proper dates"
"Parse the currency strings into numbers"
"Convert boolean strings to true/false"
```

### Aggregations

```
"Group by category and calculate totals"
"Create a running total column"
"Add week number from the date"
```

## Example Workflow

```
You: "I need to prepare this data for analysis"

ShedBox Agent:
✓ Loaded sales_data.csv (5,000 rows)

Current Schema:
- order_id (string)
- customer_name (string)
- order_date (string - mixed formats)
- amount (string - has $ and commas)
- product_category (string)
- region (string)

What transformations do you need?

You: "Clean up the data types and add some useful columns"

ShedBox Agent:
Suggested transformations:
1. Parse order_date to date type
2. Convert amount to numeric (remove $ and commas)
3. Add order_month from order_date
4. Add order_year from order_date
5. Add quarter from order_date

Apply all?

You: "Yes, and also add a customer_segment based on total spend"

ShedBox Agent:
✓ Applied 5 standard transformations
✓ Calculated total spend per customer
✓ Added customer_segment:
  - High Value: > $5,000
  - Medium Value: $1,000 - $5,000
  - Low Value: < $1,000

Result preview:
| order_id | amount | order_month | customer_segment |
|----------|--------|-------------|------------------|
| ORD-001  | 250.00 | 2024-01     | Medium Value     |
| ORD-002  | 1500.00| 2024-01     | High Value       |

Export transformed data?
```

## Generated Pipeline

Transformations become reusable:

```yaml
data_sources:
  raw_data:
    type: csv
    path: sales_data.csv

processing:
  transform:
    # Parse dates
    - operation: parse_date
      field: order_date
      formats: ["MM/DD/YYYY", "YYYY-MM-DD"]

    # Clean currency
    - operation: parse_number
      field: amount
      remove: ["$", ","]

    # Add derived fields
    - operation: add_field
      name: order_month
      expression: "DATE_TRUNC('month', order_date)"

    - operation: add_field
      name: order_year
      expression: "YEAR(order_date)"

    - operation: add_field
      name: quarter
      expression: "QUARTER(order_date)"

  # Calculate customer segments
  window:
    partition_by: customer_name
    compute:
      - name: customer_total_spend
        function: SUM(amount)

  transform:
    - operation: add_field
      name: customer_segment
      expression: |
        CASE
          WHEN customer_total_spend > 5000 THEN 'High Value'
          WHEN customer_total_spend > 1000 THEN 'Medium Value'
          ELSE 'Low Value'
        END

output:
  type: file
  path: transformed_sales.csv
```

## Transformation Functions

| Category | Functions |
|----------|-----------|
| String | `UPPER`, `LOWER`, `TRIM`, `CONCAT`, `SPLIT`, `REPLACE` |
| Numeric | `ROUND`, `ABS`, `FLOOR`, `CEILING`, `MOD` |
| Date | `DATE_TRUNC`, `DATE_ADD`, `DATE_DIFF`, `YEAR`, `MONTH`, `DAY` |
| Logic | `CASE WHEN`, `COALESCE`, `NULLIF`, `IF` |
| Aggregate | `SUM`, `COUNT`, `AVG`, `MIN`, `MAX` |
| Window | `ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, `RUNNING_SUM` |

## Complex Transformations

### Window Functions

```
"Add a running total of sales by customer"
"Rank products by sales within each category"
"Calculate month-over-month change"
```

### Conditional Logic

```
"Create a risk_level column based on multiple conditions"
"Flag records that meet these criteria..."
```

### Lookups

```
"Add product names from this lookup table"
"Enrich with customer data from CRM"
```

## Get Started

Transform your data with natural language.

[Try ShedBox Agent →](/docs/getting-started/quick-start)

## Related

- [Data Cleaning Capability](/explore/agent/capabilities/data-cleaning)
- [Data Merging Capability](/explore/agent/capabilities/data-merging)
- [ETL Automation](/explore/shedboxai/use-cases/etl-automation)
