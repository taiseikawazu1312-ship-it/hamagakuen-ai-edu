"use client";

import {
  GraduationCap,
  Target,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import {
  studentProfile,
  subjectGaps,
  weeklyPlan,
  subjectColors,
  subjectBarColors,
} from "@/lib/student-data";

export default function CurriculumPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            志望校別カリキュラム
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            あなたの志望校と現在の実力に基づいた学習計画です
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
          <RefreshCw className="w-4 h-4" />
          カリキュラムを再生成
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-emerald-500" />
            <span className="text-sm text-gray-500">志望校</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {studentProfile.targetSchool}
          </p>
          <p className="text-sm text-gray-600">
            {studentProfile.targetDepartment} ・ {studentProfile.entranceMethod}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-emerald-500" />
            <span className="text-sm text-gray-500">合格目標偏差値</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {studentProfile.targetDeviation}
          </p>
          <p className="text-sm text-gray-600">
            現在 {studentProfile.currentDeviation}　あと{" "}
            <span className="text-emerald-600 font-medium">
              {(studentProfile.targetDeviation - studentProfile.currentDeviation).toFixed(1)}
            </span>
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-5 h-5 text-emerald-500" />
            <span className="text-sm text-gray-500">受験まで</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {studentProfile.daysUntilExam}日
          </p>
          <p className="text-sm text-gray-600">計画的に進めましょう</p>
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          科目別ギャップ分析
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          現在の偏差値と合格ラインとの差を科目ごとに表示しています
        </p>
        <div className="space-y-4">
          {subjectGaps.map((item) => {
            const maxVal = Math.max(...subjectGaps.map((s) => s.current)) + 5;
            const barWidth = (item.current / maxVal) * 100;
            return (
              <div key={item.subject} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-700 text-right">
                  {item.subject}
                </div>
                <div className="flex-1">
                  <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor:
                          subjectBarColors[item.subject] || "#10B981",
                      }}
                    />
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  {item.current}
                </div>
                <div
                  className={`w-16 text-sm font-bold text-right ${
                    item.gap > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {item.gap > 0 ? "+" : ""}
                  {item.gap}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 justify-end">
          <span>偏差値</span>
          <span className="text-red-400">マイナス = 目標より上回る必要あり</span>
          <span className="text-emerald-400">プラス = 余裕あり</span>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          今週の学習プラン
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklyPlan.map((day) => (
            <div key={day.day} className="space-y-2">
              <div className="text-center">
                <span className="text-sm font-bold text-gray-700">
                  {day.day}
                </span>
              </div>
              <div className="space-y-1.5">
                {day.subjects.map((sub, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-2 text-center ${
                      subjectColors[sub.name] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <p className="text-xs font-medium leading-tight">
                      {sub.name}
                    </p>
                    <p className="text-xs opacity-75 mt-0.5">{sub.duration}分</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-400">
                  計{day.subjects.reduce((a, b) => a + b.duration, 0)}分
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
