import csv
import os
from datetime import datetime
from fastapi import FastAPI
from .schemas import PatientData, PredictionResponse
from .model import predict_recurrence

LOG_FILE = "logs/predictions_log.csv"

# Ensure log file exists and has headers

if not os.path.exists("logs"):
    os.makedirs("logs")

if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, mode="w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "timestamp", "age", "menopause", "tumor_size", "inv_nodes",
            "node_caps", "deg_malig", "breast", "breast_quad", "irradiat", "recurrence"
        ])

app = FastAPI(title="Breast Cancer Recurrence Predictor")

def map_patient_to_model_input(patient: PatientData):
    return {
         "age": patient.age,
        "menopause": patient.menopause,
        "tumor-size": patient.tumor_size,
        "inv-nodes": patient.inv_nodes,
        "node-caps": patient.node_caps,
        "deg-malig": patient.deg_malig,
        "breast": patient.breast,
        "breast-quad": patient.breast_quad,
        "irradiat": patient.irradiat
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(patient: PatientData):
    model_input = map_patient_to_model_input(patient)
    result = predict_recurrence(model_input)
    # Log the prediction
    with open(LOG_FILE, mode="a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now().isoformat(),  # timestamp
            patient.age,
            patient.menopause,
            patient.tumor_size,
            patient.inv_nodes,
            patient.node_caps,
            patient.deg_malig,
            patient.breast,
            patient.breast_quad,
            patient.irradiat,
            result
        ])
    return {"recurrence": result}
