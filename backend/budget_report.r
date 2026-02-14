# Budget Report QMD Script in (R)

# 1. Settings
time_unit <- "day"  # options: "day", "month", "year"

csv_path <- "/home/levolesialev/semester_project/Alpen-Budget/backend/sample_data/zkb_sample_expenses_1.csv"
reports_dir <- "/home/levolesialev/semester_project/Alpen-Budget/frontend/fast-proxima/public/reports"

if (!dir.exists(reports_dir)) {
  dir.create(reports_dir, recursive = TRUE)
}

# 2. Load Libraries
library(readr)
library(dplyr)
library(ggplot2)
library(lubridate)
library(scales)

# 3. Load CSV
df <- read_csv(
  csv_path,
  col_types = cols(Date = col_date(format = "%d.%m.%Y"))
)

# 4. Prepare Data
df <- df %>%
  mutate(Debit_CHF = coalesce(`Debit CHF`, 0))

df_agg <- df %>%
  mutate(
    Time = case_when(
      time_unit == "day"   ~ Date,
      time_unit == "month" ~ floor_date(Date, unit = "month"),
      time_unit == "year"  ~ floor_date(Date, unit = "year")
    )
  ) %>%
  group_by(Time) %>%
  summarise(Spending = sum(Debit_CHF), .groups = "drop") %>%
  arrange(Time)

# 5. Generate Bar Chart
x_labels <- switch(
  time_unit,
  "day"   = date_format("%d.%m.%Y"),
  "month" = date_format("%b %Y"),
  "year"  = date_format("%Y")
)

p <- ggplot(df_agg, aes(x = Time, y = Spending)) +
  geom_col(fill = "#3fa73f") +
  labs(
    title = paste("Spending per", time_unit),
    x = "Time",
    y = "Debit (CHF)"
  ) +
  scale_x_date(labels = x_labels) +
  theme_minimal(base_size = 14) +
  theme(
    panel.background = element_rect(fill = "#1f2937", color = NA),
    plot.background  = element_rect(fill = "#1f2937", color = NA),
    panel.grid.major = element_line(color = "#2e3a4b", size = 0.5),
    panel.grid.minor = element_line(color = "#2e3a4b", size = 0.25),
    axis.text  = element_text(color = "white"),
    axis.title = element_text(color = "white", face = "bold"),
    axis.text.x = element_text(angle = 45, hjust = 1),
    plot.title = element_text(color = "white", face = "bold", size = 16, hjust = 0.5),
    plot.margin = margin(10, 10, 10, 10)
  )

# 6. Save Plot as SVG
svg_file <- file.path(
  reports_dir,
  paste0("spending_per_", time_unit, ".svg")
)

ggsave(
  filename = svg_file,
  plot = p,
  width = 10,
  height = 6,
  device = "svg"
)

cat("SVG saved to:", svg_file, "\n")

# 7. Preview First 10 Rows
print(head(df_agg, 10))