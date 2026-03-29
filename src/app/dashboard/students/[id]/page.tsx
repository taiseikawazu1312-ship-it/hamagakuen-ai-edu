"use client";

import { useState, useCallback, use } from "react";
import Link from "next/link";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  ArrowLeft, Brain, TrendingUp, TrendingDown, Minus, Target, AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, GraduationCap, Users,
  Flame, Clock, BookOpen, Circle, Plus, ListChecks,
} from "lucide-react";
import { studentsList, getExamHistory, getSectionScores, getStudentTrend } from "@/lib/students-data";
import { getUniversityData } from "@/lib/university-history-data";
import { curriculum } from "@/lib/curriculum-data";
import { getStudentLearning, subjectColorMap, type LearningTask } from "@/lib/student-learning-data";
import { useToast } from "@/components/Toast";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import TypewriterText from "@/components/TypewriterText";

const loadingSteps = [
  "生徒データを読み込み中...",
  "模試成績を時系列で分析中...",
  "単元別の弱点を特定中...",
  "志望校合格者データと照合中...",
  "AI所見を生成中...",
];

const chartColors: Record<string, string> = {
  数学: "#8B5CF6", 国語: "#F97316", 物理: "#14B8A6", 化学: "#EC4899", total: "#2563eb", 英語: "#3B82F6",
};

