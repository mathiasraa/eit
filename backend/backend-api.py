from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import shap

app = Flask(__name__)

# Load the model bundle once at startup
bundle = joblib.load('rf_bundle.pkl')
model = bundle['model']
transformer = bundle['transformer']  # Optional transformer for prediction output
feature_keys = bundle['feature_names']
shap_explainer = bundle['shap_explainer']  # SHAP explainer for the model

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Check if all required keys are present
        missing_keys = [key for key in feature_keys if key not in data]
        if missing_keys:
            return jsonify({'error': f'Missing keys: {missing_keys}'}), 400

        # Convert the input data into a DataFrame with the proper feature order
        input_df = pd.DataFrame([data], columns=feature_keys)
        
        # If you are using a transformer for the features before prediction, uncomment:
        # input_df = transformer.transform(input_df)
        
        # Predict using the model
        prediction = model.predict(input_df)[0]
        
        # Optionally transform the prediction output using your transformer.
        # The transformer here is assumed to expect a 2D array.
        prediction_transformed = float(transformer.transform(np.array([[prediction]]))[0, 0])
        prediction_transformed = round(prediction_transformed * 100, 1)
        
        # Compute SHAP values for the sample. Here, we compute SHAP values on the input features.
        shap_values = shap_explainer.shap_values(input_df)
        # For a single sample, shap_values is a 2D array with shape (1, n_features)
        feature_importance = {key: float(shap_values[0][i]) for i, key in enumerate(feature_keys)}

        return jsonify({
            'prediction': prediction_transformed,
            'feature_importance': feature_importance
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
