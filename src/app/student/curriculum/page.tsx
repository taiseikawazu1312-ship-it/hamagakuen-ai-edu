"use client";

import { useState } from "react";
import { GraduationCap, Target, CalendarDays, CheckCircle2, Circle, Clock } from "lucide-react";
import { studentProfile, subjectGaps, subjectBarColors } from "@/lib/student-data";
import { curriculum } from "@/lib/curriculum-data";
import { getStudentLearning } from "@/lib/student-learning-data";

const subjects = curriculum.map(s => ({ id: s.subjectId, name: s.subjectName, color: s.color }));

export default function CurriculumPage() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const learningProfile = getStudentLearning("s009");
  const progress = learningProfile?.curriculumProgress || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">カリキュラム</h2>
        <p className="text-sm text-gray-500 mt-1">志望校と現在の実力に基づいた学習計画と進捗を確認できます</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500">志望校</span>
          </div>
          <p className="text-base font-bold text-gray-900">{studentProfile.targetSchool}</p>
          <p className="text-xs text-gray-600">{studentProfile.targetDepartment} ・ {studentProfile.entranceMethod}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Target className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500">目標偏差値</span>
          </div>
          <p className="text-base font-bold text-gray-900">{studentProfile.targetDeviation}</p>
          <p className="text-xs text-gray-600">現在 {studentProfile.currentDeviation}　あと <span className="text-emerald-600 font-medium">{(studentProfile.targetDeviation - studentProfile.currentDeviation).toFixed(1)}</span></p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <CalendarDays className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500">受験まで</span>
          </div>
          <p className="text-base font-bold text-gray-900">{studentProfile.daysUntilExam}日</p>
          <p className="text-xs text-gray-600">計画的に進めましょう</p>
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4">科目別ギャップ分析</h3>
        <div className="space-y-3">
          {subjectGaps.map(item => {
            const maxVal = Math.max(...subjectGaps.map(s => s.current)) + 5;
            const barWidth = (item.current / maxVal) * 100;
            return (
              <div key={item.subject} className="flex items-center gap-3">
                <div className="w-10 text-xs font-medium text-gray-700 text-right">{item.subject}</div>
                <div className="flex-1">
                  <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${barWidth}%`, backgroundColor: subjectBarColors[item.subject] || "#10B981" }} />
                  </div>
                </div>
                <div className="w-12 text-xs font-medium text-gray-900 text-right">{item.current}</div>
                <div className={`w-12 text-xs font-bold text-right ${item.gap > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {item.gap > 0 ? "+" : ""}{item.gap}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Tabs for Curriculum Progress */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3">科目別カリキュラム進捗</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
          {subjects.map(sub => {
            const cp = progress.find(p => p.subjectId === sub.id);
            return (
              <button key={sub.id} onClick={() => setActiveSubject(activeSubject === sub.id ? null : sub.id)}
                className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                  activeSubject === sub.id ? "text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
                style={activeSubject === sub.id ? { backgroundColor: sub.color } : {}}>
                {sub.name}
                {cp && <span className={`ml-1.5 text-xs ${activeSubject === sub.id ? "text-white/70" : "text-gray-400"}`}>{cp.progressPercent}%</span>}
              </button>
            );
          })}
        </div>

        {/* Overall progress bars (when no subject selected) */}
        {!activeSubject && (
          <div className="space-y-4">
            {progress.map(cp => {
              const color = cp.progressPercent >= 70 ? "#10b981" : cp.progressPercent >= 40 ? "#f59e0b" : "#ef4444";
              return (
                <div key={cp.subjectId} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900">{cp.subjectName}</span>
                    <span className="text-xs text-gray-500">{cp.completedUnits}/{cp.totalUnits}単元 ({cp.progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cp.progressPercent}%`, backgroundColor: color }} />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {cp.sections.map(sec => (
                      <span key={sec.sectionName} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        sec.status === "completed" ? "bg-emerald-50 text-emerald-600" : sec.status === "in_progress" ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"
                      }`}>{sec.sectionName}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed section/unit view */}
        {activeSubject && (() => {
          const cp = progress.find(p => p.subjectId === activeSubject);
          const subjectCurriculum = curriculum.find(c => c.subjectId === activeSubject);
          if (!cp || !subjectCurriculum) return null;
          const color = subjectCurriculum.color;

          return (
            <div className="space-y-3">
              {/* Subject summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold" style={{ color }}>{cp.subjectName}</span>
                  <span className="text-xs text-gray-500">{cp.completedUnits}/{cp.totalUnits}単元完了</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cp.progressPercent}%`, backgroundColor: color }} />
                </div>
              </div>

              {/* Sections */}
              {subjectCurriculum.sections.map(section => {
                const sectionProgress = cp.sections.find(s => s.sectionName === section.name);
                const completed = sectionProgress?.completedUnits || 0;
                const total = section.units.length;
                return (
                  <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {sectionProgress?.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : sectionProgress?.status === "in_progress" ? (
                          <Clock className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className="text-sm font-semibold text-gray-900">{section.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{completed}/{total}</span>
                    </div>
                    <div className="px-4 pb-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {section.units.map((unit, ui) => {
                          const isDone = ui < completed;
                          const isCurrent = ui === completed && sectionProgress?.status === "in_progress";
                          return (
                            <div key={unit.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                              isDone ? "bg-emerald-50 text-emerald-700" : isCurrent ? "bg-amber-50 text-amber-700 font-medium" : "bg-gray-50 text-gray-400"
                            }`}>
                              {isDone ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> : isCurrent ? <Clock className="w-3.5 h-3.5 flex-shrink-0" /> : <Circle className="w-3.5 h-3.5 flex-shrink-0" />}
                              <span className="truncate">{unit.name}</span>
                              {unit.examFrequency === "high" && <span className="ml-auto text-[9px] px-1 py-0.5 rounded bg-red-50 text-red-500 flex-shrink-0">頻出</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
