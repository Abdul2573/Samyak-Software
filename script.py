import pandas as pd

# Read the Excel file
file_path = '/mnt/data/WebAppReport.xlsx'
df = pd.read_excel(file_path)

# Extract the required columns
data = df[['CategoryName', 'GoldWeight', 'TagPrice']]

# Convert to JSON format for easy frontend consumption
data_json = data.to_json(orient='records')
print(data_json)
