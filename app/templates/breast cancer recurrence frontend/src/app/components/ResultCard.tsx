// Result card component for displaying prediction results

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { PredictionResponse } from "../types";
import confetti from "canvas-confetti";

interface ResultCardProps {
  result: PredictionResponse;
}

export function ResultCard({ result }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger confetti on successful prediction
    if (result) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#8b7fa8", "#f4d7e3", "#d4e5f7", "#7bc2a7"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#8b7fa8", "#f4d7e3", "#d4e5f7", "#7bc2a7"],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result]);

  const getResultIcon = () => {
    const prediction = result.prediction?.toLowerCase();
    if (prediction?.includes("no") || prediction?.includes("low")) {
      return <CheckCircle className="w-12 h-12 text-[#7bc2a7]" />;
    } else if (prediction?.includes("yes") || prediction?.includes("high")) {
      return <AlertCircle className="w-12 h-12 text-[#f5c26b]" />;
    }
    return <Info className="w-12 h-12 text-[#8b7fa8]" />;
  };

  const getResultColor = () => {
    const prediction = result.prediction?.toLowerCase();
    if (prediction?.includes("no") || prediction?.includes("low")) {
      return "from-[#7bc2a7]/20 to-[#7bc2a7]/5";
    } else if (prediction?.includes("yes") || prediction?.includes("high")) {
      return "from-[#f5c26b]/20 to-[#f5c26b]/5";
    }
    return "from-[#8b7fa8]/20 to-[#8b7fa8]/5";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className={`
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br ${getResultColor()}
        backdrop-blur-xl
        border border-white/40
        shadow-2xl shadow-[#8b7fa8]/10
        p-8 md:p-10
      `}
      >
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Icon and Title */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-6"
          >
            {getResultIcon()}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-center mb-6 text-[#2d2942]"
          >
            Prediction Result
          </motion.h3>

          {/* Main Prediction */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/60"
          >
            <p className="text-sm uppercase tracking-wider text-[#6d6880] mb-2 text-center">
              Recurrence Prediction
            </p>
            <p className="text-3xl md:text-4xl text-center text-[#2d2942]">
              {result.prediction}
            </p>
          </motion.div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.probability !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/60"
              >
                <p className="text-xs uppercase tracking-wider text-[#6d6880] mb-1">
                  Probability
                </p>
                <p className="text-2xl text-[#2d2942]">
                  {(result.probability * 100).toFixed(1)}%
                </p>
              </motion.div>
            )}

            {result.confidence && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/60"
              >
                <p className="text-xs uppercase tracking-wider text-[#6d6880] mb-1">
                  Confidence
                </p>
                <p className="text-2xl text-[#2d2942]">{result.confidence}</p>
              </motion.div>
            )}

            {result.risk_level && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/60 md:col-span-2"
              >
                <p className="text-xs uppercase tracking-wider text-[#6d6880] mb-1">
                  Risk Level
                </p>
                <p className="text-2xl text-[#2d2942]">{result.risk_level}</p>
              </motion.div>
            )}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-[#6d6880] text-center mt-6 leading-relaxed"
          >
            This prediction is generated by a machine learning model and should
            be used as a supplementary tool. Please consult with healthcare
            professionals for medical decisions.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
