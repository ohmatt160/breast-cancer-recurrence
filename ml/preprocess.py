from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
import pandas as pd

def preprocess_data(df: pd.DataFrame):
    df = df.dropna(subset=["target"])

    X = df.drop(columns=["target"], axis=1)
    y = df["target"]

    categorical_features = X.columns.tolist()

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        stratify=y,
        random_state=42
    )

    return preprocessor, X_train, X_test, y_train, y_test