const judgmentColors: Record<string, string> = {
  A: "bg-blue-500 text-white", B: "bg-green-500 text-white", C: "bg-amber-500 text-white", D: "bg-orange-500 text-white", E: "bg-red-500 text-white",
};

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"exams" | "units" | "trend" | "univ" | "learning" | "tasks">("exams");
  const [unitSubject, setUnitSubject] = useState("math");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [localTasks, setLocalTasks] = useState<LearningTask[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(-1); // -1 = latest
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("数学");
  const [newTaskDuration, setNewTaskDuration] = useState(30);
  const [newTaskPriority, setNewTaskPriority] = useState<"高" | "中" | "低">("中");
  const { showToast } = useToast();

  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  const student = studentsList.find((s) => s.id === id);
  if (!student) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--muted)]">生徒が見つかりません</p>
        <Link href="/dashboard/students" className="text-[var(--primary)] text-sm mt-2 inline-block">← 生徒一覧に戻る</Link>
      </div>
    );
  }

  const exams = getExamHistory(id);
  const sectionScores = getSectionScores(id);
  const trendData = getStudentTrend(id);
  const univData = getUniversityData(student.targetSchool);
  const learningProfile = getStudentLearning(id);
  const gapToTarget = student.targetDeviation - student.deviation;
  const subjectList = curriculum.map(s => ({ id: s.subjectId, name: s.subjectName }));

  // タスク管理: 選択中の週のタスク + ローカル追加分
  const weekSets = learningProfile?.weeklyTaskSets || [];
  const currentWeekIdx = selectedWeek < 0 ? weekSets.length - 1 : selectedWeek;
  const currentWeek = weekSets[currentWeekIdx];
  const allTasks = [...(currentWeek?.tasks || []), ...(currentWeekIdx === weekSets.length - 1 ? localTasks : [])];
  const completedTasks = allTasks.filter(t => t.completed).length;

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const task: LearningTask = {
      id: `new-${Date.now()}`,
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      duration: newTaskDuration,
      priority: newTaskPriority,
      completed: false,
      assignedBy: "teacher",
      assignedDate: new Date().toISOString().split("T")[0],
    };
    setLocalTasks(prev => [...prev, task]);
    setNewTaskTitle("");
    showToast(`タスク「${task.title}」を${student.name}に追加しました`);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  };

  if (isLoading) return <AnalyzingLoader steps={loadingSteps} duration={2500} onComplete={handleLoadComplete} />;

  const filteredSections = sectionScores.filter(s => s.subjectId === unitSubject);

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <FadeIn>
        <Link href="/dashboard/students" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />生徒一覧に戻る
        </Link>
        <div className="card">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${student.trend === "up" ? "bg-emerald-500" : student.trend === "down" ? "bg-red-400" : "bg-gray-400"}`}>
              {student.avatarInitial}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-[var(--foreground)]">{student.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">{student.class}</span>
                <span className="text-xs text-[var(--muted)]">{student.grade}</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-3">志望校: {student.targetSchool} | {student.entranceMethod}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[var(--background)] rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]"><CountUp end={student.deviation} decimals={1} duration={1000} /></p>
                  <p className="text-xs text-[var(--muted)]">現在偏差値</p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">{student.targetDeviation}</p>
                  <p className="text-xs text-[var(--muted)]">目標偏差値</p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3 text-center">
                  <p className={`text-lg font-bold ${gapToTarget > 3 ? 'text-[var(--danger)]' : gapToTarget > 0 ? 'text-[var(--warning)]' : 'text-[var(--success)]'}`}>
                    {gapToTarget > 0 ? '+' : ''}{gapToTarget.toFixed(1)}
                  </p>
                  <p className="text-xs text-[var(--muted)]">目標との差</p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3 text-center flex items-center justify-center gap-1.5">
                  {student.trend === "up" ? <TrendingUp className="w-5 h-5 text-[var(--success)]" /> : student.trend === "down" ? <TrendingDown className="w-5 h-5 text-[var(--danger)]" /> : <Minus className="w-5 h-5 text-[var(--muted)]" />}
                  <p className={`text-sm font-bold ${student.trend === "up" ? "text-[var(--success)]" : student.trend === "down" ? "text-[var(--danger)]" : ""}`}>
                    {student.trend === "up" ? "上昇傾向" : student.trend === "down" ? "低下傾向" : "横ばい"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FadeIn delay={100}>
          <div className="card">
            <div className="flex items-center gap-2 mb-3"><CheckCircle2 className="w-4 h-4 text-[var(--success)]" /><h3 className="text-sm font-bold">強み</h3></div>
            <ul className="space-y-2">{student.strengths.map((s, i) => (<li key={i} className="text-sm text-[var(--muted)] flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[var(--success)] rounded-full mt-1.5 flex-shrink-0" />{s}</li>))}</ul>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="card">
            <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-[var(--warning)]" /><h3 className="text-sm font-bold">課題</h3></div>
            <ul className="space-y-2">{student.weaknesses.map((w, i) => (<li key={i} className="text-sm text-[var(--muted)] flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[var(--warning)] rounded-full mt-1.5 flex-shrink-0" />{w}</li>))}</ul>
          </div>
        </FadeIn>
      </div>

      {/* Tab Switcher */}
      <FadeIn delay={300}>
        <div className="flex gap-1 bg-white border border-[var(--border)] rounded-xl p-1 w-fit overflow-x-auto">
          {([["learning", "学習状況"], ["tasks", "タスク管理"], ["exams", "模試成績"], ["units", "単元別成績"], ["trend", "偏差値推移"], ["univ", "合格者比較"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === key ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:bg-[var(--background)]"}`}>
              {label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* === Exam History === */}
      {activeTab === "exams" && (
        <FadeIn delay={100}>
          <div className="card">
            <h3 className="text-base font-bold mb-4">模試成績履歴</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">模試</th>
                  <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">数学</th>
                  <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">国語</th>
                  <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">物理</th>
                  <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">化学</th>
                  <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">総合偏差値</th>
                  <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">順位</th>
                </tr></thead>
                <tbody>
                  {exams.map((exam, ei) => {
                    const prev = ei > 0 ? exams[ei - 1] : null;
                    const devDiff = prev ? exam.overallDeviation - prev.overallDeviation : 0;
                    return (
                      <tr key={exam.examName + ei} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${exam.provider === "駿台" ? "bg-sky-50 text-sky-600" : "bg-amber-50 text-amber-600"}`}>{exam.provider}</span>
                            <span className="font-medium text-xs">{exam.examName.replace(/第\d回\s/, '')}</span>
                          </div>
                          <div className="text-xs text-[var(--muted)]">{exam.date}月実施</div>
                        </td>
                        {exam.subjects.map((sub) => (
                          <td key={sub.name} className="py-3 px-3 text-right">
                            <div className="font-semibold">{sub.deviation}</div>
                            <div className="text-xs text-[var(--muted)]">{sub.score}/{sub.maxScore}点</div>
                          </td>
                        ))}
                        <td className="py-3 px-3 text-right">
                          <span className="font-bold text-base">{exam.overallDeviation}</span>
                          {prev && <span className={`text-xs ml-1 ${devDiff > 0 ? "text-[var(--success)]" : devDiff < 0 ? "text-[var(--danger)]" : ""}`}>{devDiff > 0 ? "+" : ""}{devDiff.toFixed(1)}</span>}
                        </td>
                        <td className="py-3 px-3 text-right text-xs text-[var(--muted)]">{exam.rank}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      )}

      {/* === Unit Scores (Section-based) === */}
      {activeTab === "units" && (
        <FadeIn delay={100}>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold">単元別成績（セクション集約）</h3>
              <div className="flex gap-1">
                {subjectList.map(sub => (
                  <button key={sub.id} onClick={() => { setUnitSubject(sub.id); setExpandedSections(new Set()); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${unitSubject === sub.id ? "bg-[var(--primary)] text-white" : "bg-[var(--background)] text-[var(--muted)]"}`}>
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Section bar chart */}
            <ResponsiveContainer width="100%" height={Math.max(200, filteredSections.length * 38 + 40)}>
              <BarChart data={filteredSections} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <YAxis type="category" dataKey="sectionName" tick={{ fontSize: 11 }} width={115} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Bar dataKey="avgScore" name="生徒" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={12} animationDuration={1200} />
                <Bar dataKey="classAverage" name="クラス平均" fill="#93c5fd" radius={[0, 4, 4, 0]} barSize={12} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>

            {/* Expandable section/unit table */}
            <div className="mt-4 space-y-1">
              {filteredSections.map(section => (
                <div key={section.sectionId} className="border border-[var(--border)] rounded-lg overflow-hidden">
                  <button onClick={() => toggleSection(section.sectionId)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-[var(--background)] hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      {expandedSections.has(section.sectionId) ? <ChevronDown className="w-4 h-4 text-[var(--muted)]" /> : <ChevronRight className="w-4 h-4 text-[var(--muted)]" />}
                      <span className="text-sm font-semibold">{section.sectionName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${section.status === "excellent" ? "bg-blue-50 text-blue-600" : section.status === "good" ? "bg-green-50 text-green-600" : section.status === "warning" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>
                        {section.avgScore}%
                      </span>
                    </div>
                    <span className="text-xs text-[var(--muted)]">{section.units.length}単元</span>
                  </button>
                  {expandedSections.has(section.sectionId) && (
                    <div className="border-t border-[var(--border)]">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-[var(--border)] bg-white">
                          <th className="text-left py-2 px-4 font-semibold text-[var(--muted)]">単元</th>
                          <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">生徒</th>
                          <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">平均</th>
                          <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">差</th>
                          <th className="text-left py-2 px-3 font-semibold text-[var(--muted)]">評価</th>
                        </tr></thead>
                        <tbody>
                          {section.units.map(u => {
                            const diff = u.score - u.classAverage;
                            const unitName = u.unit.split(" - ")[1] || u.unit;
                            return (
                              <tr key={u.unit} className="border-b border-[var(--border)] last:border-b-0">
                                <td className="py-2 px-4">{unitName}</td>
                                <td className="py-2 px-3 text-right font-semibold">{u.score}%</td>
                                <td className="py-2 px-3 text-right text-[var(--muted)]">{u.classAverage}%</td>
                                <td className={`py-2 px-3 text-right font-semibold ${diff > 0 ? "text-[var(--success)]" : diff < -5 ? "text-[var(--danger)]" : ""}`}>{diff > 0 ? "+" : ""}{diff}%</td>
                                <td className="py-2 px-3">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${u.status === "excellent" ? "bg-blue-50 text-blue-600" : u.status === "good" ? "bg-green-50 text-green-600" : u.status === "warning" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>
                                    {u.status === "excellent" ? "優秀" : u.status === "good" ? "良好" : u.status === "warning" ? "注意" : "要対策"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* === Trend Chart === */}
      {activeTab === "trend" && (
        <FadeIn delay={100}>
          <div className="card">
            <h3 className="text-base font-bold mb-4">偏差値推移</h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                <YAxis domain={[35, 80]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Line type="monotone" dataKey="total" name="総合" stroke={chartColors.total} strokeWidth={3} dot={{ r: 5 }} animationDuration={1200} />
                <Line type="monotone" dataKey="数学" stroke={chartColors.数学} strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} />
                <Line type="monotone" dataKey="国語" stroke={chartColors.国語} strokeWidth={2} dot={{ r: 3 }} animationDuration={1800} />
                <Line type="monotone" dataKey="物理" stroke={chartColors.物理} strokeWidth={2} dot={{ r: 3 }} animationDuration={2100} />
                <Line type="monotone" dataKey="化学" stroke={chartColors.化学} strokeWidth={2} dot={{ r: 3 }} animationDuration={2400} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      )}

      {/* === University Comparison === */}
      {activeTab === "univ" && univData && (
        <div className="space-y-4">
          <FadeIn delay={100}>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-base font-bold">{univData.universityName} 合格者との比較</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">{univData.examType}</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">過去の同校合格者の平均的な偏差値推移と、{student.name}の現在の推移を比較します。</p>

              {/* Trajectory overlay chart */}
              {(() => {
                const mergedData = univData.successProfile.deviationTrajectory.map((dp, i) => ({
                  month: dp.month,
                  合格者平均: dp.overall,
                  [student.name]: trendData[i]?.total ?? null,
                }));
                return (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mergedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis domain={[40, 80]} tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                      <Legend />
                      <Line dataKey="合格者平均" stroke="#16a34a" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 3 }} />
                      <Line dataKey={student.name} stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} connectNulls />
                    </LineChart>
                  </ResponsiveContainer>
                );
              })()}

              <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
                <span>合格ボーダー偏差値: <strong className="text-[var(--foreground)]">{univData.requiredDeviation}</strong></span>
                <span>現在の偏差値: <strong className="text-[var(--foreground)]">{student.deviation}</strong></span>
                <span>差: <strong className={gapToTarget > 0 ? "text-[var(--danger)]" : "text-[var(--success)]"}>{gapToTarget > 0 ? "+" : ""}{gapToTarget.toFixed(1)}</strong></span>
              </div>
            </div>
          </FadeIn>

          {/* Subject targets */}
          <FadeIn delay={200}>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-base font-bold">科目別 合格目標偏差値</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 px-3 font-semibold text-[var(--muted)]">科目</th>
                    <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">目標偏差値</th>
                    <th className="text-center py-2 px-3 font-semibold text-[var(--muted)]">優先度</th>
                    <th className="text-left py-2 px-3 font-semibold text-[var(--muted)]">ポイント</th>
                  </tr></thead>
                  <tbody>
                    {univData.successProfile.subjectTargets.map(t => (
                      <tr key={t.subject} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-2 px-3 font-medium">{t.subject}</td>
                        <td className="py-2 px-3 text-right font-bold">{t.targetDeviation}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.priority === "必須" ? "bg-red-50 text-red-600" : t.priority === "重要" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-600"}`}>{t.priority}</span>
                        </td>
                        <td className="py-2 px-3 text-xs text-[var(--muted)]">{t.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Key Milestones */}
          <FadeIn delay={300}>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                <h3 className="text-base font-bold">マイルストーン</h3>
              </div>
              <div className="space-y-3">
                {univData.successProfile.keyMilestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[var(--background)] rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[var(--primary)]">{m.month}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{m.description}</p>
                      <p className="text-xs text-[var(--muted)]">目標偏差値: {m.targetDeviation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Failure Patterns */}
          <FadeIn delay={400}>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
                <h3 className="text-base font-bold">過去の不合格者に多い失敗パターン</h3>
              </div>
              <div className="space-y-3">
                {univData.failurePatterns.map((fp, i) => (
                  <div key={i} className="p-3 border border-amber-200 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fp.frequency === "very_common" ? "bg-red-100 text-red-600" : fp.frequency === "common" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                        {fp.frequency === "very_common" ? "非常に多い" : fp.frequency === "common" ? "よくある" : "時々ある"}
                      </span>
                      <span className="text-xs text-[var(--muted)]">関連科目: {fp.affectedSubjects.join(", ")}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{fp.description}</p>
                    <p className="text-xs text-amber-700">対策: {fp.preventionAdvice}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Acceptance Rate Trends */}
          <FadeIn delay={500}>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-base font-bold">合格率推移</h3>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 px-3 font-semibold text-[var(--muted)]">年度</th>
                  <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">志願者</th>
                  <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">合格者</th>
                  <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">合格率</th>
                  <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">合格者平均偏差値</th>
                </tr></thead>
                <tbody>
                  {univData.acceptanceRateTrends.map(t => (
                    <tr key={t.year} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="py-2 px-3 font-medium">{t.year}年</td>
                      <td className="py-2 px-3 text-right">{t.applicants.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">{t.accepted.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right font-semibold">{t.rate}%</td>
                      <td className="py-2 px-3 text-right font-bold">{t.averageDeviation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      )}

      {activeTab === "univ" && !univData && (
        <FadeIn delay={100}>
          <div className="card text-center py-12">
            <p className="text-[var(--muted)]">この志望校の過去データはまだ登録されていません</p>
          </div>
        </FadeIn>
      )}

      {/* === 学習状況タブ === */}
      {activeTab === "learning" && learningProfile && (
        <div className="space-y-4">
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
                <div><p className="text-lg font-bold">{completedTasks}/{allTasks.length}</p><p className="text-xs text-[var(--muted)]">タスク完了</p></div>
              </div>
              <div className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Clock className="w-5 h-5 text-blue-500" /></div>
                <div><p className="text-lg font-bold">{learningProfile.weeklyStudyHours}h</p><p className="text-xs text-[var(--muted)]">学習時間 / 目標{learningProfile.weeklyTargetHours}h</p></div>
              </div>
              <div className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center"><Flame className="w-5 h-5 text-orange-500" /></div>
                <div><p className="text-lg font-bold">{learningProfile.streak}日</p><p className="text-xs text-[var(--muted)]">連続学習</p></div>
              </div>
              <div className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-purple-500" /></div>
                <div><p className="text-lg font-bold">{Math.round(learningProfile.comprehensionRadar.reduce((s, r) => s + r.score, 0) / learningProfile.comprehensionRadar.length)}%</p><p className="text-xs text-[var(--muted)]">理解度スコア</p></div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FadeIn delay={200}>
              <div className="card">
                <div className="flex items-center gap-2 mb-4"><BookOpen className="w-5 h-5 text-[var(--primary)]" /><h3 className="text-sm font-bold">週別タスク完了率</h3></div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={learningProfile.weeklyLogs}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                    <Bar dataKey="completionRate" name="完了率" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1200} />
                  </BarChart>
                </ResponsiveContainer>
                {learningProfile.weeklyLogs.some(w => w.completionRate < 70) && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">完了率が70%を下回っている週があります。原因を確認してください。</p>
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="card">
                <div className="flex items-center gap-2 mb-4"><Target className="w-5 h-5 text-[var(--primary)]" /><h3 className="text-sm font-bold">分野別理解度</h3></div>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={learningProfile.comprehensionRadar} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="area" tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                    <Radar name="理解度" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </FadeIn>
          </div>
        </div>
      )}

      {activeTab === "learning" && !learningProfile && (
        <FadeIn delay={100}><div className="card text-center py-12"><p className="text-[var(--muted)]">この生徒の学習データはまだありません</p></div></FadeIn>
      )}

      {/* === タスク管理タブ === */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          {/* 週選択 */}
          <FadeIn delay={50}>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {weekSets.map((ws, i) => (
                <button key={ws.weekNumber} onClick={() => setSelectedWeek(i)}
                  className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${currentWeekIdx === i
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-white text-[var(--muted)] border-[var(--border)] hover:border-[var(--primary-light)]"}`}>
                  <div>{ws.weekLabel}</div>
                  <div className={`text-[10px] mt-0.5 ${currentWeekIdx === i ? "text-white/70" : "text-[var(--muted)]"}`}>
                    完了率 {ws.completionRate}%
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 週サマリー */}
          {currentWeek && (
            <FadeIn delay={100}>
              <div className="grid grid-cols-3 gap-3">
                <div className="card text-center py-3">
                  <p className="text-lg font-bold">{completedTasks}/{allTasks.length}</p>
                  <p className="text-xs text-[var(--muted)]">タスク完了</p>
                </div>
                <div className="card text-center py-3">
                  <p className="text-lg font-bold">{currentWeek.completedMinutes}分</p>
                  <p className="text-xs text-[var(--muted)]">学習時間 / {currentWeek.totalMinutes}分</p>
                </div>
                <div className="card text-center py-3">
                  <p className={`text-lg font-bold ${currentWeek.completionRate >= 80 ? "text-[var(--success)]" : currentWeek.completionRate >= 60 ? "text-[var(--warning)]" : "text-[var(--danger)]"}`}>{currentWeek.completionRate}%</p>
                  <p className="text-xs text-[var(--muted)]">完了率</p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* タスク追加（今週のみ） */}
          {currentWeekIdx === weekSets.length - 1 && (
            <FadeIn delay={150}>
              <div className="card">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-4 h-4 text-[var(--primary)]" />
                  <h3 className="text-xs font-bold">タスクを追加</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">先生から割り当て</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} placeholder="タスク名..."
                    className="flex-1 min-w-[180px] px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                  <select value={newTaskSubject} onChange={e => setNewTaskSubject(e.target.value)}
                    className="px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm">
                    {["数学", "英語", "国語", "物理", "化学"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input type="number" value={newTaskDuration} onChange={e => setNewTaskDuration(Number(e.target.value))} min={5} max={120}
                    className="w-16 px-2 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm" />
                  <span className="text-xs text-[var(--muted)] self-center">分</span>
                  <div className="flex gap-1">
                    {(["高", "中", "低"] as const).map(p => (
                      <button key={p} onClick={() => setNewTaskPriority(p)}
                        className={`px-2 py-1.5 text-[10px] font-medium rounded transition-colors ${newTaskPriority === p ? "bg-[var(--primary)] text-white" : "bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"}`}>{p}</button>
                    ))}
                  </div>
                  <button onClick={addTask} disabled={!newTaskTitle.trim()} className="btn-primary text-xs px-3 py-2 disabled:opacity-50">追加</button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* タスク一覧 */}
          <FadeIn delay={200}>
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-[var(--primary)]" />
                  <h3 className="text-sm font-bold">{currentWeek?.weekLabel || ""} のタスク</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span>{completedTasks}/{allTasks.length}</span>
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${allTasks.length > 0 ? (completedTasks / allTasks.length) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {allTasks.map(task => (
                  <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-[var(--border)]"}`}>
                    {task.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? "text-gray-400 line-through" : ""}`}>{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColorMap[task.subject] || "bg-gray-100 text-gray-700"}`}>{task.subject}</span>
                        <span className="text-xs text-[var(--muted)]">{task.duration}分</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${task.assignedBy === "teacher" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                          {task.assignedBy === "teacher" ? "先生" : "AI"}
                        </span>
                        {task.completedDate && <span className="text-xs text-[var(--muted)]">完了: {task.completedDate}</span>}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${task.priority === "高" ? "bg-red-100 text-red-700" : task.priority === "中" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>{task.priority}</span>
                  </div>
                ))}
                {allTasks.length === 0 && <p className="text-sm text-[var(--muted)] text-center py-8">この週のタスクはありません</p>}
              </div>
            </div>
          </FadeIn>

          {/* カリキュラム全体進捗 */}
          {learningProfile?.curriculumProgress && (
            <FadeIn delay={300}>
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                  <h3 className="text-sm font-bold">カリキュラム全体の進捗</h3>
                </div>
                <div className="space-y-4">
                  {learningProfile.curriculumProgress.map(cp => {
                    const progressColor = cp.progressPercent >= 70 ? "#10b981" : cp.progressPercent >= 40 ? "#f59e0b" : "#ef4444";
                    return (
                      <div key={cp.subjectId}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold">{cp.subjectName}</span>
                          <span className="text-xs text-[var(--muted)]">{cp.completedUnits}/{cp.totalUnits}単元 ({cp.progressPercent}%)</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cp.progressPercent}%`, backgroundColor: progressColor }} />
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {cp.sections.map(sec => (
                            <span key={sec.sectionName} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              sec.status === "completed" ? "bg-emerald-50 text-emerald-600" :
                              sec.status === "in_progress" ? "bg-amber-50 text-amber-600" :
                              "bg-gray-50 text-gray-400"
                            }`}>
                              {sec.sectionName}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      )}

      {/* AI Comment */}
      <FadeIn delay={500}>
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-base font-bold">AI所見</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">AI Generated</span>
          </div>
          <div className="p-4 bg-[var(--accent)] rounded-lg border border-blue-100">
            <p className="text-sm leading-relaxed"><TypewriterText text={student.aiComment + (univData ? `\n\n【志望校情報】${univData.aiAdvice}` : "")} speed={12} /></p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
