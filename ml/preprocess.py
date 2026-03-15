from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
import pandas as pd
import numpy as np

def preprocess_data(X, y=None):
    """
    Preprocess the data for model training.
    
    Args:
        X: DataFrame with features
        y: Series with target (optional, for train-test split)
    
    Returns:
        preprocessor: Fitted preprocessor
        X_train: Training features (if y provided)
        X_test: Test features (if y provided)
        y_train: Training target (if y provided)
        y_test: Test target (if y provided)
    """
    # Handle missing values
    X = X.copy()
    
    # Fill missing values for categorical columns
    for col in X.columns:
        if X[col].dtype == 'object':
            X[col] = X[col].fillna('Unknown')
        else:
            X[col] = X[col].fillna(X[col].median())
    
    categorical_features = X.columns.tolist()
    
    # Create preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features)
        ]
    )
    
    if y is not None:
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            stratify=y,
            random_state=42
        )
        
        return preprocessor, X_train, X_test, y_train, y_test
    
    # If no y provided, just transform X
    X_processed = preprocessor.fit_transform(X)
    return preprocessor, X_processed
