"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, TrendingUp, Brain, Lightbulb, FileText, Upload, ChevronDown, Users, HelpCircle,
} from "lucide-react";
import DemoBanner from "@/components/DemoBanner";
import NotificationPanel from "@/components/NotificationPanel";
import GuidedTour from "@/components/GuidedTour";

const tourSteps = [
  { target: "[data-tour='stat-cards']", title: "全体概要", content: "まず偏差値の全体像を確認します。全指標で前年を下回っていることが分かります。" },
  { target: "[data-tour='nav-growth']", title: "成長評価", content: "入塾時からの成長推移を確認できます。2学期に成長が鈍化していることが見えます。" },
  { target: "[data-tour='nav-analysis']", title: "AI要因分析", content: "AIが自動的に成績低下の要因を分析し、ポジティブ/ネガティブ要因を特定します。" },
  { target: "[data-tour='nav-proposals']", title: "施策提案", content: "分析結果に基づき、具体的な改善施策を優先度付きで提案します。" },
  { target: "[data-tour='nav-students']", title: "個別生徒管理", content: "生徒ごとの成績・模試履歴・弱点を個別に管理。クリックで詳細ページに遷移します。" },
  { target: "[data-tour='nav-upload']", title: "資料管理", content: "模試成績表・答案・過去問など、各種資料をAIが自動解析します。" },
];

const tabs = [
  { label: "生徒管理", href: "/dashboard/students", icon: Users, tourId: "nav-students" },
  { label: "過去年度比較", href: "/dashboard", icon: BarChart3, tourId: "nav-overview" },
  { label: "学力成長評価", href: "/dashboard/growth", icon: TrendingUp, tourId: "nav-growth" },
  { label: "AI要因分析", href: "/dashboard/analysis", icon: Brain, tourId: "nav-analysis" },
  { label: "施策提案", href: "/dashboard/proposals", icon: Lightbulb, tourId: "nav-proposals" },
  { label: "レポート生成", href: "/dashboard/reports", icon: FileText, tourId: "nav-reports" },
  { label: "資料管理", href: "/dashboard/upload", icon: Upload, tourId: "nav-upload" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [runTour, setRunTour] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <DemoBanner />
      <GuidedTour steps={tourSteps} run={runTour} />

      <header className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[var(--foreground)] leading-tight">成績分析AI Dashboard</h1>
                  <p className="text-xs text-[var(--muted)] leading-tight">過年度の学力分析・施策提案システム</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRunTour(true)}
                className="p-2 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-lg transition-colors"
                title="ガイドツアー"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <NotificationPanel variant="dashboard" />
              <div className="relative">
                <select className="appearance-none bg-white border border-[var(--border)] rounded-lg px-3 py-2 pr-8 text-sm text-[var(--foreground)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent">
                  <option>2024年度 2学期 模試</option>
                  <option>2024年度 1学期 模試</option>
                  <option>2023年度 2学期 模試</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
              </div>
              <Link href="/dashboard/upload" className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
                <Upload className="w-4 h-4" />資料アップロード
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href || (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  data-tour={tab.tourId}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors ${isActive ? "tab-active" : "tab-inactive"}`}
                >
                  <Icon className="w-4 h-4" />{tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
    </div>
  );
}
