"use client";

import { BarChart3, TrendingUp, AlertTriangle, Settings } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { weeklyProgress, comprehensionTrend } from "@/lib/student-data";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">進捗確認</h2>
        <p className="text-sm text-gray-500 mt-1">
          学習の進み具合と理解度の推移を確認しましょう
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Completion Rate */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-gray-900">
              週別学習達成率
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgress} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "達成率"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="rate" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comprehension Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-gray-900">理解度推移</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comprehensionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                domain={[40, 85]}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px" }}
                iconType="circle"
                iconSize={8}
              />
              <Line
                type="monotone"
                dataKey="english"
                name="英語"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="math"
                name="数学"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="japanese"
                name="国語"
                stroke="#F97316"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="physics"
                name="物理"
                stroke="#14B8A6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="chemistry"
                name="化学"
                stroke="#EC4899"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alert Card */}
      <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-yellow-800">
              学習遅れの検知
            </h3>
            <p className="text-sm text-yellow-700 mt-1 leading-relaxed">
              <span className="font-bold">数学IIB（微分積分）</span>
              の学習進捗が予定より
              <span className="font-bold">2日遅れ</span>
              ています。このまま進むと次回模試に影響する可能性があります。計画の調整をおすすめします。
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-medium flex-shrink-0">
            <Settings className="w-4 h-4" />
            計画を調整する
          </button>
        </div>
      </div>
    </div>
  );
}
