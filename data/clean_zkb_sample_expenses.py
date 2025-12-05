import pandas as pd
import tkinter as tk
from tkinter import filedialog
import re

# -------------------------------
# CATEGORY KEYWORD DEFINITIONS
# -------------------------------
CATEGORY_KEYWORDS = {
    "Housing: Rent / Mortgage": ["rent", "wohnung", "verwaltung"],
    "Housing: Electricity": ["ewz", "strom", "electricity"],
    "Housing: Water": ["wasser", "water utility"],
    "Housing: Maintenance & Repairs": ["maintenance", "repair", "hauswartung"],

    "Utilities: Phone": ["mobile", "handy", "phone", "swisscom"],
    "Utilities: WiFi": ["internet", "wifi", "sunrise"],

    "Health & Medical: Health Insurance": ["insurance", "krankenkasse", "css"],
    "Health & Medical: Doctor Visits": ["doctor", "permanence", "arzt"],
    "Health & Medical: Medication": ["pharmacy", "pharma", "amavita"],
    "Health & Medical: Dental / Vision": ["dentist", "dental", "vision"],

    "Financial Obligations: Debt Payments": ["debt", "loan"],
    "Financial Obligations: Savings Contributions": ["pillar", "3a", "savings"],
    "Financial Obligations: Investments": ["investment", "trading", "broker"],
    "Financial Obligations: Taxes": ["steueramt", "tax"],

    "Groceries / Personal Care": ["migros", "coop", "denner", "gidor", "drogerie"],

    "Entertainment & Social: Dining Out": ["restaurant", "dinner", "essen", "food"],
    "Entertainment & Social: Movies / Events / Concerts": ["movie", "pathé", "cinema", "concert"],
    "Entertainment & Social: Coffee / Snacks": ["coffee", "starbucks", "café"],
    "Entertainment & Social: Subscriptions": ["spotify", "netflix", "abo"],
    "Entertainment & Social: Hobbies": ["hobby", "craft"],
    "Entertainment & Social: Travel / Vacations": ["sbb", "travel", "hotel", "flight"],

    "Transport and Car: Gas / Fuel": ["avia", "fuel", "gas", "tankstelle"],
    "Transport and Car: Parking / Tolls": ["parking", "parkhaus", "toll"],
    "Transport and Car: Public transport": ["zvv", "vbz", "bus", "tram"],
    "Transport and Car: Vehicle Insurance": ["car insurance"],

    "Clothing": ["zara", "globus", "clothing"],

    "Miscellaneous: Gifts": ["gift", "geschenk"],
    "Miscellaneous: Donations": ["donation", "spende"]
}

# -------------------------------
# CATEGORY MATCHING FUNCTION
# -------------------------------
def auto_categorize(text):
    text = text.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in text:
                return category
    return None  # No match found


# -------------------------------
# MAIN PROGRAM
# -------------------------------
def main():
    print("ZKB Transaction Categorizer")
    print("Please select the CSV file generated earlier.\n")

    # Tkinter file dialog
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename(
        filetypes=[("CSV Files", "*.csv"), ("All Files", "*.*")]
    )

    if not file_path:
        print("No file selected. Exiting.")
        return

    print(f"Loading: {file_path}")

    # Read CSV
    df = pd.read_csv(file_path, sep="\t")

    # Add Category column
    df["Category"] = ""

    for i, row in df.iterrows():
        text = str(row["Booking text"])

        # Try auto-categorization
        cat = auto_categorize(text)

        if cat:
            df.at[i, "Category"] = cat
            continue

        # Ask user if auto failed
        print("\n----------------------------------")
        print(f"Uncategorized transaction:\n{text}")
        print("----------------------------------")

        # Show all categories
        categories_list = list(CATEGORY_KEYWORDS.keys())
        for idx, c in enumerate(categories_list, 1):
            print(f"{idx}. {c}")
        print(f"{len(categories_list) + 1}. OTHER")

        choice = input("Select category number: ")

        try:
            choice = int(choice)
            if 1 <= choice <= len(categories_list):
                df.at[i, "Category"] = categories_list[choice - 1]
            else:
                df.at[i, "Category"] = "Other"
        except:
            df.at[i, "Category"] = "Other"

    # SAVE FILE
    save_path = file_path.replace(".csv", "_categorized.csv")
    df.to_csv(save_path, sep="\t", index=False)

    print(f"\nCategorized file saved to:\n{save_path}")
    print("Done!")


if __name__ == "__main__":
    main()
