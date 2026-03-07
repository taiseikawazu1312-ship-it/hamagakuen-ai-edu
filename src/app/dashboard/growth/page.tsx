"use client";

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

export default function GrowthPage() {
  return (
    <div className="space-y-6">
      {/* Main Content: Chart + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Line Chart */}
        <div className="card lg:col-span-2">
          <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
            学年全体の学力推移
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[20, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="平均点"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="上位層"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 3 }}
                strokeDasharray="4 2"
              />
              <Line
                type="monotone"
                dataKey="下位層"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ r: 3 }}
                strokeDasharray="4 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Summary Cards */}
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                成長サマリー
              </h3>
            </div>

            {/* Growth from enrollment */}
            <div className="mb-4 p-3 bg-[var(--accent)] rounded-lg">
              <p className="text-xs text-[var(--muted)] mb-1">
                入学時からの伸長
              </p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-[var(--primary)]">
                  +16点
                </span>
                <span className="text-sm text-[var(--primary)] font-medium mb-0.5">
                  +30.1%
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                50点 → 66点
              </p>
            </div>

            {/* Deviation value */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-[var(--muted)] mb-1">偏差値推移</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-[var(--success)]">
                  +8.3
                </span>
                <ArrowUpRight className="w-5 h-5 text-[var(--success)] mb-0.5" />
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                46.5 → 54.8
              </p>
            </div>

            {/* Warning */}
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--warning)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-800 mb-1">
                    注意点
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    2学期に入り成長が鈍化しています。夏期講習の効果が持続していない可能性があり、復習サイクルの見直しが必要です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intervention Effects */}
      <div className="card">
        <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
          施策効果の測定
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interventionEffects.map((item) => (
            <div
              key={item.period}
              className={`p-4 rounded-lg border ${
                item.positive
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--muted)]">
                  {item.period}
                </span>
                {item.positive ? (
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                ) : (
                  <XCircle className="w-5 h-5 text-[var(--danger)]" />
                )}
              </div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-2">
                {item.intervention}
              </p>
              <span
                className={`text-xl font-bold ${
                  item.positive
                    ? "text-[var(--success)]"
                    : "text-[var(--danger)]"
                }`}
              >
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
