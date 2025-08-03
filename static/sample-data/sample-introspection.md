# Data Source Analysis Report

## Source: customers.csv
- **Type**: CSV
- **Records**: 10 rows
- **Schema**:
  - customer_id: integer (unique identifier, range: 1001-1010)
  - name: string (full names, format: "First Last")
  - email: string (email addresses, format: name@email.com)
  - total_spent: decimal (monetary values, range: $95.50 - $5,620.00)
  - last_purchase_date: date (2024-02-15 to 2024-07-05)
  - status: categorical (active, premium, inactive)

## Source: orders.json
- **Type**: JSON Array
- **Records**: 8 rows
- **Schema**:
  - order_id: string (format: ORD-YYYY-NNN)
  - customer_id: integer (foreign key to customers, range: 1001-1010)
  - amount: decimal (monetary values, range: $45.00 - $1,200.00)
  - date: date (2024-05-20 to 2024-07-05)
  - category: categorical (electronics, fashion, books, home)
  - product: string (product names)

## Detected Relationships
- **customers.customer_id** ↔ **orders.customer_id** (one-to-many)
- **Relationship strength**: Strong (100% referential integrity)
- **Coverage**: 6 out of 10 customers have orders

## Data Quality Assessment
- **Missing values**: None detected
- **Duplicates**: None detected
- **Referential integrity**: Perfect (all order customer_ids exist in customers)
- **Date consistency**: All dates within reasonable range

## Recommended Operations
1. **Contextual filtering** on customer status or spending thresholds
2. **Relationship highlighting** to join customer and order data
3. **Format conversion** for customer segmentation based on total_spent
4. **Aggregation** to calculate customer lifetime value and purchase frequency
5. **AI analysis** for customer behavior insights and segmentation strategies

## Business Intelligence Opportunities
- **Customer Segmentation**: VIP (>$5000), Premium ($1000-$5000), Standard (<$1000)
- **Purchase Pattern Analysis**: Category preferences by customer tier
- **Retention Analysis**: Identify inactive customers for re-engagement
- **Cross-sell Opportunities**: Product recommendations based on purchase history
- **Revenue Optimization**: Focus on high-value customer retention