"use client";

import { useState, useCallback, use } from "react";
import Link from "next/link";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft, Brain, TrendingUp, TrendingDown, Minus, Target, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { studentsList, getExamHistory, getUnitScores, getStudentTrend } from "@/lib/students-data";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import TypewriterText from "@/components/TypewriterText";

const loadingSteps = [
  "生徒データを読み込み中...",
  "模試成績を時系列で分析中...",
  "単元別の弱点を特定中...",
  "AI所見を生成中...",
];

const chartColors: Record<string, string> = {
  算数: "#8B5CF6", 国語: "#F97316", 理科: "#14B8A6", 社会: "#EC4899", total: "#2563eb",
};

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"exams" | "units" | "trend">("exams");
  const [unitSubject, setUnitSubject] = useState("算数");

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
  const unitScores = getUnitScores(id);
  const trendData = getStudentTrend(id);
  const gapToTarget = student.targetDeviation - student.deviation;
  const subjects = [...new Set(unitScores.map((u) => u.subject))];

  if (isLoading) {
    return <AnalyzingLoader steps={loadingSteps} duration={2500} onComplete={handleLoadComplete} />;
  }

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <FadeIn>
        <Link href="/dashboard/students" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />生徒一覧に戻る
        </Link>
        <div className="card">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${
              student.trend === "up" ? "bg-emerald-500" : student.trend === "down" ? "bg-red-400" : "bg-gray-400"
            }`}>
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
                  {student.trend === "up" ? <TrendingUp className="w-5 h-5 text-[var(--success)]" /> :
                   student.trend === "down" ? <TrendingDown className="w-5 h-5 text-[var(--danger)]" /> :
                   <Minus className="w-5 h-5 text-[var(--muted)]" />}
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
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              <h3 className="text-sm font-bold text-[var(--foreground)]">強み</h3>
            </div>
            <ul className="space-y-2">
              {student.strengths.map((s, i) => (
                <li key={i} className="text-sm text-[var(--muted)] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--success)] rounded-full mt-1.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[var(--warning)]" />
              <h3 className="text-sm font-bold text-[var(--foreground)]">課題</h3>
            </div>
            <ul className="space-y-2">
              {student.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-[var(--muted)] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--warning)] rounded-full mt-1.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Tab Switcher */}
      <FadeIn delay={300}>
        <div className="flex gap-1 bg-white border border-[var(--border)] rounded-xl p-1 w-fit">
          {([["exams", "模試成績履歴"], ["units", "単元別成績"], ["trend", "偏差値推移"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === key ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:bg-[var(--background)]"}`}>
              {label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Exam History */}
      {activeTab === "exams" && (
        <FadeIn delay={100}>
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">模試成績履歴</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">模試</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">算数</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">国語</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">理科</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">社会</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">合計</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">偏差値</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">順位</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam, ei) => {
                    const prev = ei > 0 ? exams[ei - 1] : null;
                    const devDiff = prev ? exam.overallDeviation - prev.overallDeviation : 0;
                    return (
                      <tr key={exam.examName} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-3 px-3">
                          <div className="font-medium text-xs">{exam.examName}</div>
                          <div className="text-xs text-[var(--muted)]">{exam.date}</div>
                        </td>
                        {exam.subjects.map((sub) => (
                          <td key={sub.name} className="py-3 px-3 text-right">
                            <div className="font-semibold">{sub.score}</div>
                            <div className="text-xs text-[var(--muted)]">{sub.deviation}</div>
                          </td>
                        ))}
                        <td className="py-3 px-3 text-right font-bold">{exam.totalScore}/{exam.totalMaxScore}</td>
                        <td className="py-3 px-3 text-right">
                          <span className="font-bold">{exam.overallDeviation}</span>
                          {prev && (
                            <span className={`text-xs ml-1 ${devDiff > 0 ? "text-[var(--success)]" : devDiff < 0 ? "text-[var(--danger)]" : ""}`}>
                              {devDiff > 0 ? "+" : ""}{devDiff.toFixed(1)}
                            </span>
                          )}
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

      {/* Unit Scores */}
      {activeTab === "units" && (
        <FadeIn delay={100}>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[var(--foreground)]">単元別成績</h3>
              <div className="flex gap-1">
                {subjects.map((sub) => (
                  <button key={sub} onClick={() => setUnitSubject(sub)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${unitSubject === sub ? "bg-[var(--primary)] text-white" : "bg-[var(--background)] text-[var(--muted)]"}`}>
                    {sub}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={unitScores.filter((u) => u.subject === unitSubject)} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <YAxis type="category" dataKey="unit" tick={{ fontSize: 11 }} width={95} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Bar dataKey="score" name="生徒" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={14} animationDuration={1200} />
                <Bar dataKey="classAverage" name="クラス平均" fill="#93c5fd" radius={[0, 4, 4, 0]} barSize={14} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-[var(--muted)]">単元</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-[var(--muted)]">生徒</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-[var(--muted)]">クラス平均</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-[var(--muted)]">差</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-[var(--muted)]">評価</th>
                  </tr>
                </thead>
                <tbody>
                  {unitScores.filter((u) => u.subject === unitSubject).map((u) => {
                    const diff = u.score - u.classAverage;
                    return (
                      <tr key={u.unit} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-2 px-3 font-medium text-xs">{u.unit}</td>
                        <td className="py-2 px-3 text-right font-semibold">{u.score}%</td>
                        <td className="py-2 px-3 text-right text-[var(--muted)]">{u.classAverage}%</td>
                        <td className={`py-2 px-3 text-right font-semibold ${diff > 0 ? "text-[var(--success)]" : diff < -5 ? "text-[var(--danger)]" : ""}`}>
                          {diff > 0 ? "+" : ""}{diff}%
                        </td>
                        <td className="py-2 px-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            u.status === "excellent" ? "bg-blue-50 text-blue-600" :
                            u.status === "good" ? "bg-green-50 text-green-600" :
                            u.status === "warning" ? "bg-amber-50 text-amber-600" :
                            "bg-red-50 text-red-600"
                          }`}>
                            {u.status === "excellent" ? "優秀" : u.status === "good" ? "良好" : u.status === "warning" ? "注意" : "要対策"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Trend Chart */}
      {activeTab === "trend" && (
        <FadeIn delay={100}>
          <div className="card">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">偏差値推移</h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                <YAxis domain={[35, 80]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Line type="monotone" dataKey="total" name="総合" stroke={chartColors.total} strokeWidth={3} dot={{ r: 5 }} animationDuration={1200} />
                <Line type="monotone" dataKey="算数" stroke={chartColors.算数} strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} />
                <Line type="monotone" dataKey="国語" stroke={chartColors.国語} strokeWidth={2} dot={{ r: 3 }} animationDuration={1800} />
                <Line type="monotone" dataKey="理科" stroke={chartColors.理科} strokeWidth={2} dot={{ r: 3 }} animationDuration={2100} />
                <Line type="monotone" dataKey="社会" stroke={chartColors.社会} strokeWidth={2} dot={{ r: 3 }} animationDuration={2400} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 bg-[var(--background)] rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-xs font-semibold text-[var(--foreground)]">目標ライン: {student.targetDeviation}</span>
              </div>
              <p className="text-xs text-[var(--muted)]">
                {gapToTarget <= 0 ? "目標偏差値を達成しています。この調子を維持しましょう。" :
                 gapToTarget <= 3 ? `あと${gapToTarget.toFixed(1)}ポイントで目標到達です。現在のペースで到達可能です。` :
                 `目標まで${gapToTarget.toFixed(1)}ポイントの差があります。重点科目の強化が必要です。`}
              </p>
            </div>
          </div>
        </FadeIn>
      )}

      {/* AI Comment */}
      <FadeIn delay={400}>
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-base font-bold text-[var(--foreground)]">AI所見</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">AI Generated</span>
          </div>
          <div className="p-4 bg-[var(--accent)] rounded-lg border border-blue-100">
            <p className="text-sm text-[var(--foreground)] leading-relaxed">
              <TypewriterText text={student.aiComment} speed={12} />
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
