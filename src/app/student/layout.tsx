"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Library,
  CheckSquare,
  BarChart3,
  MessageCircle,
  FileText,
  Bell,
  Flame,
  AlertTriangle,
} from "lucide-react";
import DemoBanner from "@/components/DemoBanner";
import NotificationPanel from "@/components/NotificationPanel";

const tabs = [
  { label: "ホーム", href: "/student", icon: Home },
  { label: "カリキュラム", href: "/student/curriculum", icon: BookOpen },
  { label: "教材", href: "/student/materials", icon: Library },
  { label: "学習ToDo", href: "/student/todo", icon: CheckSquare },
  { label: "進捗確認", href: "/student/progress", icon: BarChart3 },
  { label: "弱点分析", href: "/student/weakness", icon: AlertTriangle },
  { label: "質問AI", href: "/student/ai-chat", icon: MessageCircle },
  { label: "レポート", href: "/student/reports", icon: FileText },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoBanner />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">
                    AI学習サポート
                  </h1>
                  <p className="text-xs text-gray-500 leading-tight">
                    パーソナライズ学習プラットフォーム
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium">
                <Flame className="w-4 h-4" />
                <span>12日連続</span>
              </div>
              <NotificationPanel variant="student" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  田
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  田中 太郎
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto pb-0 -mb-px scrollbar-hide">
            {tabs.map((tab) => {
              const isActive =
                tab.href === "/student"
                  ? pathname === "/student"
                  : pathname.startsWith(tab.href);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
