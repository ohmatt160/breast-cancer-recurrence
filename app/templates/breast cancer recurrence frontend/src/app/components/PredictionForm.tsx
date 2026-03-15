// Prediction form component with all input fields

import { motion } from "motion/react";
import { Loader2, Send, RotateCcw } from "lucide-react";
import { PredictionFormData } from "../types";

interface PredictionFormProps {
  formData: PredictionFormData;
  updateField: (field: keyof PredictionFormData, value: string | number) => void;
  onSubmit: () => void;
  onReset: () => void;
  loading: boolean;
  error: string | null;
  isFormValid: boolean;
}

export function PredictionForm({
  formData,
  updateField,
  onSubmit,
  onReset,
  loading,
  error,
  isFormValid,
}: PredictionFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#8b7fa8]/10 border border-white/60 p-6 md:p-8 lg:p-10">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-[#e07a9e]/10 border border-[#e07a9e]/30 rounded-2xl"
          >
            <p className="text-[#e07a9e] text-sm">{error}</p>
          </motion.div>
        )}

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Age */}
          <FormSelect
            label="Age Range"
            name="age"
            value={formData.age}
            onChange={(value) => updateField("age", value)}
            options={[
              { value: "10-19", label: "10-19 years" },
              { value: "20-29", label: "20-29 years" },
              { value: "30-39", label: "30-39 years" },
              { value: "40-49", label: "40-49 years" },
              { value: "50-59", label: "50-59 years" },
              { value: "60-69", label: "60-69 years" },
              { value: "70-79", label: "70-79 years" },
              { value: "80-89", label: "80-89 years" },
              { value: "90-99", label: "90-99 years" },
            ]}
            required
          />

          {/* Menopause */}
          <FormSelect
            label="Menopause Status"
            name="menopause"
            value={formData.menopause}
            onChange={(value) => updateField("menopause", value)}
            options={[
              { value: "lt40", label: "Less than 40 years" },
              { value: "ge40", label: "40 years or more" },
              { value: "premeno", label: "Premenopausal" },
            ]}
            required
          />

          {/* Tumor Size */}
          <FormSelect
            label="Tumor Size (mm)"
            name="tumor-size"
            value={formData["tumor-size"]}
            onChange={(value) => updateField("tumor-size", value)}
            options={[
              { value: "0-4", label: "0-4 mm" },
              { value: "5-9", label: "5-9 mm" },
              { value: "10-14", label: "10-14 mm" },
              { value: "15-19", label: "15-19 mm" },
              { value: "20-24", label: "20-24 mm" },
              { value: "25-29", label: "25-29 mm" },
              { value: "30-34", label: "30-34 mm" },
              { value: "35-39", label: "35-39 mm" },
              { value: "40-44", label: "40-44 mm" },
              { value: "45-49", label: "45-49 mm" },
              { value: "50-54", label: "50-54 mm" },
            ]}
            required
          />

          {/* Inv Nodes */}
          <FormSelect
            label="Involved Nodes"
            name="inv-nodes"
            value={formData["inv-nodes"]}
            onChange={(value) => updateField("inv-nodes", value)}
            options={[
              { value: "0-2", label: "0-2 nodes" },
              { value: "3-5", label: "3-5 nodes" },
              { value: "6-8", label: "6-8 nodes" },
              { value: "9-11", label: "9-11 nodes" },
              { value: "12-14", label: "12-14 nodes" },
              { value: "15-17", label: "15-17 nodes" },
              { value: "24-26", label: "24-26 nodes" },
            ]}
            required
          />

          {/* Breast */}
          <FormSelect
            label="Breast"
            name="breast"
            value={formData.breast}
            onChange={(value) => updateField("breast", value)}
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
            required
          />

          {/* Breast Quadrant */}
          <FormSelect
            label="Breast Quadrant"
            name="breast-quad"
            value={formData["breast-quad"]}
            onChange={(value) => updateField("breast-quad", value)}
            options={[
              { value: "left_up", label: "Left Upper" },
              { value: "left_low", label: "Left Lower" },
              { value: "right_up", label: "Right Upper" },
              { value: "right_low", label: "Right Lower" },
              { value: "central", label: "Central" },
            ]}
            required
          />

          {/* Node Caps */}
          <div className="md:col-span-2">
            <FormRadio
              label="Node Capsule Involvement"
              name="node-caps"
              value={formData["node-caps"]}
              onChange={(value) => updateField("node-caps", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />
          </div>

          {/* Irradiation */}
          <div className="md:col-span-2">
            <FormRadio
              label="Irradiation Treatment"
              name="irradiat"
              value={formData.irradiat}
              onChange={(value) => updateField("irradiat", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />
          </div>

          {/* Degree of Malignancy */}
          <div className="md:col-span-2">
            <FormSlider
              label="Degree of Malignancy"
              name="deg-malig"
              value={formData["deg-malig"]}
              onChange={(value) => updateField("deg-malig", value)}
              min={1}
              max={3}
              step={1}
              description="Scale from 1 (low) to 3 (high)"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            type="submit"
            disabled={loading || !isFormValid}
            whileHover={!loading && isFormValid ? { scale: 1.02 } : {}}
            whileTap={!loading && isFormValid ? { scale: 0.98 } : {}}
            className={`
              px-8 py-4 rounded-2xl
              flex items-center justify-center gap-2
              transition-all duration-300
              ${
                loading || !isFormValid
                  ? "bg-[#d4d0e0] text-[#6d6880] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#8b7fa8] to-[#b8aed4] text-white shadow-lg shadow-[#8b7fa8]/30 hover:shadow-xl hover:shadow-[#8b7fa8]/40"
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Get Prediction</span>
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={onReset}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className={`
              px-8 py-4 rounded-2xl
              flex items-center justify-center gap-2
              transition-all duration-300
              ${
                loading
                  ? "bg-[#f5f3f7] text-[#6d6880] cursor-not-allowed"
                  : "bg-white/60 text-[#2d2942] border-2 border-[#8b7fa8]/30 hover:border-[#8b7fa8]/50 hover:bg-white/80"
              }
            `}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Form</span>
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}

// Select component
interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-[#2d2942]">
        {label}
        {required && <span className="text-[#e07a9e] ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="
          w-full px-4 py-3 rounded-xl
          bg-white/60 backdrop-blur-sm
          border-2 border-[#8b7fa8]/20
          text-[#2d2942]
          focus:outline-none focus:border-[#8b7fa8] focus:ring-4 focus:ring-[#8b7fa8]/10
          transition-all duration-200
          cursor-pointer
        "
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Radio component
interface FormRadioProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

function FormRadio({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: FormRadioProps) {
  return (
    <div className="space-y-3">
      <label className="block text-[#2d2942]">
        {label}
        {required && <span className="text-[#e07a9e] ml-1">*</span>}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="
                  w-5 h-5 cursor-pointer
                  text-[#8b7fa8] 
                  border-2 border-[#8b7fa8]/30
                  focus:ring-4 focus:ring-[#8b7fa8]/10
                  transition-all duration-200
                "
              />
            </div>
            <span className="text-[#2d2942] group-hover:text-[#8b7fa8] transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Slider component
interface FormSliderProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  description?: string;
}

function FormSlider({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step,
  description,
}: FormSliderProps) {
  const labels = ["Low", "Medium", "High"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-[#2d2942]">
          {label}
        </label>
        <span className="text-2xl text-[#8b7fa8] px-4 py-1 bg-[#8b7fa8]/10 rounded-xl">
          {value}
        </span>
      </div>
      {description && (
        <p className="text-sm text-[#6d6880]">{description}</p>
      )}
      <div className="pt-2">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full h-2 bg-[#8b7fa8]/20 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-gradient-to-r
            [&::-webkit-slider-thumb]:from-[#8b7fa8]
            [&::-webkit-slider-thumb]:to-[#b8aed4]
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-[#8b7fa8]/30
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-gradient-to-r
            [&::-moz-range-thumb]:from-[#8b7fa8]
            [&::-moz-range-thumb]:to-[#b8aed4]
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:shadow-[#8b7fa8]/30
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
          "
        />
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className={`text-xs ${
                value === index + 1 ? "text-[#8b7fa8]" : "text-[#6d6880]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
