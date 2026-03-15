import joblib
import pandas as pd
import numpy as np
from fastapi import HTTPException

# Load the model - supports both old and new format
model_path = "ml/model.pkl"

try:
    model_data = joblib.load(model_path)
    # Check if it's the new format (dict with 'model' key)
    if isinstance(model_data, dict):
        model = model_data['model']
        preprocessor = model_data.get('preprocessor', None)
        threshold = model_data.get('threshold', 0.5)
    else:
        # Old format - just the model
        model = model_data
        preprocessor = None
        threshold = 0.5
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Failed to load model: {str(e)}")

def predict_recurrence(data: dict):
    try:
        df = pd.DataFrame([data])
        
        # Handle missing columns
        for col in df.columns:
            if df[col].dtype == 'object':
                df[col] = df[col].fillna('Unknown')
            else:
                df[col] = df[col].fillna(df[col].median())
        
        # If we have a preprocessor, use it
        if preprocessor is not None:
            X = preprocessor.transform(df)
        else:
            X = df
        
        # Use threshold for prediction if available
        if hasattr(model, 'predict_proba') and threshold != 0.5:
            proba = model.predict_proba(X)[:, 1]
            prediction = 1 if proba[0] >= threshold else 0
        else:
            prediction = model.predict(X)[0]
        
        return "Yes" if prediction == 1 else "No"
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
