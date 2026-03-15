// Custom hook for managing prediction form state and API calls

import { useState } from "react";
import { PredictionFormData, PredictionResponse } from "../types";
import { predictRecurrence, APIError } from "../api";

export interface UsePredictionReturn {
  formData: PredictionFormData;
  setFormData: React.Dispatch<React.SetStateAction<PredictionFormData>>;
  updateField: (field: keyof PredictionFormData, value: string | number) => void;
  result: PredictionResponse | null;
  loading: boolean;
  error: string | null;
  submitPrediction: () => Promise<void>;
  resetForm: () => void;
  isFormValid: boolean;
}

const initialFormData: PredictionFormData = {
  age: "",
  menopause: "",
  "tumor-size": "",
  "inv-nodes": "",
  "node-caps": "",
  "deg-malig": 1,
  breast: "",
  "breast-quad": "",
  irradiat: "",
};

export function usePrediction(): UsePredictionReturn {
  const [formData, setFormData] = useState<PredictionFormData>(initialFormData);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (
    field: keyof PredictionFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user makes changes
    if (error) setError(null);
  };

  const isFormValid = (): boolean => {
    return (
      formData.age !== "" &&
      formData.menopause !== "" &&
      formData["tumor-size"] !== "" &&
      formData["inv-nodes"] !== "" &&
      formData["node-caps"] !== "" &&
      formData.breast !== "" &&
      formData["breast-quad"] !== "" &&
      formData.irradiat !== ""
    );
  };

  const submitPrediction = async () => {
    // Validate form
    if (!isFormValid()) {
      setError("Please fill in all required fields before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await predictRecurrence(formData);
      setResult(prediction);
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setResult(null);
    setError(null);
  };

  return {
    formData,
    setFormData,
    updateField,
    result,
    loading,
    error,
    submitPrediction,
    resetForm,
    isFormValid: isFormValid(),
  };
}
