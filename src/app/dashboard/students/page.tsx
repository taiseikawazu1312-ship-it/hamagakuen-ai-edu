"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Search, TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";
import { studentsList } from "@/lib/students-data";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import FadeIn from "@/components/FadeIn";

const loadingSteps = [
  "生徒データを読み込み中...",
  "最新模試の成績を照合中...",
  "個別の成長傾向を分析中...",
];

const classFilters = ["全クラス", "Sクラス", "Aクラス", "Bクラス", "Cクラス"];
const trendFilters = [
  { label: "全て", value: "all" },
  { label: "上昇", value: "up" },
  { label: "下降", value: "down" },
  { label: "横ばい", value: "flat" },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-[var(--success)]" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-[var(--danger)]" />;
  return <Minus className="w-4 h-4 text-[var(--muted)]" />;
};

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("全クラス");
  const [trendFilter, setTrendFilter] = useState("all");

  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  if (isLoading) {
    return <AnalyzingLoader steps={loadingSteps} duration={2000} onComplete={handleLoadComplete} />;
  }

  const filtered = studentsList.filter((s) => {
    if (search && !s.name.includes(search) && !s.tags.some(t => t.includes(search))) return false;
    if (classFilter !== "全クラス" && s.class !== classFilter) return false;
    if (trendFilter !== "all" && s.trend !== trendFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)]">生徒一覧</h2>
            <p className="text-sm text-[var(--muted)]">全{studentsList.length}名の学習状況を管理</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="生徒名・タグで検索..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={100}>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-1.5">
            {classFilters.map((c) => (
              <button
                key={c}
                onClick={() => setClassFilter(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${classFilter === c ? "bg-[var(--primary)] text-white" : "bg-white border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary-light)]"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {trendFilters.map((t) => (
              <button
                key={t.value}
                onClick={() => setTrendFilter(t.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${trendFilter === t.value ? "bg-[var(--primary)] text-white" : "bg-white border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary-light)]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((student, i) => (
          <FadeIn key={student.id} delay={i * 80}>
            <Link href={`/dashboard/students/${student.id}`}>
              <div className="card card-hover cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                    student.trend === "up" ? "bg-emerald-500" : student.trend === "down" ? "bg-red-400" : "bg-gray-400"
                  }`}>
                    {student.avatarInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[var(--foreground)]">{student.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">{student.class}</span>
                      <span className="text-xs text-[var(--muted)]">{student.grade}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mb-2">志望校: {student.targetSchool}</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[var(--muted)]">偏差値</span>
                        <span className="text-sm font-bold text-[var(--foreground)]">{student.deviation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendIcon trend={student.trend} />
                        <span className={`text-xs font-medium ${student.trend === "up" ? "text-[var(--success)]" : student.trend === "down" ? "text-[var(--danger)]" : "text-[var(--muted)]"}`}>
                          {student.trend === "up" ? "上昇中" : student.trend === "down" ? "低下中" : "横ばい"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[var(--muted)]">目標</span>
                        <span className="text-xs font-semibold">{student.targetDeviation}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {student.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          tag.includes("◎") || tag.includes("成長") || tag.includes("急成長") ? "bg-green-50 text-green-600" :
                          tag.includes("苦手") || tag.includes("低下") || tag.includes("停滞") ? "bg-red-50 text-red-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--muted)] flex-shrink-0 mt-3" />
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-sm">該当する生徒が見つかりません</p>
        </div>
      )}
    </div>
  );
}
