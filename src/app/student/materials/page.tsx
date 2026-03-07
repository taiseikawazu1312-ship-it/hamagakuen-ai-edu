"use client";

import { Library, Star, Sparkles, BookOpen, FileText } from "lucide-react";
import { materials, subjectColors } from "@/lib/student-data";

const typeIcons: Record<string, React.ReactNode> = {
  問題集: <FileText className="w-3.5 h-3.5" />,
  参考書: <BookOpen className="w-3.5 h-3.5" />,
};

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">おすすめ教材</h2>
        <p className="text-sm text-gray-500 mt-1">
          あなたの弱点と志望校に基づいてAIが最適な教材を提案します
        </p>
      </div>

      {/* Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((mat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  subjectColors[mat.subject] || "bg-gray-100 text-gray-700"
                }`}
              >
                {mat.subject}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                {typeIcons[mat.type]}
                {mat.type}
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {mat.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {mat.description}
            </p>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-emerald-600">
                マッチ度 {mat.matchRate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-generate Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">類題自動生成</h3>
            <p className="text-sm text-gray-600 mt-1">
              苦手分野の類似問題をAIが自動で作成します。解いた問題の傾向を分析し、あなたのレベルに合った問題を生成します。
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium flex-shrink-0">
            <Sparkles className="w-4 h-4" />
            類題を生成する
          </button>
        </div>
      </div>
    </div>
  );
}
