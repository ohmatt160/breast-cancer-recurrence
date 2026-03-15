// API service for breast cancer recurrence prediction

import { PredictionFormData, PredictionResponse } from "./types";

// Use relative URL (same origin) by default, configurable via VITE_API_URL
// For local development, set VITE_API_URL=http://localhost:8000
const getBaseUrl = (): string => {
  if (typeof import.meta.env.VITE_API_URL === 'string' && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Default to relative URL (same origin as the page)
  return "";
};

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function predictRecurrence(
  data: PredictionFormData
): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${getBaseUrl()}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.detail || errorData.message || "Failed to get prediction",
        response.status
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new APIError(
        "Unable to connect to the prediction service. Please check your connection and try again."
      );
    }

    throw new APIError("An unexpected error occurred. Please try again.");
  }
}
