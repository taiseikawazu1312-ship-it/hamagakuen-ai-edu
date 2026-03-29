"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  TrendingUp,
  Brain,
  Lightbulb,
  FileText,
  Upload,
  ChevronDown,
  Users,
} from "lucide-react";
import DemoBanner from "@/components/DemoBanner";

const tabs = [
  { label: "過去年度比較", href: "/dashboard", icon: BarChart3 },
  { label: "学力成長評価", href: "/dashboard/growth", icon: TrendingUp },
  { label: "AI要因分析", href: "/dashboard/analysis", icon: Brain },
  { label: "施策提案", href: "/dashboard/proposals", icon: Lightbulb },
  { label: "レポート生成", href: "/dashboard/reports", icon: FileText },
  { label: "生徒管理", href: "/dashboard/students", icon: Users },
  { label: "資料管理", href: "/dashboard/upload", icon: Upload },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <DemoBanner />
      {/* Header */}
      <header className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[var(--foreground)] leading-tight">
                    成績分析AI Dashboard
                  </h1>
                  <p className="text-xs text-[var(--muted)] leading-tight">
                    過年度の学力分析・施策提案システム
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-[var(--border)] rounded-lg px-3 py-2 pr-8 text-sm text-[var(--foreground)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent">
                  <option>2024年度 2学期 中間テスト</option>
                  <option>2024年度 1学期 期末テスト</option>
                  <option>2024年度 1学期 中間テスト</option>
                  <option>2023年度 2学期 期末テスト</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
              </div>
              <Link
                href="/dashboard/upload"
                className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap"
              >
                <Upload className="w-4 h-4" />
                資料アップロード
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive =
                pathname === tab.href ||
                (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                    isActive ? "tab-active" : "tab-inactive"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
