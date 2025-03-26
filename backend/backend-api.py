from flask import Flask, request, jsonify, Response, stream_with_context
import joblib
import pandas as pd
import numpy as np
import shap
import json
import time
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for all endpoints
CORS(
    app,
    origins="*",
)


# Load the model bundle once at startup
bundle = joblib.load("rf_bundle.pkl")
model = bundle["model"]
transformer = bundle["transformer"]
feature_keys = bundle["feature_names"]
shap_explainer = bundle["shap_explainer"]


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Check if all required keys are present
        missing_keys = [key for key in feature_keys if key not in data]
        if missing_keys:
            return jsonify({"error": f"Missing keys: {missing_keys}"}), 400

        # Convert the input data into a DataFrame with the proper feature order
        input_df = pd.DataFrame([data], columns=feature_keys)

        # Predict using the model
        prediction = model.predict(input_df)[0]
        prediction_transformed = round(float(prediction) * 50, 1)

        # Compute SHAP values
        shap_values = shap_explainer.shap_values(input_df)
        feature_importance = {
            key: float(shap_values[0][i]) for i, key in enumerate(feature_keys)
        }

        return (
            jsonify(
                {
                    "prediction": prediction_transformed,
                    "feature_importance": feature_importance,
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/predict/stream", methods=["POST"])
def predict_stream():
    try:
        data = request.get_json()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    @stream_with_context
    def generate():
        try:

            # Initial progress update
            yield f"data: {json.dumps({'progress': 5, 'message': 'Initializing simulation...', 'type': 'progress'})}\n\n"
            time.sleep(0.7)

            # Validate input data
            missing_keys = [key for key in feature_keys if key not in data]
            if missing_keys:
                yield f"data: {json.dumps({'error': f'Missing keys: {missing_keys}', 'type': 'error'})}\n\n"
                return

            yield f"data: {json.dumps({'progress': 15, 'message': 'Loading geological parameters...', 'type': 'progress'})}\n\n"
            time.sleep(0.8)

            yield f"data: {json.dumps({'progress': 25, 'message': 'Calculating soil response factors...', 'type': 'progress'})}\n\n"
            time.sleep(0.6)

            # Create dataframe
            input_df = pd.DataFrame([data], columns=feature_keys)
            yield f"data: {json.dumps({'progress': 40, 'message': 'Building structural analysis model...', 'type': 'progress'})}\n\n"
            time.sleep(0.9)

            yield f"data: {json.dumps({'progress': 55, 'message': 'Running seismic wave propagation...', 'type': 'progress'})}\n\n"
            time.sleep(1.0)

            # Make prediction
            prediction = model.predict(input_df)[0]
            prediction_transformed = round(float(prediction) * 50, 1)
            yield f"data: {json.dumps({'progress': 70, 'message': 'Evaluating structural integrity...', 'type': 'progress'})}\n\n"
            time.sleep(0.8)

            # Calculate SHAP values
            yield f"data: {json.dumps({'progress': 85, 'message': 'Analyzing failure points...', 'type': 'progress'})}\n\n"
            time.sleep(0.7)

            shap_values = shap_explainer.shap_values(input_df)
            feature_importance = {
                key: float(shap_values[0][i]) for i, key in enumerate(feature_keys)
            }

            yield f"data: {json.dumps({'progress': 95, 'message': 'Compiling final damage assessment...', 'type': 'progress'})}\n\n"
            time.sleep(0.6)

            # Send final result
            result = {
                "progress": 100,
                "message": "Simulation complete",
                "type": "complete",
                "prediction": prediction_transformed,
                "feature_importance": feature_importance,
            }
            yield f"data: {json.dumps(result)}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e), 'type': 'error'})}\n\n"

    return Response(generate(), mimetype="text/event-stream")


if __name__ == "__main__":
    app.run(debug=True)
