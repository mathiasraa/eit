# Simple flask server to serve the model
# Run with `python server.py`

from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/predict", methods=["POST"])
def predict():
    # data = request.get_json()
    # prediction = model.predict(data)
    # return jsonify(prediction.tolist())

    dummy_data = {"data": "dummy", "prediction": "dummy"}

    return jsonify(dummy_data)


if __name__ == "__main__":
    app.run(port=8080)
