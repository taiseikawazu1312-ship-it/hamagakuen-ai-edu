"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, Target, Lightbulb, Brain, ChevronRight } from "lucide-react";
import { subjectWeaknesses } from "@/lib/weakness-data";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";
import TypewriterText from "@/components/TypewriterText";

const loadingSteps = [
  "過去の模試データを読み込み中...",
  "誤答パターンを分析中...",
  "教科別の特徴を抽出中...",
  "改善プランを生成中...",
];

const freqLabel: Record<string, { text: string; class: string }> = {
  high: { text: "頻出", class: "bg-red-50 text-red-600" },
  medium: { text: "中程度", class: "bg-amber-50 text-amber-600" },
  low: { text: "まれ", class: "bg-green-50 text-green-600" },
};

export default function WeaknessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState(subjectWeaknesses[0].subject);

  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <AnalyzingLoader steps={loadingSteps} duration={3000} onComplete={handleLoadComplete} />
      </div>
    );
  }

  const current = subjectWeaknesses.find((s) => s.subject === activeSubject)!;

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h2 className="text-xl font-bold text-gray-900">弱点・誤答パターン分析</h2>
          <p className="text-sm text-gray-500 mt-1">
            AIがあなたの過去の模試・テストデータを分析し、単元だけでなく「どのような傾向の問題で間違いやすいか」を特定しました。
          </p>
        </div>
      </FadeIn>

      {/* Subject Tabs */}
      <FadeIn delay={100}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {subjectWeaknesses.map((sw) => (
            <button
              key={sw.subject}
              onClick={() => setActiveSubject(sw.subject)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeSubject === sw.subject
                  ? "text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              style={activeSubject === sw.subject ? { backgroundColor: sw.color } : {}}
            >
              <span className={`w-2 h-2 rounded-full ${activeSubject === sw.subject ? "bg-white" : ""}`}
                style={activeSubject !== sw.subject ? { backgroundColor: sw.color } : {}} />
              {sw.subject}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeSubject === sw.subject ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {sw.errorPatterns.length}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* AI Overall Tendency */}
      <FadeIn delay={200} key={activeSubject + "-tendency"}>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5" style={{ color: current.color }} />
            <h3 className="text-sm font-bold text-gray-900">AI分析: {current.subject}の傾向</h3>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: current.color + "15", color: current.color }}>
              AI Generated
            </span>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: current.color + "08", borderLeft: `4px solid ${current.color}` }}>
            <p className="text-sm text-gray-700 leading-relaxed">
              <TypewriterText text={current.overallTendency} speed={12} />
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Error Patterns */}
      <div>
        <FadeIn delay={300}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-gray-700" />
            <h3 className="text-base font-bold text-gray-900">誤答パターン（{current.errorPatterns.length}件検出）</h3>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {current.errorPatterns.map((pattern, i) => {
            const freq = freqLabel[pattern.frequency];
            return (
              <FadeIn key={pattern.id} delay={400 + i * 150}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg text-white" style={{ backgroundColor: current.color }}>
                        {pattern.category}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${freq.class}`}>
                        {freq.text}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{pattern.description}</p>
                  </div>

                  {/* Examples */}
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-2">直近のミス例:</p>
                    <ul className="space-y-1.5">
                      {pattern.recentExamples.map((ex, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advice */}
                  <div className="p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: current.color }} />
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: current.color }}>改善アドバイス</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{pattern.correctionAdvice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Improvement Plan */}
      <FadeIn delay={600}>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5" style={{ color: current.color }} />
            <h3 className="text-sm font-bold text-gray-900">{current.subject}の改善ロードマップ</h3>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            {current.improvementPlan.split("\n").map((line, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed mb-1">
                {line.startsWith("【") ? <strong>{line}</strong> : line}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
