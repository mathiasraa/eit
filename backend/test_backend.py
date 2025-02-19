import requests

url = "http://127.0.0.1:5000/build"
data = {
    "foundation_type": "Pile",
    "num_floors": 3,
    "superstructure_type": "Concrete",
    "age": 10,
    "plinth_area": 1500
}

response = requests.post(url, json=data)

try:
    response_data = response.json()  # Try parsing JSON
except requests.exceptions.JSONDecodeError:
    print("Failed to decode JSON. Response text:", response.text)
else:
    print("Response:", response_data)