"use client";

import { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { growthData, interventionEffects } from "@/lib/demo-data";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";

const loadingSteps = [
  "月次データを集計中...",
  "成長パターンを分析中...",
  "施策効果を測定中...",
];

export default function GrowthPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <AnalyzingLoader steps={loadingSteps} duration={2200} onComplete={handleLoadComplete} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn delay={0} className="lg:col-span-2">
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
              学年全体の学力推移
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[20, 100]} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                <Legend />
                <Line type="monotone" dataKey="平均点" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                <Line type="monotone" dataKey="上位層" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" animationDuration={1800} />
                <Line type="monotone" dataKey="下位層" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 2" animationDuration={2100} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-sm font-bold text-[var(--foreground)]">成長サマリー</h3>
              </div>
              <div className="mb-4 p-3 bg-[var(--accent)] rounded-lg">
                <p className="text-xs text-[var(--muted)] mb-1">入学時からの伸長</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-[var(--primary)]">
                    +<CountUp end={16} suffix="点" duration={1200} />
                  </span>
                  <span className="text-sm text-[var(--primary)] font-medium mb-0.5">
                    +<CountUp end={30.1} decimals={1} suffix="%" duration={1400} />
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">50点 → 66点</p>
              </div>
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-[var(--muted)] mb-1">偏差値推移</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-[var(--success)]">
                    +<CountUp end={8.3} decimals={1} duration={1200} />
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-[var(--success)] mb-0.5" />
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">46.5 → 54.8</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[var(--warning)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800 mb-1">注意点</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      2学期に入り成長が鈍化しています。夏期講習の効果が持続していない可能性があり、復習サイクルの見直しが必要です。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={400}>
        <div className="card">
          <h3 className="text-base font-bold text-[var(--foreground)] mb-4">施策効果の測定</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interventionEffects.map((item) => (
              <div
                key={item.period}
                className={`p-4 rounded-lg border ${item.positive ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--muted)]">{item.period}</span>
                  {item.positive ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[var(--danger)]" />
                  )}
                </div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">{item.intervention}</p>
                <span className={`text-xl font-bold ${item.positive ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                  {item.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
