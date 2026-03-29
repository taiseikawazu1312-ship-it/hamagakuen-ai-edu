"use client";

import { useState, useCallback } from "react";
import {
  AlertTriangle, CheckCircle2, Brain, Lightbulb, Target, Zap, Gauge,
} from "lucide-react";
import { aiFactors, aiSummary, aiProposalSummary, proposals } from "@/lib/demo-data";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";
import TypewriterText from "@/components/TypewriterText";

function highlightText(text: string) {
  const parts = text.split(/(【[^】]+】)/g);
  return parts.map((part, i) => {
    if (part.startsWith("【") && part.endsWith("】")) {
      const inner = part.slice(1, -1);
      if (inner.includes("低下") || inner.includes("下回") || inner.includes("低迷") || inner.includes("課題") || inner.includes("二極化") || inner.includes("最優先")) {
        return <span key={i} className="highlight-negative">{inner}</span>;
      } else if (inner.includes("維持") || inner.includes("成長") || inner.includes("間違っていません")) {
        return <span key={i} className="highlight-positive">{inner}</span>;
      }
      return <span key={i} className="highlight-info">{inner}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

const loadingSteps = [
  "過去年度のデータを照合中...",
  "成績変動パターンを解析中...",
  "ネガティブ要因を抽出中...",
  "ポジティブ要因を特定中...",
  "施策パターンを検索中...",
  "AI総合診断を生成中...",
];

export default function AnalysisPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"factors" | "proposals">("factors");
  const [showSummary, setShowSummary] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowSummary(true), 800);
  }, []);

  if (isLoading) {
    return <AnalyzingLoader steps={loadingSteps} duration={3000} onComplete={handleLoadComplete} />;
  }

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[var(--primary)]" />
            <h2 className="text-lg font-bold text-[var(--foreground)]">AI分析</h2>
          </div>
          <div className="flex gap-1 bg-white border border-[var(--border)] rounded-xl p-1">
            <button
              onClick={() => setActiveTab("factors")}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "factors" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:bg-[var(--background)]"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              要因分析
            </button>
            <button
              onClick={() => setActiveTab("proposals")}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "proposals" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:bg-[var(--background)]"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              施策提案
            </button>
          </div>
        </div>
      </FadeIn>

      {/* === 要因分析タブ === */}
      {activeTab === "factors" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0}>
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[var(--danger)]" />
                  <h3 className="text-base font-bold text-[var(--foreground)]">成績下降の主要因</h3>
                </div>
                <div className="space-y-4">
                  {aiFactors.negative.map((factor, idx) => (
                    <FadeIn key={factor.id} delay={idx * 150} direction="left">
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

            <FadeIn delay={200}>
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                  <h3 className="text-base font-bold text-[var(--foreground)]">良好な傾向・維持されている点</h3>
                </div>
                <div className="space-y-4">
                  {aiFactors.positive.map((factor, idx) => (
                    <FadeIn key={factor.id} delay={idx * 150 + 400} direction="right">
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

          {showSummary && (
            <FadeIn delay={0}>
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-[var(--primary)]" />
                  <h3 className="text-base font-bold text-[var(--foreground)]">AI総合診断</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">AI Generated</span>
                </div>
                <div className="p-4 bg-[var(--accent)] rounded-lg border border-blue-100">
                  <div className="text-sm text-[var(--foreground)] leading-relaxed space-y-3">
                    <TypewriterText
                      text={aiSummary}
                      speed={15}
                      renderText={(visibleText) => (
                        <>{visibleText.split("\n\n").map((paragraph, i) => (<p key={i}>{highlightText(paragraph)}</p>))}</>
                      )}
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </>
      )}

      {/* === 施策提案タブ === */}
      {activeTab === "proposals" && (
        <>
          {/* 要因サマリー（コンパクト版） */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FadeIn delay={0}>
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--danger)]" />
                  <h3 className="text-sm font-bold text-[var(--foreground)]">成績下降の主要因</h3>
                </div>
                <div className="space-y-2">
                  {aiFactors.negative.map((factor) => (
                    <div key={factor.id} className="flex items-start gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">{factor.id}</span>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-[var(--foreground)]">{factor.title}</h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${factor.severity === "高" ? "badge-high" : "badge-medium"}`}>{factor.severity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                  <h3 className="text-sm font-bold text-[var(--foreground)]">維持されている点</h3>
                </div>
                <div className="space-y-2">
                  {aiFactors.positive.map((factor) => (
                    <div key={factor.id} className="flex items-start gap-2 p-2 rounded-lg border border-green-200 bg-green-50">
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                      <h4 className="text-xs font-semibold text-[var(--foreground)]">{factor.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* AI施策診断 */}
          <FadeIn delay={200}>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-base font-bold text-[var(--foreground)]">AI施策診断</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">AI Generated</span>
              </div>
              <div className="p-4 bg-[var(--accent)] rounded-lg border border-blue-100">
                <div className="text-sm text-[var(--foreground)] leading-relaxed space-y-3">
                  <TypewriterText
                    text={aiProposalSummary}
                    speed={15}
                    renderText={(visibleText) => (
                      <>{visibleText.split("\n\n").map((paragraph, i) => (<p key={i}>{highlightText(paragraph)}</p>))}</>
                    )}
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 施策カード */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-lg font-bold text-[var(--foreground)]">施策提案</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {proposals.map((proposal, index) => (
                <FadeIn key={proposal.id} delay={300 + index * 150}>
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                        <span className="text-lg font-bold text-[var(--primary)]">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-[var(--foreground)] mb-2">{proposal.title}</h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{proposal.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Target className="w-3.5 h-3.5 text-[var(--primary)]" />
                            <span className="text-[var(--muted)]">対象:</span>
                            <span className="font-medium text-[var(--foreground)]">{proposal.target}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Zap className="w-3.5 h-3.5 text-[var(--warning)]" />
                            <span className="text-[var(--muted)]">期待効果:</span>
                            <span className="font-medium text-[var(--foreground)]">{proposal.expectedImpact}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Gauge className="w-3.5 h-3.5 text-[var(--muted)]" />
                            <span className="text-[var(--muted)]">工数:</span>
                            <span className={`font-medium px-1.5 py-0.5 rounded text-xs ${proposal.effort === "高" ? "badge-high" : proposal.effort === "中" ? "badge-medium" : "badge-low"}`}>
                              {proposal.effort}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
