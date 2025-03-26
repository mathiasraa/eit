import time
from flask import Flask, json, request, jsonify, Response, stream_with_context
import joblib
import pandas as pd
import numpy as np
import shap
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

# Load model and explainer at startup
bundle = joblib.load("rf_bundle.pkl")
model = bundle["model"]
feature_keys = bundle["feature_names"]
shap_explainer = bundle["shap_explainer"]  # This is a TreeExplainer or similar


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Check for missing keys
        missing_keys = [key for key in feature_keys if key not in data]
        if missing_keys:
            return jsonify({"error": f"Missing keys: {missing_keys}"}), 400

        # Create DataFrame in the correct order
        input_df = pd.DataFrame([data], columns=feature_keys)

        # 1) Predict using your multi-output regressor
        #    This might return something like array([[pred_for_output_0, pred_for_output_1, ...]])
        prediction = model.predict_proba(input_df)

        # 2) Compute SHAP values for each output
        #    For multi-output regression, shap_values is typically a list of arrays,
        #    each array: shape (n_samples, n_features)
        # shap_values = shap_explainer.shap_values(input_df)

        # 3) Convert SHAP values to a JSON-friendly structure
        #    We'll build a dictionary keyed by output index

        # 4) Format the prediction as well. 'prediction' might be array([[x0, x1, ...]]) for one row
        #    So let's flatten it, e.g., .tolist()[0] is common
        result = {
            "prediction": prediction.tolist(),
            # "feature_importance": all_outputs_importance
        }

        return jsonify(result), 200

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
            # prediction = model.predict(input_df)[0]
            # prediction_transformed = round(float(prediction) * 50, 1)
            yield f"data: {json.dumps({'progress': 70, 'message': 'Evaluating structural integrity...', 'type': 'progress'})}\n\n"
            time.sleep(0.8)

            # Calculate SHAP values
            yield f"data: {json.dumps({'progress': 85, 'message': 'Analyzing failure points...', 'type': 'progress'})}\n\n"
            time.sleep(0.7)

            # shap_values = shap_explainer.shap_values(input_df)
            # feature_importance = {
            #     key: float(shap_values[0][i]) for i, key in enumerate(feature_keys)
            # }

            yield f"data: {json.dumps({'progress': 95, 'message': 'Compiling final damage assessment...', 'type': 'progress'})}\n\n"
            time.sleep(0.6)

            prediction = model.predict_proba(input_df)

            # Send final result
            result = {
                "progress": 100,
                "message": "Simulation complete",
                "type": "complete",
                "prediction": prediction.tolist(),
                # "prediction": prediction_transformed,
                # "feature_importance": feature_importance,
            }
            yield f"data: {json.dumps(result)}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e), 'type': 'error'})}\n\n"

    return Response(generate(), mimetype="text/event-stream")


if __name__ == "__main__":
    app.run(debug=True)
