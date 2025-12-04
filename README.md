# Personal Expense Tracking Tool (Local & Secure)
A privacy-first, local-only personal expense-tracking tool designed to work with strict Swiss bank CSV exports.
The goal is to provide automatic (and manual) categorization, visual reports, and eventually an interactive UI — **without using any bank APIs**.

## Project Goal
Most finance apps fail with Swiss banks due to strict security and incompatible APIs.
This project provides a **local, secure tool** for:
* Reading CSV statements (starting with ZKB)
* Categorizing expenses (auto + manual)
* Generating static or interactive reports
* Allowing long-term extensibility with zero online dependencies

## Current Strategy
### Phase 1 — Static Report Generator (MVP)
A local Python script that:
1. Reads a CSV file (or multiple files in a folder).
2. Categorizes transactions based on:
   * Predefined rules
   * User-created categories & subcategories
3. Outputs **static HTML reports**, including:
   * Category breakdowns
   * Pie charts
   * Bar charts showing whether spending goals were met
     * Categories exceeding goals appear **red**
   * Monthly and yearly spending averages
     * Estimated when partial data is available
   * Time-filterable views (day, week, month, year)
   * Summaries & insights
Everything runs **offline** for perfect data security.

## Supported Data Format

### ZKB CSV (initial focus)
```
Date | Booking text | ZKB reference | Reference number |
Debit CHF | Credit CHF | Value date | Balance CHF
```

We will later add adapters for:
* UBS
* Raiffeisen
* PostFinance
* Revolut / Wise
No API interaction — **CSV only**.

## Data & Security
### What will be published on GitHub:
* Source code
* Documentation
* Example/fake CSVs

### What will *never* be published:
* Real bank or financial data
* Sensitive personal information

### Security Principles
* Runs **only on local machine**
* No servers, no online access
* No API tokens, OAuth, or certificates
* CSV import is the only input method
* No financial data leaves the device

## Technology
* **Python**
* Pandas for data processing
* Matplotlib / Plotly for charts
* Jinja2 for HTML templates
* ReportLab or WeasyPrint for PDF output
* Optional: Dash / Streamlit for interactive mode
