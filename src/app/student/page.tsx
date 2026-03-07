"use client";

import {
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  GraduationCap,
  Target,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  studentProfile,
  todaysTasks,
  comprehensionRadar,
  subjectColors,
} from "@/lib/student-data";

export default function StudentHome() {
  const completedCount = todaysTasks.filter((t) => t.completed).length;
  const totalCount = todaysTasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              おはようございます、田中さん！
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                <GraduationCap className="w-4 h-4 inline mr-1" />
                {studentProfile.targetSchool} {studentProfile.targetDepartment}
              </span>
              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                偏差値 {studentProfile.currentDeviation} → 目標{" "}
                {studentProfile.targetDeviation}
              </span>
            </div>
            <p className="text-emerald-100 text-sm">
              受験まであと{studentProfile.daysUntilExam}日 ・ 今日も一歩ずつ前へ
            </p>
          </div>
          {/* Circular Progress */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="white"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPercent / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          label="今日のタスク"
          value={`${completedCount}/${totalCount} 完了`}
          sub={`残り${totalCount - completedCount}タスク`}
          accent="emerald"
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          label="学習時間今週"
          value="18.5h"
          sub="目標 22h"
          accent="blue"
        />
        <StatCard
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          label="連続学習日数"
          value={`${studentProfile.streak}日`}
          sub="お見事！更新中"
          accent="orange"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
          label="理解度スコア"
          value="78%"
          sub="+5% 先週比"
          accent="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-gray-900">
              今日の学習タスク
            </h3>
          </div>
          <div className="space-y-3">
            {todaysTasks.map((task, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  task.completed
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-200 hover:border-emerald-300"
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        subjectColors[task.subject] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.subject}
                    </span>
                    <span className="text-xs text-gray-400">
                      {task.duration}分
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    task.priority === "高"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  重要度{task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehension Radar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-gray-900">分野別理解度</h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={comprehensionRadar} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="area"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <Radar
                name="理解度"
                dataKey="score"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{sub}</p>
    </div>
  );
}
