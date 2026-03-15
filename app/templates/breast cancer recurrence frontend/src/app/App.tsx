import { usePrediction } from "./hooks/usePrediction";
import { PredictionForm } from "./components/PredictionForm";
import { ResultCard } from "./components/ResultCard";
import { InputSummary } from "./components/InputSummary";
import { Heart } from "lucide-react";

export default function App() {
  const {
    formData,
    updateField,
    result,
    loading,
    error,
    submitPrediction,
    resetForm,
    isFormValid,
  } = usePrediction();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f4d7e3] via-[#d4e5f7] to-[#e8dff5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b7fa8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f4d7e3]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4e5f7]/15 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#8b7fa8]/20">
              <Heart className="w-8 h-8 text-[#e07a9e]" fill="#e07a9e" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-[#2d2942] tracking-tight">
            Breast Cancer Recurrence
            <br />
            Prediction
          </h1>
          <p className="text-lg md:text-xl text-[#6d6880] max-w-2xl mx-auto leading-relaxed">
            Supporting clinical decision-making with AI-powered insights.
            <br />
            <span className="text-base">
              Your health journey matters — we're here to help.
            </span>
          </p>
        </header>

        {/* Input Summary */}
        <InputSummary formData={formData} />

        {/* Prediction Form */}
        <PredictionForm
          formData={formData}
          updateField={updateField}
          onSubmit={submitPrediction}
          onReset={resetForm}
          loading={loading}
          error={error}
          isFormValid={isFormValid}
        />

        {/* Result Card */}
        {result && !loading && (
          <div className="mt-8">
            <ResultCard result={result} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-[#6d6880]">
          <p>
            Designed for research and clinical support.
            <br className="md:hidden" /> Always consult with healthcare
            professionals.
          </p>
        </footer>
      </div>
    </div>
  );
}