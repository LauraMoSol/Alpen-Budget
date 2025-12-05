import csv
import random
import datetime
import os

# ---------------------------------------------------------
# Helper functions
# ---------------------------------------------------------

def random_date_in_month(year, month):
    """Return a random date in a specific month."""
    day = random.randint(1, 28)
    return datetime.date(year, month, day)

def generate_reference(num_digits=10):
    return ''.join(str(random.randint(0, 9)) for _ in range(num_digits))

def random_balance_change(balance, debit, credit):
    return balance - debit + credit

# ---------------------------------------------------------
# Expense categories and sample booking texts
# ---------------------------------------------------------

EXPENSES = {
    "Housing": [
        "Rent payment to Wohnungsverwaltung Zürich",
        "EWZ Electricity Bill",
        "Zürich Water Utility Payment",
        "Building Maintenance Fee"
    ],
    "Utilities": [
        "Swisscom Mobile Subscription",
        "Sunrise Internet Bill",
    ],
    "Health": [
        "CSS Health Insurance Premium",
        "Doctor visit at Permanence Hauptbahnhof",
        "Pharmacy purchase at Amavita",
        "Dentist visit at Zurich Dentistry Group",
    ],
    "Financial": [
        "3a Pillar Savings Contribution",
        "Investment Transfer to Trading Account",
        "Quarterly Tax Payment to Steueramt Zürich",
        "Credit Card Bill Payment",
    ],
    "Groceries & Personal Care": [
        "Migros Einkauf",
        "Coop Supermarkt Shopping",
        "Denner Lebensmittel",
        "Haircut at GIDOR Coiffure",
        "Drogerie Müller",
    ],
    "Entertainment & Social": [
        "Dinner at Restaurant Zeughauskeller",
        "Movie Ticket at Pathé Sihlcity",
        "Coffee at Starbucks Zürich",
        "Spotify Subscription",
        "Netflix Subscription",
        "Hobby Supplies Purchase",
        "Travel Booking via SBB",
    ],
    "Transport": [
        "Gas purchase at AVIA",
        "Parking Fee Zürich",
        "ZVV Monthly Pass Purchase",
        "Car Insurance Bill",
    ],
    "Clothing": [
        "Zara Clothing Purchase",
        "Globus Fashion Store",
    ],
    "Miscellaneous": [
        "Gift purchase at Orell Füssli",
        "Donation to Swiss Red Cross"
    ]
}

# Credit card–specific transactions
CREDIT_CARD_EXPENSES = [
    "TWINT Purchase",
    "VISA Online Payment",
    "Mastercard Retail Purchase",
    "Google Pay Transaction"
]


# ---------------------------------------------------------
# Generate Transactions
# ---------------------------------------------------------

def generate_transactions(year, month, num_transactions=60):
    transactions = []
    balance = 5000  # starting balance

    # Monthly salary injection
    salary_date = datetime.date(year, month, random.randint(1, 5))
    salary_amount = 6500
    balance += salary_amount
    transactions.append({
        "Date": salary_date,
        "Booking text": "Monthly Salary Payment",
        "ZKB reference": generate_reference(),
        "Reference number": generate_reference(6),
        "Debit CHF": "",
        "Credit CHF": salary_amount,
        "Value date": salary_date,
        "Balance CHF": balance
    })

    # Monthly rent
    rent_date = datetime.date(year, month, random.randint(25, 28))
    rent_amount = 2400
    balance -= rent_amount
    transactions.append({
        "Date": rent_date,
        "Booking text": "Rent payment to Wohnungsverwaltung Zürich",
        "ZKB reference": generate_reference(),
        "Reference number": generate_reference(6),
        "Debit CHF": rent_amount,
        "Credit CHF": "",
        "Value date": rent_date,
        "Balance CHF": balance
    })

    # Random expenses
    for _ in range(num_transactions):
        category = random.choice(list(EXPENSES.keys()))
        booking_text = random.choice(EXPENSES[category])

        # 20% chance: credit card-based
        if random.random() < 0.2:
            booking_text = random.choice(CREDIT_CARD_EXPENSES) + " – " + booking_text

        date = random_date_in_month(year, month)
        debit = round(random.uniform(5, 300), 2)
        credit = ""

        # Update balance
        balance -= debit

        transactions.append({
            "Date": date,
            "Booking text": booking_text,
            "ZKB reference": generate_reference(),
            "Reference number": generate_reference(6),
            "Debit CHF": debit,
            "Credit CHF": credit,
            "Value date": date,
            "Balance CHF": round(balance, 2)
        })

    # Sort chronologically
    transactions.sort(key=lambda x: x["Date"])
    return transactions


# ---------------------------------------------------------
# Save to CSV
# ---------------------------------------------------------

def save_csv(transactions, filename):
    # Ensure .csv extension
    if not filename.lower().endswith(".csv"):
        filename += ".csv"

    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="\t")
        writer.writerow([
            "Date", "Booking text", "ZKB reference", "Reference number",
            "Debit CHF", "Credit CHF", "Value date", "Balance CHF"
        ])
        for t in transactions:
            writer.writerow([
                t["Date"],
                t["Booking text"],
                t["ZKB reference"],
                t["Reference number"],
                t["Debit CHF"],
                t["Credit CHF"],
                t["Value date"],
                t["Balance CHF"]
            ])
    print(f"\nCSV saved to: {os.path.abspath(filename)}")


# ---------------------------------------------------------
# Main Program
# ---------------------------------------------------------

def main():
    print("ZKB CSV Generator")
    year = int(input("Enter year (e.g., 2025): "))
    month = int(input("Enter month (1–12): "))
    file_name = input("Choose a name for the CSV file (no extension needed): ")

    transactions = generate_transactions(year, month, num_transactions=80)
    save_csv(transactions, file_name)
    print("\nDone! Your synthetic ZKB expense CSV is ready.")


if __name__ == "__main__":
    main()