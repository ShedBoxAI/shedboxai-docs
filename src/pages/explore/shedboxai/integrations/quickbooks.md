---
title: "Connect QuickBooks with ShedBoxAI - Financial Data Pipeline"
description: "Integrate QuickBooks with ShedBoxAI. Export invoices, expenses, and financial reports for automated analysis."
keywords: [shedboxai quickbooks, quickbooks integration, accounting data, financial pipeline, quickbooks api]
---

# Connect QuickBooks with ShedBoxAI

Pull financial data from QuickBooks and build accounting analytics pipelines.

## Quick Start

```yaml
data_sources:
  invoices:
    type: rest
    url: "https://quickbooks.api.intuit.com/v3/company/${COMPANY_ID}/query"
    headers:
      Authorization: "Bearer ${QUICKBOOKS_TOKEN}"
      Accept: "application/json"
    options:
      params:
        query: "SELECT * FROM Invoice"
    response_path: "QueryResponse.Invoice"

output:
  type: file
  path: "invoices.json"
  format: json
```

## Authentication

QuickBooks uses OAuth 2.0:

```bash
export QUICKBOOKS_TOKEN="your-oauth-token"
export COMPANY_ID="your-company-id"
```

## Common Pipelines

### Invoice Summary

```yaml
data_sources:
  invoices:
    type: rest
    url: "https://quickbooks.api.intuit.com/v3/company/${COMPANY_ID}/query"
    headers:
      Authorization: "Bearer ${QUICKBOOKS_TOKEN}"
    options:
      params:
        query: "SELECT * FROM Invoice"
    response_path: "QueryResponse.Invoice"

processing:
  content_summarization:
    invoices:
      method: "statistical"
      fields: ["TotalAmt", "Balance"]
      summarize: ["sum", "count", "mean", "min", "max"]

output:
  type: file
  path: "invoice_summary.json"
  format: json
```

### Expense Analysis

```yaml
data_sources:
  expenses:
    type: rest
    url: "https://quickbooks.api.intuit.com/v3/company/${COMPANY_ID}/query"
    headers:
      Authorization: "Bearer ${QUICKBOOKS_TOKEN}"
    options:
      params:
        query: "SELECT * FROM Purchase"
    response_path: "QueryResponse.Purchase"

processing:
  advanced_operations:
    expenses_by_account:
      source: "expenses"
      group_by: "AccountRef.name"
      aggregate:
        total_spent: "SUM(TotalAmt)"
        transaction_count: "COUNT(*)"
      sort: "-total_spent"
      limit: 10

output:
  type: file
  path: "expense_analysis.json"
  format: json
```

### Financial Insights with AI

```yaml
data_sources:
  invoices:
    type: rest
    url: "https://quickbooks.api.intuit.com/v3/company/${COMPANY_ID}/query"
    headers:
      Authorization: "Bearer ${QUICKBOOKS_TOKEN}"
    options:
      params:
        query: "SELECT * FROM Invoice MAXRESULTS 50"
    response_path: "QueryResponse.Invoice"

ai_interface:
  model:
    type: rest
    url: "https://api.anthropic.com/v1/messages"
    method: POST
    headers:
      x-api-key: "${ANTHROPIC_API_KEY}"
      Content-Type: "application/json"
    options:
      model: "claude-sonnet-4-20250514"

  prompts:
    analyze:
      system: "You are a financial analyst."
      user_template: |
        Analyze these invoices and provide financial insights:

        {% for inv in invoices %}
        - Invoice {{ inv.DocNumber }}: ${{ inv.TotalAmt }} (Balance: ${{ inv.Balance }})
        {% endfor %}

        Identify cash flow patterns and recommendations.

output:
  type: file
  path: "financial_insights.md"
  format: json
```

## Related

- [Fintech Use Case](/explore/shedboxai/use-cases/fintech)
- [Stripe Integration](/explore/shedboxai/integrations/stripe)
