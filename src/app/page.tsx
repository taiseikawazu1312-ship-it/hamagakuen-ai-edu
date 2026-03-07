"use client";

import { BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)] mb-6">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
          浜学園 AI教育プラットフォーム
        </h1>
        <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">
          AIを活用した成績分析と学習サポートで、生徒一人ひとりの学力向上を実現します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* System 1 */}
        <Link href="/dashboard" className="block">
          <div className="card card-hover cursor-pointer h-full transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-[var(--primary)] bg-[var(--accent)] px-2 py-0.5 rounded-full">
                    System 1
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  成績分析AI Dashboard
                </h2>
                <p className="text-sm text-[var(--muted)] mb-4">
                  過年度データの比較分析、学力成長の評価、AI要因分析、施策提案を行う教師・管理者向けダッシュボード。
                </p>
                <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                  ダッシュボードを開く
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* System 2 */}
        <Link href="/student" className="block">
          <div className="card card-hover cursor-pointer h-full transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    System 2
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  AI学習サポート
                </h2>
                <p className="text-sm text-[var(--muted)] mb-4">
                  個別最適化された学習プランの提供、AIチューターによる質問対応、弱点克服ドリルの自動生成。
                </p>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  学習サポートを開く
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <p className="mt-12 text-xs text-[var(--muted)]">
        浜学園 AI教育プラットフォーム v1.0
      </p>
    </div>
  );
}
