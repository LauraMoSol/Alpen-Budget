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
A local script that:
1. Step 1: Reads a CSV file (or multiple files in a folder).
2. Step 2: Categorizes transactions based on:
   * Predefined rules
   * User-created categories & subcategories
3. Step 3: Code(R) - In Progress 
→ reads categorized CSV
→ computes summaries, aggregates, insights
→ generates SVG charts + tables
→ writes static files into /public/reports
4. Step 4: Astro - In Progress
→ HTML + SVG
→ zero JS required for charts
  
  ## How to Use:
1. Run python script in data folder: Step_1_generate_zkb_sample_expenses.py
2. Run python script in data folder: Step_2_categorized_zkb_sample_expenses.py
3. _In progress_
4. _In progress__


## Tech Stack

- **Astro** – page structure, server rendering  
- **React** – interactivity, state, client-side logic  
- **Plain CSS** – styling and responsiveness (Tailwind removed)  
- **No UI frameworks**

## Core UX Goals

### 1. Landing page

- Full screen
- Title, subtitle, CSV upload buttons
- Buttons centered on the page, stacked vertically

### 2. Reports page

- Hidden until report generation
- Smoothly scrolls into view
- Exactly one viewport tall
- Displays graphs or a placeholder

### 3. Responsive & stable

- Layout scales proportionally with screen size
- Zooming (`Ctrl + / −`) does not shift sections
- No layout jumps or overlap

### ZKB CSV (initial focus)
```
Date | Booking text | ZKB reference | Reference number |
Debit CHF | Credit CHF | Value date | Balance CHF
```
## Other 
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
