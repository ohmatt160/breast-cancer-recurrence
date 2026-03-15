from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
import joblib
import pandas as pd
import numpy as np
import os

# Load the model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model.pkl")

try:
    model_data = joblib.load(model_path)
    model = model_data['model']
    preprocessor = model_data.get('preprocessor', None)
    threshold = model_data.get('threshold', 0.5)
except:
    # Fallback for old model format
    model = joblib.load(model_path)
    preprocessor = None
    threshold = 0.5

# Load data
df_csv = pd.read_csv(os.path.join(BASE_DIR, "../data/breast_cancer.csv"))
df_excel = pd.read_excel(os.path.join(BASE_DIR, "../data/recurrent_breastcancer.xlsx"))

# Align columns
df_csv = df_csv.rename(columns={
    "node_caps": "node-caps",
    "breast_quad": "breast-quad",
    "irradiat ": "irradiat",
    "class": "target",
    "menopause": "menopause",
    "tumor_size": "tumor-size",
    "inv_nodes": "inv-nodes",
    "deg_malig": "deg-malig",
    "breast": "breast"
})

df_excel["target"] = df_excel["target"].replace({
    "no-recurrence-events": 0,
    "recurrence-events": 1
}).astype(int)

common_cols = df_excel.columns.intersection(df_csv.columns)
df_excel = df_excel[common_cols]
df_csv = df_csv[common_cols]

df = pd.concat([df_excel, df_csv], ignore_index=True)
df = df.dropna(subset=["target"])

X = df.drop(columns=["target"], axis=1)
y = df["target"]

# Handle missing values
for col in X.columns:
    if X[col].dtype == 'object':
        X[col] = X[col].fillna('Unknown')
    else:
        X[col] = X[col].fillna(X[col].median())

# Make predictions
if preprocessor is not None:
    X_processed = preprocessor.transform(X)
else:
    X_processed = X

# Use threshold if available
if hasattr(model, 'predict_proba') and threshold != 0.5:
    y_proba = model.predict_proba(X_processed)[:, 1]
    y_pred = (y_proba >= threshold).astype(int)
else:
    y_pred = model.predict(X_processed)

# Calculate metrics
tn, fp, fn, tp = confusion_matrix(y, y_pred).ravel()

accuracy = accuracy_score(y, y_pred)
sensitivity = tp / (tp + fn)
specificity = tn / (tn + fp)

print(f"Accuracy: {accuracy:.2f}")
print(f"Sensitivity: {sensitivity:.2f}")
print(f"Specificity: {specificity:.2f}")
print("\nClassification Report:")
print(classification_report(y, y_pred, target_names=['No Recurrence', 'Recurrence']))
