// TypeScript interfaces for the Breast Cancer Recurrence Prediction App

export interface PredictionFormData {
  age: string;
  menopause: string;
  "tumor-size": string;
  "inv-nodes": string;
  "node-caps": string;
  "deg-malig": number;
  breast: string;
  "breast-quad": string;
  irradiat: string;
}

export interface PredictionResponse {
  prediction: string;
  probability?: number;
  confidence?: string;
  risk_level?: string;
}

export interface FormField {
  name: keyof PredictionFormData;
  label: string;
  type: "select" | "radio" | "slider";
  options?: string[];
  min?: number;
  max?: number;
  description?: string;
}

export interface ValidationError {
  field: keyof PredictionFormData;
  message: string;
}
