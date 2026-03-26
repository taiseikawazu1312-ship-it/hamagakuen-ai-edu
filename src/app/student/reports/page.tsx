"use client";

import { useState } from "react";
import { FileText, User, Users, Home, Sparkles, Loader2, Eye, Download } from "lucide-react";
import { generateStudentReport } from "@/lib/report-content";
import { useToast } from "@/components/Toast";

const reportTypes = [
  {
    id: "self" as const,
    icon: User,
    title: "自己分析レポート",
    description: "自分の学習状況を客観的に振り返り、強みと弱みを明確にします。今後の学習方針の参考にできます。",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "teacher" as const,
    icon: Users,
    title: "面談用レポート",
    description: "先生との面談に最適なレポートです。学習進捗・理解度・課題を簡潔にまとめています。",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "parent" as const,
    icon: Home,
    title: "保護者向けレポート",
    description: "家庭への報告用レポートです。学習の取り組み状況や成績推移をわかりやすくまとめます。",
    color: "bg-purple-100 text-purple-600",
  },
];

function downloadAsHtml(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openPrintPreview(html: string) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<"self" | "teacher" | "parent">("self");
  const [generating, setGenerating] = useState(false);
  const { showToast } = useToast();

  const handleGenerate = (mode: "pdf" | "html" | "preview") => {
    if (mode === "preview") {
      const html = generateStudentReport(selectedType);
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(html);
        win.document.close();
      }
      return;
    }

    setGenerating(true);
    setTimeout(() => {
      const html = generateStudentReport(selectedType);
      const typeLabel = selectedType === "self" ? "自己分析" : selectedType === "teacher" ? "面談用" : "保護者向け";

      if (mode === "pdf") {
        openPrintPreview(html);
        showToast("PDFプレビューを開きました");
      } else {
        downloadAsHtml(html, `${typeLabel}レポート.html`);
        showToast("HTMLレポートをダウンロードしました");
      }
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
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

      <div className="space-y-4 mb-8">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          const isSelected = selectedType === report.id;
          return (
            <div
              key={report.id}
              onClick={() => setSelectedType(report.id)}
              className={`bg-white rounded-xl border p-6 transition-all cursor-pointer ${
                isSelected
                  ? "border-emerald-400 shadow-md ring-2 ring-emerald-100"
                  : "border-gray-200 hover:border-emerald-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${report.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">{report.title}</h3>
                    {isSelected && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                        選択中
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{report.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => handleGenerate("pdf")}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium shadow-lg shadow-emerald-500/20 disabled:opacity-60"
        >
          {generating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {generating ? "生成中..." : "PDFで保存"}
        </button>
        <button
          onClick={() => handleGenerate("html")}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition-colors font-medium disabled:opacity-60"
        >
          <Download className="w-5 h-5" />
          HTMLでダウンロード
        </button>
        <button
          onClick={() => handleGenerate("preview")}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition-colors font-medium disabled:opacity-60"
        >
          <Eye className="w-5 h-5" />
          プレビュー
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">
        PDF保存はブラウザの印刷ダイアログから「PDFに保存」を選択してください
      </p>
    </div>
  );
}
