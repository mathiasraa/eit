from flask import Flask, request, jsonify
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
        #shap_values = shap_explainer.shap_values(input_df)

        # 3) Convert SHAP values to a JSON-friendly structure
        #    We'll build a dictionary keyed by output index


        # 4) Format the prediction as well. 'prediction' might be array([[x0, x1, ...]]) for one row
        #    So let's flatten it, e.g., .tolist()[0] is common
        result = {
            "prediction": prediction.tolist(),
            #"feature_importance": all_outputs_importance
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
