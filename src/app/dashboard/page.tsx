"use client";

import { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown } from "lucide-react";
import {
  yearlyComparison,
  scoreDistribution,
  classComparison,
  unitScores,
} from "@/lib/demo-data";
import CountUp from "@/components/CountUp";
import FadeIn from "@/components/FadeIn";
import AnalyzingLoader from "@/components/AnalyzingLoader";

const statCards = [
  { label: "平均偏差値", value: 51.2, change: "-0.8", negative: true },
  { label: "上位10%", value: 66.8, change: "-0.7", negative: true },
  { label: "中位層", value: 48.6, change: "-1.2", negative: true },
  { label: "下位10%", value: 36.5, change: "-0.9", negative: true },
];

const loadingSteps = [
  "過去4年間のデータを照合中...",
  "年度別・クラス別の傾向を分析中...",
  "得点分布を算出中...",
  "単元別正答率を集計中...",
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <AnalyzingLoader steps={loadingSteps} duration={2800} onComplete={handleLoadComplete} />;
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div data-tour="stat-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 100}>
            <div className="stat-card">
              <p className="text-sm text-[var(--muted)] mb-1">{stat.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-[var(--foreground)]">
                  <CountUp end={stat.value} decimals={1} duration={1000 + i * 200} />
                </span>
                <span className="flex items-center text-sm font-medium text-[var(--danger)] mb-0.5">
                  <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                  {stat.change}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={200}>
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
              過去年度との比較（同時期）
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis domain={[20, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="平均偏差値" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                <Line type="monotone" dataKey="上位10%" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} animationDuration={1800} />
                <Line type="monotone" dataKey="中位" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} animationDuration={2100} />
                <Line type="monotone" dataKey="下位10%" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} animationDuration={2400} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
              偏差値分布の前年比較
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} unit="人" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                />
                <Legend />
                <Bar dataKey="今年度" fill="#2563eb" radius={[4, 4, 0, 0]} animationDuration={1500} />
                <Bar dataKey="前年度" fill="#93c5fd" radius={[4, 4, 0, 0]} animationDuration={1800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={400}>
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
              コース/クラス別比較
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">クラス</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">偏差値</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">前年比</th>
                  </tr>
                </thead>
                <tbody>
                  {classComparison.map((row) => (
                    <tr key={row.class} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="py-3 px-3 font-medium">{row.class}</td>
                      <td className="py-3 px-3 text-right font-semibold">{row.平均偏差値}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`font-medium ${row.前年比 < -3 ? "text-[var(--danger)]" : row.前年比 < 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>
                          {row.前年比 > 0 ? "+" : ""}{row.前年比}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={500}>
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
              単元別正答率
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">単元</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">今年度</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">過去平均</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">差分</th>
                  </tr>
                </thead>
                <tbody>
                  {unitScores.map((row) => (
                    <tr key={row.unit} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="py-3 px-3 font-medium text-xs sm:text-sm">{row.unit}</td>
                      <td className="py-3 px-3 text-right font-semibold">{row.今年度正答率}%</td>
                      <td className="py-3 px-3 text-right text-[var(--muted)]">{row.過去平均正答率}%</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${row.diff <= -8 ? "bg-red-50 text-red-600" : row.diff <= -4 ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-600"}`}>
                          {row.diff > 0 ? "+" : ""}{row.diff}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
