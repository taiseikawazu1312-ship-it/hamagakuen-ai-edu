"use client";

import { useState } from "react";
import { Bell, X, AlertTriangle, TrendingDown, CheckCircle2, BookOpen, Calendar } from "lucide-react";

interface Notification {
  id: number;
  icon: React.ReactNode;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "warning" | "success" | "info";
}

const demoNotifications: Notification[] = [
  { id: 2, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, title: "模試解析完了", message: "第2回駿台全国模試の成績データ解析が完了しました", time: "1時間前", read: false, type: "success" },
  { id: 3, icon: <TrendingDown className="w-4 h-4 text-red-500" />, title: "偏差値低下注意", message: "中村さくらの国語偏差値が2ヶ月連続で低下", time: "3時間前", read: false, type: "warning" },
  { id: 4, icon: <BookOpen className="w-4 h-4 text-blue-500" />, title: "新教材追加", message: "数学IIB微分積分の演習問題セットが追加されました", time: "昨日", read: true, type: "info" },
  { id: 5, icon: <Calendar className="w-4 h-4 text-purple-500" />, title: "面談リマインダー", message: "明日14:00〜 山田太一保護者面談", time: "昨日", read: true, type: "info" },
];

export default function NotificationPanel({ variant = "dashboard" }: { variant?: "dashboard" | "student" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(
    variant === "dashboard" ? demoNotifications : [
      { id: 1, icon: <BookOpen className="w-4 h-4 text-emerald-500" />, title: "新しい教材", message: "数学IIBの新しい演習問題が追加されました", time: "30分前", read: false, type: "info" as const },
      { id: 2, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, title: "目標達成！", message: "英語の偏差値が目標の66.0を突破しました", time: "2時間前", read: false, type: "success" as const },
      { id: 3, icon: <Calendar className="w-4 h-4 text-purple-500" />, title: "模試のお知らせ", message: "12月模試は12月15日（日）です。持ち物を確認しましょう", time: "昨日", read: true, type: "info" as const },
      { id: 4, icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, title: "学習プラン更新", message: "物理の学習プランがAIにより更新されました", time: "昨日", read: true, type: "warning" as const },
    ]
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">通知</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    すべて既読
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/50" : ""}`}
                  onClick={() => setNotifications(prev => prev.map(nn => nn.id === n.id ? { ...nn, read: true } : nn))}
                >
                  <div className="mt-0.5 flex-shrink-0">{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-semibold ${!n.read ? "text-gray-900" : "text-gray-600"}`}>{n.title}</p>
                      {!n.read && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
