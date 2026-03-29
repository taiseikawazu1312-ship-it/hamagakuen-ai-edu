"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, TrendingUp, Brain, FileText, Upload, Users, HelpCircle,
} from "lucide-react";
import DemoBanner from "@/components/DemoBanner";
import NotificationPanel from "@/components/NotificationPanel";
import GuidedTour from "@/components/GuidedTour";

const tourSteps = [
  { target: "[data-tour='stat-cards']", title: "全体概要", content: "まず偏差値の全体像を確認します。全指標で前年を下回っていることが分かります。" },
  { target: "[data-tour='nav-growth']", title: "成長評価", content: "入塾時からの成長推移を確認できます。2学期に成長が鈍化していることが見えます。" },
  { target: "[data-tour='nav-analysis']", title: "AI分析", content: "AIが自動的に成績低下の要因を分析し、分析結果に基づいた具体的な改善施策を提案します。" },
  { target: "[data-tour='nav-students']", title: "個別生徒管理", content: "生徒ごとの成績・模試履歴・弱点を個別に管理。クリックで詳細ページに遷移します。" },
  { target: "[data-tour='nav-upload']", title: "資料管理", content: "模試成績表・答案・過去問など、各種資料をAIが自動解析します。" },
];

const tabs = [
  { label: "生徒管理", href: "/dashboard/students", icon: Users, tourId: "nav-students" },
  { label: "過去年度比較", href: "/dashboard", icon: BarChart3, tourId: "nav-overview" },
  { label: "学力成長評価", href: "/dashboard/growth", icon: TrendingUp, tourId: "nav-growth" },
  { label: "AI分析", href: "/dashboard/analysis", icon: Brain, tourId: "nav-analysis" },
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
                className="p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-lg transition-colors"
                title="ガイドツアー"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <NotificationPanel variant="dashboard" />
              <Link href="/dashboard/upload" className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap hidden sm:flex">
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
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap transition-colors ${isActive ? "tab-active" : "tab-inactive"}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
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
