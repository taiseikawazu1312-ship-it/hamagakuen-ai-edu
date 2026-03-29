"use client";

import { useState } from "react";
import { BarChart3, GraduationCap, ArrowRight, ArrowLeft, Brain, TrendingUp, FileText, MessageCircle, Users, UserCheck } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const features = [
  { icon: Brain, title: "AI要因分析", description: "成績変動の原因をAIが自動で特定", color: "text-blue-600 bg-blue-50" },
  { icon: TrendingUp, title: "成長トラッキング", description: "生徒一人ひとりの学力推移を可視化", color: "text-emerald-600 bg-emerald-50" },
  { icon: FileText, title: "レポート自動生成", description: "面談用レポートをワンクリックで作成", color: "text-purple-600 bg-purple-50" },
  { icon: MessageCircle, title: "AIチューター", description: "24時間対応のAI学習アシスタント", color: "text-orange-600 bg-orange-50" },
];

const stats = [
  { value: "90%", label: "分析時間削減" },
  { value: "95%", label: "要因特定精度" },
  { value: "24h", label: "AI対応時間" },
  { value: "+7.5", label: "平均偏差値改善" },
];

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
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 text-center">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">AIが教育を変える</span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              浜学園 AI教育プラットフォーム
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              過年度データからAIが成績変動の原因を特定し、<br className="hidden sm:block" />
              データに基づく施策提案で教師の意思決定をサポートします。
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-5 py-3 text-center min-w-[100px]">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* System Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        {!showTeacherSub ? (
          /* === メインメニュー: 先生向け / 生徒向け === */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <button onClick={() => setShowTeacherSub(true)} className="block w-full text-left">
                <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                      <BarChart3 className="w-7 h-7 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                        先生向け画面
                      </h2>
                      <p className="text-sm text-[var(--muted)] mb-4">
                        学年全体の成績分析・個別生徒の学習管理・AI要因分析・施策提案・レポート生成を行う教師・管理者向け画面。
                      </p>
                      <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                        先生向け画面を開く
                        <ArrowRight className="w-4 h-4 ml-1" />
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
                      <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                        生徒向け画面
                      </h2>
                      <p className="text-sm text-[var(--muted)] mb-4">
                        個別最適化された学習プラン・AIチューターによる質問対応・弱点分析・進捗管理を行う生徒向け画面。
                      </p>
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        生徒向け画面を開く
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        ) : (
          /* === 先生向けサブメニュー: 学年全体 / 個別生徒 === */
          <div>
            <FadeIn delay={0}>
              <button
                onClick={() => setShowTeacherSub(false)}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                メニューに戻る
              </button>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn delay={100}>
                <Link href="/dashboard" className="block">
                  <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg border-l-4 border-l-[var(--primary)]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                        <BarChart3 className="w-7 h-7 text-[var(--primary)]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                          学年全体の分析
                        </h2>
                        <p className="text-sm text-[var(--muted)] mb-3">
                          過年度比較・学力成長評価・AI要因分析・施策提案・レポート生成・資料管理など、学年全体の成績を俯瞰する機能。
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">過去年度比較</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">AI要因分析</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">施策提案</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">レポート</span>
                        </div>
                        <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                          学年全体の分析を開く
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>

              <FadeIn delay={200}>
                <Link href="/dashboard/students" className="block">
                  <div className="card card-hover cursor-pointer h-full transition-all duration-200 shadow-lg border-l-4 border-l-purple-500">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center">
                        <UserCheck className="w-7 h-7 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                          個別生徒の分析
                        </h2>
                        <p className="text-sm text-[var(--muted)] mb-3">
                          生徒ごとの模試成績・単元別弱点・偏差値推移・志望校合格者比較など、一人ひとりの状況を詳細に把握する機能。
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">模試成績履歴</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">単元別分析</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">合格者比較</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">AI所見</span>
                        </div>
                        <div className="flex items-center text-purple-600 text-sm font-medium">
                          個別生徒の分析を開く
                          <ArrowRight className="w-4 h-4 ml-1" />
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

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-center text-[var(--foreground)] mb-2">主な機能</h2>
          <p className="text-center text-[var(--muted)] mb-10">AIテクノロジーで教育現場のあらゆる課題を解決</p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={i * 100}>
                <div className="card card-hover text-center py-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">{feature.title}</h3>
                  <p className="text-xs text-[var(--muted)]">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--muted)]">浜学園 AI教育プラットフォーム v1.0</p>
          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <span>Next.js</span><span>•</span><span>React</span><span>•</span><span>Tailwind CSS</span><span>•</span><span>Claude AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
