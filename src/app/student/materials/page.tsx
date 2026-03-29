"use client";

import { useState } from "react";
import { Star, BookOpen, FileText } from "lucide-react";
import { materialsBySubject, subjectColors } from "@/lib/student-data";

const subjects = Object.keys(materialsBySubject);

const typeIcons: Record<string, React.ReactNode> = {
  問題集: <FileText className="w-3.5 h-3.5" />,
  参考書: <BookOpen className="w-3.5 h-3.5" />,
  単語帳: <BookOpen className="w-3.5 h-3.5" />,
};

export default function MaterialsPage() {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const currentMaterials = materialsBySubject[activeSubject] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">おすすめ教材</h2>
        <p className="text-sm text-gray-500 mt-1">
          志望校と弱点に基づいてAIが科目ごとに最適な教材を提案します
        </p>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {subjects.map(sub => (
          <button key={sub} onClick={() => setActiveSubject(sub)}
            className={`px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${
              activeSubject === sub
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
            }`}>
            {sub}
            <span className={`ml-1.5 text-xs ${activeSubject === sub ? "text-white/70" : "text-gray-400"}`}>
              {(materialsBySubject[sub] || []).length}
            </span>
          </button>
        ))}
      </div>

      {/* Material Cards */}
      <div className="space-y-4">
        {currentMaterials.map((mat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${subjectColors[mat.subject] || "bg-gray-100 text-gray-700"}`}>
                {mat.subject}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                {typeIcons[mat.type]}{mat.type}
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">{mat.title}</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{mat.description}</p>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-emerald-600">マッチ度 {mat.matchRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
