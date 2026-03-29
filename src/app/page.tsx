"use client";

import { useState } from "react";
import { BarChart3, GraduationCap, ArrowRight, ArrowLeft, UserCheck } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  const [showTeacherSub, setShowTeacherSub] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          <FadeIn delay={0}>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
              教育AIサポートシステム
            </h1>
            <p className="text-sm text-white/60 mb-3">札幌第一高校様向けデモ</p>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              AIを活用した成績分析・学習管理・個別最適化学習サポート
            </p>
          </FadeIn>
        </div>
      </div>

      {/* System Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        {!showTeacherSub ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <button onClick={() => setShowTeacherSub(true)} className="block w-full text-left">
                <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                      <BarChart3 className="w-7 h-7 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">先生向け画面</h2>
                      <p className="text-sm text-[var(--muted)] mb-4">
                        学年全体の成績分析・個別生徒の学習管理・AI要因分析・施策提案・レポート生成を行う画面。
                      </p>
                      <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                        先生向け画面を開く<ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </FadeIn>

            <FadeIn delay={200}>
              <Link href="/student" className="block">
                <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">生徒向け画面</h2>
                      <p className="text-sm text-[var(--muted)] mb-4">
                        個別最適化された学習プラン・AIチューターによる質問対応・弱点分析・進捗管理を行う画面。
                      </p>
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        生徒向け画面を開く<ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        ) : (
          <div>
            <FadeIn delay={0}>
              <button onClick={() => setShowTeacherSub(false)}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-5 transition-colors">
                <ArrowLeft className="w-4 h-4" />メニューに戻る
              </button>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn delay={100}>
                <Link href="/dashboard/students" className="block">
                  <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg border-l-4 border-l-purple-500">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center">
                        <UserCheck className="w-7 h-7 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">個別生徒の分析</h2>
                        <p className="text-sm text-[var(--muted)] mb-3">
                          生徒ごとの模試成績・単元別弱点・偏差値推移・志望校合格者比較など、一人ひとりの状況を詳細に把握。
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">模試成績履歴</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">単元別分析</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">合格者比較</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">AI所見</span>
                        </div>
                        <div className="flex items-center text-purple-600 text-sm font-medium">
                          個別生徒の分析を開く<ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>

              <FadeIn delay={200}>
                <Link href="/dashboard" className="block">
                  <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg border-l-4 border-l-[var(--primary)]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                        <BarChart3 className="w-7 h-7 text-[var(--primary)]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">学年全体の分析</h2>
                        <p className="text-sm text-[var(--muted)] mb-3">
                          過年度比較・学力成長評価・AI要因分析・施策提案・レポート生成・資料管理。
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">過去年度比較</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">AI要因分析</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">施策提案</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">レポート</span>
                        </div>
                        <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                          学年全体の分析を開く<ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] mt-16 py-6">
        <p className="text-center text-xs text-[var(--muted)]">教育AIサポートシステム</p>
      </div>
    </div>
  );
}
