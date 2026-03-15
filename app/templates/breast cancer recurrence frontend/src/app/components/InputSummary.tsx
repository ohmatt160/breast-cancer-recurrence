// Input summary visualization component

import { motion } from "motion/react";
import { PredictionFormData } from "../types";

interface InputSummaryProps {
  formData: PredictionFormData;
}

export function InputSummary({ formData }: InputSummaryProps) {
  const fieldsFilled = Object.entries(formData).filter(([key, value]) => {
    if (key === "deg-malig") return true; // Always filled with default value
    return value !== "";
  }).length;

  const totalFields = Object.keys(formData).length;
  const progress = (fieldsFilled / totalFields) * 100;

  const getFieldLabel = (key: string): string => {
    const labels: Record<string, string> = {
      age: "Age",
      menopause: "Menopause",
      "tumor-size": "Tumor Size",
      "inv-nodes": "Nodes",
      "node-caps": "Node Caps",
      "deg-malig": "Malignancy",
      breast: "Breast",
      "breast-quad": "Quadrant",
      irradiat: "Radiation",
    };
    return labels[key] || key;
  };

  const filledFields = Object.entries(formData).filter(([key, value]) => {
    if (key === "deg-malig") return true;
    return value !== "";
  });

  if (fieldsFilled === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg shadow-[#8b7fa8]/5 border border-white/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-[#2d2942]">Form Progress</h3>
          <span className="text-sm text-[#6d6880]">
            {fieldsFilled} / {totalFields} fields
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-[#8b7fa8]/10 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8b7fa8] to-[#b8aed4] rounded-full"
          />
        </div>

        {/* Filled Fields Summary */}
        {filledFields.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filledFields.map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#f4d7e3]/30 to-[#d4e5f7]/30 rounded-xl p-3 border border-white/60"
              >
                <p className="text-xs text-[#6d6880] mb-1">
                  {getFieldLabel(key)}
                </p>
                <p className="text-sm text-[#2d2942] truncate">
                  {String(value)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
