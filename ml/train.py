import pandas as pd
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, confusion_matrix
from preprocess import preprocess_data
import os

# Get the directory of this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Correct CSV path
excel_path = os.path.join(BASE_DIR, "../data/recurrent_breastcancer.xlsx")
csv_path = os.path.join(BASE_DIR, "../data/breast_cancer.csv")

# Load dataset
df_csv = pd.read_csv(csv_path)

df_excel = pd.read_excel(excel_path)


# 🔥 ALIGN COLUMNS HERE
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

# 🔥 ALIGN TARGET LABELS HERE
df_excel["target"] = df_excel["target"].replace({
    "no-recurrence-events": 0,
    "recurrence-events": 1
}).astype(int)

# Keep common columns only
common_cols = df_excel.columns.intersection(df_csv.columns)
df_excel = df_excel[common_cols]
df_csv = df_csv[common_cols]

# Merge datasets
df = pd.concat([df_excel, df_csv], ignore_index=True)

# Preprocess data
preprocessor, X_train, X_test, y_train, y_test = preprocess_data(df)

# Define model
model = LogisticRegression(max_iter=1000,class_weight="balanced")

# Pipeline
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", model)
])

# Train
pipeline.fit(X_train, y_train)

# Save model
model_path = os.path.join(BASE_DIR, "../ml/model.pkl")
joblib.dump(pipeline, model_path)

print("✅ Model trained and saved at", model_path)

# Predict on test set
y_pred = pipeline.predict(X_test)

# Metrics
accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)

tn, fp, fn, tp = cm.ravel()

sensitivity = tp / (tp + fn)   # Recall for recurrence
specificity = tn / (tn + fp)

print("\n📊 Model Evaluation")
print(df["target"].dtype)
print(df["target"].value_counts())
print(f"Accuracy     : {accuracy:.4f}")
print(f"Sensitivity  : {sensitivity:.4f}")
print(f"Specificity  : {specificity:.4f}")
