import joblib
import pandas as pd
from fastapi import HTTPException

model = joblib.load("ml/model.pkl")

def predict_recurrence(data: dict):
    try:
        df = pd.DataFrame([data])
        missing_cols = set(model.feature_names_in_) - set(df.columns)
        if missing_cols:
            raise ValueError(f"Missing columns: {missing_cols}")
        prediction = model.predict(df)[0]
        return "Yes" if prediction == 1 else "No"
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
