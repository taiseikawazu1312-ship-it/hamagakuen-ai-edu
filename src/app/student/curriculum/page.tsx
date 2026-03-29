"use client";

import { useState } from "react";
import { GraduationCap, Target, CalendarDays, CheckCircle2, Circle, Clock, TrendingUp, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { studentProfile, subjectGaps, subjectBarColors } from "@/lib/student-data";
import { curriculum } from "@/lib/curriculum-data";
import { getStudentLearning } from "@/lib/student-learning-data";

const subjects = curriculum.map(s => ({ id: s.subjectId, name: s.subjectName, color: s.color }));

// 科目別アドバイス
const subjectAdvice: Record<string, string> = {
  英語: "偏差値72.8で目標を大きく上回っています。この調子を維持しつつ、早稲田の過去問演習に移行しましょう。",
  数学: "目標まであと大きな差があります。微分積分・ベクトルを優先的に強化してください。",
  国語: "目標にあと少し。記述問題の精度を上げることで到達可能です。",
  物理: "最も伸びしろがある科目。力学の基礎からしっかり固め直しましょう。",
  化学: "目標を上回っています。有機化学の構造決定を仕上げればさらに安定します。",
};

export default function CurriculumPage() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const learningProfile = getStudentLearning("s009");
  const progress = learningProfile?.curriculumProgress || [];

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // 全体進捗
  const totalUnits = progress.reduce((s, p) => s + p.totalUnits, 0);
  const totalCompleted = progress.reduce((s, p) => s + p.completedUnits, 0);
  const overallPercent = totalUnits > 0 ? Math.round((totalCompleted / totalUnits) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">カリキュラム</h2>
        <p className="text-sm text-gray-500 mt-1">志望校合格に向けた学習計画と、現在の進捗を確認できます</p>
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
          <div className="flex items-baseline gap-2">
            <p className="text-base font-bold text-gray-900">{studentProfile.currentDeviation}</p>
            <span className="text-gray-400">→</span>
            <p className="text-base font-bold text-emerald-600">{studentProfile.targetDeviation}</p>
          </div>
          <p className="text-xs text-gray-600">あと <span className="text-emerald-600 font-bold">{(studentProfile.targetDeviation - studentProfile.currentDeviation).toFixed(1)}</span> で目標到達</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <CalendarDays className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500">全体の学習進捗</span>
          </div>
          <p className="text-base font-bold text-gray-900">{overallPercent}%</p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${overallPercent}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{totalCompleted}/{totalUnits}単元完了</p>
        </div>
      </div>

      {/* Gap Analysis - Visual */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-bold text-gray-900">科目別 目標との差</h3>
        </div>
        <p className="text-xs text-gray-500 mb-5">目標偏差値に対して、現在どの位置にいるかを確認できます</p>

        <div className="space-y-5">
          {subjectGaps.map(item => {
            const target = item.target;
            const current = item.current;
            const maxScale = 80;
            const currentPct = (current / maxScale) * 100;
            const targetPct = (target / maxScale) * 100;
            const isAhead = item.gap <= 0;
            const color = subjectBarColors[item.subject] || "#10B981";
            const advice = subjectAdvice[item.subject] || "";

            return (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{item.subject}</span>
                    {isAhead ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />目標クリア
                      </span>
                    ) : Math.abs(item.gap) <= 5 ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />あと少し
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium flex items-center gap-0.5">
                        <AlertTriangle className="w-3 h-3" />要強化
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    現在 <span className="font-bold text-gray-900">{current}</span> / 目標 <span className="font-bold">{target}</span>
                  </div>
                </div>

                {/* Bar with target line */}
                <div className="relative h-7 bg-gray-100 rounded-full overflow-visible">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, currentPct)}%`, backgroundColor: color, opacity: 0.85 }} />
                  {/* Target marker */}
                  <div className="absolute top-0 h-full flex items-center" style={{ left: `${targetPct}%` }}>
                    <div className="w-0.5 h-full bg-gray-800 opacity-40" />
                    <div className="absolute -top-4 -translate-x-1/2 text-[9px] text-gray-500 font-medium whitespace-nowrap">目標{target}</div>
                  </div>
                </div>

                {/* Advice */}
                <p className="text-xs text-gray-500 leading-relaxed">{advice}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Progress */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="w-5 h-5 text-gray-700" />
          <h3 className="text-base font-bold text-gray-900">カリキュラム進捗</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">科目をタップすると、セクションごとの詳細な進捗を確認できます</p>

        {/* Subject selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          <button onClick={() => setActiveSubject(null)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
              !activeSubject ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600"
            }`}>全体</button>
          {subjects.map(sub => {
            const cp = progress.find(p => p.subjectId === sub.id);
            const isActive = activeSubject === sub.id;
            return (
              <button key={sub.id} onClick={() => setActiveSubject(isActive ? null : sub.id)}
                className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                  isActive ? "text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600"
                }`}
                style={isActive ? { backgroundColor: sub.color } : {}}>
                {sub.name}
                {cp && <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-gray-400"}`}>{cp.progressPercent}%</span>}
              </button>
            );
          })}
        </div>

        {/* Overall view */}
        {!activeSubject && (
          <div className="space-y-3">
            {progress.map(cp => {
              const sub = subjects.find(s => s.id === cp.subjectId);
              const color = sub?.color || "#10b981";
              const completedSections = cp.sections.filter(s => s.status === "completed").length;
              const totalSections = cp.sections.length;
              return (
                <div key={cp.subjectId} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-sm font-bold text-gray-900">{cp.subjectName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{completedSections}/{totalSections}セクション</span>
                      <span className="text-sm font-bold" style={{ color }}>{cp.progressPercent}%</span>
                    </div>
                  </div>
                  {/* Section step indicators */}
                  <div className="flex gap-1 mb-2">
                    {cp.sections.map(sec => (
                      <div key={sec.sectionName} className="flex-1 h-2 rounded-full" style={{
                        backgroundColor: sec.status === "completed" ? color : sec.status === "in_progress" ? `${color}40` : "#f1f5f9"
                      }} />
                    ))}
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {cp.sections.map(sec => (
                      <span key={sec.sectionName} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        sec.status === "completed" ? "bg-emerald-50 text-emerald-600" : sec.status === "in_progress" ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"
                      }`}>
                        {sec.status === "completed" ? "✓ " : sec.status === "in_progress" ? "● " : ""}{sec.sectionName}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed view */}
        {activeSubject && (() => {
          const cp = progress.find(p => p.subjectId === activeSubject);
          const subjectCurriculum = curriculum.find(c => c.subjectId === activeSubject);
          if (!cp || !subjectCurriculum) return null;
          const color = subjectCurriculum.color;

          return (
            <div className="space-y-3">
              {/* Subject header */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm font-bold" style={{ color }}>{cp.subjectName}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color }}>{cp.progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cp.progressPercent}%`, backgroundColor: color }} />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{cp.completedUnits}単元完了</span>
                  <span>残り{cp.totalUnits - cp.completedUnits}単元</span>
                </div>
              </div>

              {/* Sections with accordion */}
              {subjectCurriculum.sections.map(section => {
                const sectionProgress = cp.sections.find(s => s.sectionName === section.name);
                const completed = sectionProgress?.completedUnits || 0;
                const total = section.units.length;
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                const isExpanded = expandedSections.has(section.id);
                const statusColor = sectionProgress?.status === "completed" ? "text-emerald-500" : sectionProgress?.status === "in_progress" ? "text-amber-500" : "text-gray-300";

                return (
                  <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button onClick={() => toggleSection(section.id)} className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                      {sectionProgress?.status === "completed" ? (
                        <CheckCircle2 className={`w-5 h-5 ${statusColor} flex-shrink-0`} />
                      ) : sectionProgress?.status === "in_progress" ? (
                        <Clock className={`w-5 h-5 ${statusColor} flex-shrink-0`} />
                      ) : (
                        <Circle className={`w-5 h-5 ${statusColor} flex-shrink-0`} />
                      )}
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">{section.name}</span>
                          <span className="text-xs text-gray-500 mr-2">{completed}/{total}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-3 border-t border-gray-100 pt-2">
                        <div className="space-y-1.5">
                          {section.units.map((unit, ui) => {
                            const isDone = ui < completed;
                            const isCurrent = ui === completed && sectionProgress?.status === "in_progress";
                            return (
                              <div key={unit.id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${
                                isDone ? "bg-emerald-50" : isCurrent ? "bg-amber-50 ring-1 ring-amber-200" : "bg-gray-50"
                              }`}>
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                ) : isCurrent ? (
                                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                  </div>
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                )}
                                <span className={`text-sm flex-1 ${isDone ? "text-emerald-700" : isCurrent ? "text-amber-800 font-medium" : "text-gray-400"}`}>
                                  {unit.name}
                                </span>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {unit.examFrequency === "high" && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium">頻出</span>
                                  )}
                                  {isCurrent && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">学習中</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
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
