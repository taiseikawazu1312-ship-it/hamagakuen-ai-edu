"use client";

import { useState, useEffect } from "react";
import { Brain, Loader2 } from "lucide-react";

interface AnalyzingLoaderProps {
  steps: string[];
  duration?: number;
  onComplete: () => void;
}

export default function AnalyzingLoader({
  steps,
  duration = 2500,
  onComplete,
}: AnalyzingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = duration / steps.length;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);
    return () => clearInterval(timer);
  }, [steps.length, duration, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Brain className="w-8 h-8 text-[var(--primary)] animate-pulse" />
        </div>
        <Loader2 className="absolute -top-1 -right-1 w-5 h-5 text-[var(--primary)] animate-spin" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-base font-semibold text-[var(--foreground)]">
          AI分析中...
        </p>
        <p className="text-sm text-[var(--muted)] transition-all duration-300">
          {steps[currentStep]}
        </p>
      </div>
      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
