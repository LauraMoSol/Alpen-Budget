# ==========================================
# ALPEN BUDGET - REPORT SCRIPT WITH TIMESTAMPED FOLDER
# ==========================================

# -----------------------------
# 1. SETTINGS
# -----------------------------
time_unit <- "month"   # options: "day", "month", "year"

# -----------------------------
# 2. LOAD LIBRARIES
# -----------------------------
library(readr)
library(dplyr)
library(ggplot2)
library(lubridate)
library(scales)

# -----------------------------
# 3. SET FILE PATH (PREDEFINED)
# -----------------------------
csv_path <- "/Users/laura/Desktop/ETH/H4S/Project/Alpen-Budget/backend/data/sample_data/Generated_ZKB_Example_1_categorized.csv"

if (!file.exists(csv_path)) {
  stop("CSV file not found at the predefined path.")
}

cat("Loading:", csv_path, "\n")

# -----------------------------
# 4. CREATE TIMESTAMPED REPORT FOLDER
# -----------------------------
# Base folder where all timestamped reports go
base_reports_dir <- "/Users/laura/Desktop/ETH/H4S/Project/Alpen-Budget/frontend/fast-proxima/public/reports"

if (!dir.exists(base_reports_dir)) dir.create(base_reports_dir, recursive = TRUE)

# Timestamp for current run
timestamp <- format(Sys.time(), "%Y-%m-%d_%H-%M-%S")
reports_dir <- file.path(base_reports_dir, timestamp)
dir.create(reports_dir)

cat("Reports will be saved to:", reports_dir, "\n")

# -----------------------------
# 5. LOAD DATA
# -----------------------------
df <- read_csv(
  csv_path,
  col_types = cols(Date = col_date(format = "%d.%m.%Y"))
)

# Ensure numeric debit
df <- df %>%
  mutate(
    Debit_CHF = as.numeric(`Debit CHF`),
    Debit_CHF = coalesce(Debit_CHF, 0)
  )

# Check Category column exists
if (!"Category" %in% colnames(df)) {
  stop("The selected file does not contain a 'Category' column.")
}

# -----------------------------
# 6. SPENDING OVER TIME
# -----------------------------
df_time <- df %>%
  mutate(
    Time = if (time_unit == "day") {
      Date
    } else if (time_unit == "month") {
      floor_date(Date, unit = "month")
    } else if (time_unit == "year") {
      floor_date(Date, unit = "year")
    } else {
      Date
    }
  ) %>%
  group_by(Time) %>%
  summarise(Spending = sum(Debit_CHF), .groups = "drop") %>%
  arrange(Time)

x_labels <- switch(
  time_unit,
  "day"   = date_format("%d.%m.%Y"),
  "month" = date_format("%b %Y"),
  "year"  = date_format("%Y")
)

p_time <- ggplot(df_time, aes(x = Time, y = Spending)) +
  geom_col(fill = "#3fa73f") +
  labs(
    title = paste("Total Spending per", time_unit),
    x = "Time",
    y = "Debit (CHF)"
  ) +
  scale_x_date(labels = x_labels) +
  theme_minimal()

ggsave(
  filename = file.path(reports_dir, "spending_over_time.svg"),
  plot = p_time,
  width = 10,
  height = 6,
  device = "svg"
)

cat("Saved: spending_over_time.svg\n")

# -----------------------------
# 7. SPENDING BY CATEGORY
# -----------------------------
df_cat <- df %>%
  group_by(Category) %>%
  summarise(
    Spending = sum(Debit_CHF),
    .groups = "drop"
  ) %>%
  arrange(desc(Spending))

p_cat <- ggplot(df_cat, aes(x = reorder(Category, Spending), y = Spending)) +
  geom_col(fill = "#1f77b4") +
  coord_flip() +
  labs(
    title = "Spending by Category",
    x = "Category",
    y = "Total Spending (CHF)"
  ) +
  theme_minimal()

ggsave(
  filename = file.path(reports_dir, "spending_by_category.svg"),
  plot = p_cat,
  width = 10,
  height = 6,
  device = "svg"
)

cat("Saved: spending_by_category.svg\n")

# -----------------------------
# 8. CATEGORY SHARE PIE CHART
# -----------------------------
p_pie <- ggplot(df_cat, aes(x = "", y = Spending, fill = Category)) +
  geom_col(width = 1) +
  coord_polar(theta = "y") +
  labs(title = "Category Share of Spending") +
  theme_void()

ggsave(
  filename = file.path(reports_dir, "category_share.svg"),
  plot = p_pie,
  width = 8,
  height = 8,
  device = "svg"
)

cat("Saved: category_share.svg\n")

# -----------------------------
# 9. SUMMARY
# -----------------------------
cat("\n========== SUMMARY ==========\n")
cat("Total Spending:", sum(df$Debit_CHF), "CHF\n")
cat("Transactions:", nrow(df), "\n")
cat("=============================\n")