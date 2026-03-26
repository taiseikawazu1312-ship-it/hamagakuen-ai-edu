"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, CheckCircle2, Brain } from "lucide-react";
import { aiFactors, aiSummary } from "@/lib/demo-data";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";
import TypewriterText from "@/components/TypewriterText";

function highlightText(text: string) {
  const parts = text.split(/(【[^】]+】)/g);
  return parts.map((part, i) => {
    if (part.startsWith("【") && part.endsWith("】")) {
      const inner = part.slice(1, -1);
      if (
        inner.includes("低下") || inner.includes("下回") || inner.includes("低迷") ||
        inner.includes("課題") || inner.includes("二極化")
      ) {
        return <span key={i} className="highlight-negative">{inner}</span>;
      } else if (inner.includes("維持") || inner.includes("成長") || inner.includes("間違っていません")) {
        return <span key={i} className="highlight-positive">{inner}</span>;
      } else {
        return <span key={i} className="highlight-info">{inner}</span>;
      }
    }
    return <span key={i}>{part}</span>;
  });
}

const loadingSteps = [
  "過去年度のデータを照合中...",
  "成績変動パターンを解析中...",
  "ネガティブ要因を抽出中...",
  "ポジティブ要因を特定中...",
  "AI総合診断を生成中...",
];

export default function AnalysisPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    // Show summary after factors appear
    setTimeout(() => setShowSummary(true), 800);
  }, []);

  if (isLoading) {
    return <AnalyzingLoader steps={loadingSteps} duration={3000} onComplete={handleLoadComplete} />;
  }

  return (
    <div className="space-y-6">
      {/* Factors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Negative Factors */}
        <FadeIn delay={0}>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[var(--danger)]" />
              <h3 className="text-base font-bold text-[var(--foreground)]">
                成績下降の主要因
              </h3>
            </div>
            <div className="space-y-4">
              {aiFactors.negative.map((factor, idx) => (
                <FadeIn key={factor.id} delay={idx * 200} direction="left">
                  <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                        {factor.id}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-bold text-[var(--foreground)]">{factor.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${factor.severity === "高" ? "badge-high" : "badge-medium"}`}>
                            重要度: {factor.severity}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">{factor.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Positive Factors */}
        <FadeIn delay={200}>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
              <h3 className="text-base font-bold text-[var(--foreground)]">
                良好な傾向・維持されている点
              </h3>
            </div>
            <div className="space-y-4">
              {aiFactors.positive.map((factor, idx) => (
                <FadeIn key={factor.id} delay={idx * 200 + 400} direction="right">
                  <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--success)] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">{factor.title}</h4>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">{factor.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* AI Summary with Typewriter */}
      {showSummary && (
        <FadeIn delay={0}>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-base font-bold text-[var(--foreground)]">
                AI総合診断
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">
                AI Generated
              </span>
            </div>
            <div className="p-4 bg-[var(--accent)] rounded-lg border border-blue-100">
              <div className="text-sm text-[var(--foreground)] leading-relaxed space-y-3">
                <TypewriterText
                  text={aiSummary}
                  speed={15}
                  renderText={(visibleText) => (
                    <>
                      {visibleText.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{highlightText(paragraph)}</p>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
