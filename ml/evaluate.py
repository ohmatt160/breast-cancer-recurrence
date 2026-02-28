from sklearn.metrics import confusion_matrix, accuracy_score
import joblib
import pandas as pd

pipeline = joblib.load("ml/model.pkl")
df = pd.read_csv("data/dataset.csv")

X = df.drop("recurrence", axis=1)
y = df["recurrence"]

y_pred = pipeline.predict(X)

tn, fp, fn, tp = confusion_matrix(y, y_pred).ravel()

accuracy = accuracy_score(y, y_pred)
sensitivity = tp / (tp + fn)
specificity = tn / (tn + fp)

print(f"Accuracy: {accuracy:.2f}")
print(f"Sensitivity: {sensitivity:.2f}")
print(f"Specificity: {specificity:.2f}")
