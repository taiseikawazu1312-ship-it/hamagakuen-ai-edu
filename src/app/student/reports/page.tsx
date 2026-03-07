"use client";

import { FileText, User, Users, Home, Sparkles } from "lucide-react";

const reportTypes = [
  {
    icon: User,
    title: "自己分析レポート",
    description: "自分の学習状況を客観的に振り返り、強みと弱みを明確にします。今後の学習方針の参考にできます。",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Users,
    title: "面談用レポート",
    description: "先生との面談に最適なレポートです。学習進捗・理解度・課題を簡潔にまとめています。",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Home,
    title: "保護者向けレポート",
    description: "家庭への報告用レポートです。学習の取り組み状況や成績推移をわかりやすくまとめます。",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function ReportsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          学習レポート自動生成
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          面談や保護者への報告に使えるレポートを自動生成します
        </p>
      </div>

      {/* Report Cards */}
      <div className="space-y-4 mb-8">
        {reportTypes.map((report, i) => {
          const Icon = report.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${report.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {report.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors text-base font-medium shadow-lg shadow-emerald-500/20">
          <Sparkles className="w-5 h-5" />
          レポートを生成する
        </button>
        <p className="text-xs text-gray-400 mt-3">
          レポートはPDF形式でダウンロードできます
        </p>
      </div>
    </div>
  );
}
