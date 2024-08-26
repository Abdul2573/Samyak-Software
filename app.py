from flask import Flask, jsonify
import pandas as pd
import os

app = Flask(__name__)

@app.route('/api/jewelry', methods=['GET'])
def get_jewelry_data():
    # Ensure the file path is correct
    file_path = os.path.join(os.path.dirname(__file__), 'WebAppReport.xlsx')
    df = pd.read_excel(file_path)
    data = df[['CategoryName', 'GoldWeight', 'TagPrice']]
    return jsonify(data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)



# @app.route('/api/jewelry', methods=['GET'])
# def get_jewelry():
#     jewelry = [
#         {"CategoryName": "RING", "GoldWeight": 5.5, "TagPrice": 2333},
#         # Add more jewelry items here
#     ]
#     return jsonify(jewelry)

# if __name__ == '__main__':
#     app.run(debug=True)