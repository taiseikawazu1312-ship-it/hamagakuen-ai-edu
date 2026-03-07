"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Brain,
  Lightbulb,
  Target,
  Zap,
  Gauge,
} from "lucide-react";
import { aiFactors, aiProposalSummary, proposals } from "@/lib/demo-data";

function highlightText(text: string) {
  const parts = text.split(/(【[^】]+】)/g);
  return parts.map((part, i) => {
    if (part.startsWith("【") && part.endsWith("】")) {
      const inner = part.slice(1, -1);
      if (inner.includes("最優先")) {
        return (
          <span key={i} className="highlight-negative">
            {inner}
          </span>
        );
      } else if (inner.includes("次点")) {
        return (
          <span key={i} className="highlight-info">
            {inner}
          </span>
        );
      }
      return (
        <span key={i} className="highlight-info">
          {inner}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      {/* Factors Grid (same as analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Negative Factors */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-[var(--danger)]" />
            <h3 className="text-base font-bold text-[var(--foreground)]">
              成績下降の主要因
            </h3>
          </div>
          <div className="space-y-3">
            {aiFactors.negative.map((factor) => (
              <div
                key={factor.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--background)]"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                  {factor.id}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">
                      {factor.title}
                    </h4>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        factor.severity === "高"
                          ? "badge-high"
                          : "badge-medium"
                      }`}
                    >
                      {factor.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Positive Factors */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
            <h3 className="text-base font-bold text-[var(--foreground)]">
              維持されている点
            </h3>
          </div>
          <div className="space-y-3">
            {aiFactors.positive.map((factor) => (
              <div
                key={factor.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-green-200 bg-green-50"
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {factor.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary for Proposals */}
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
            {aiProposalSummary.split("\n\n").map((paragraph, i) => (
              <p key={i}>{highlightText(paragraph)}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Proposals */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="text-lg font-bold text-[var(--foreground)]">
            施策提案
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {proposals.map((proposal, index) => (
            <div key={proposal.id} className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-lg font-bold text-[var(--primary)]">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[var(--foreground)] mb-2">
                    {proposal.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                    {proposal.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Target className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span className="text-[var(--muted)]">対象:</span>
                      <span className="font-medium text-[var(--foreground)]">
                        {proposal.target}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Zap className="w-3.5 h-3.5 text-[var(--warning)]" />
                      <span className="text-[var(--muted)]">期待効果:</span>
                      <span className="font-medium text-[var(--foreground)]">
                        {proposal.expectedImpact}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Gauge className="w-3.5 h-3.5 text-[var(--muted)]" />
                      <span className="text-[var(--muted)]">工数:</span>
                      <span
                        className={`font-medium px-1.5 py-0.5 rounded text-xs ${
                          proposal.effort === "高"
                            ? "badge-high"
                            : proposal.effort === "中"
                            ? "badge-medium"
                            : "badge-low"
                        }`}
                      >
                        {proposal.effort}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
