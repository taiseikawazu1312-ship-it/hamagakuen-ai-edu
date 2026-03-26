"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  FileSpreadsheet,
  ClipboardList,
  Users,
  Loader2,
  Eye,
} from "lucide-react";
import { reportTypes } from "@/lib/demo-data";
import { generateDashboardReport } from "@/lib/report-content";
import { useToast } from "@/components/Toast";

const iconMap: Record<string, React.ElementType> = {
  summary: ClipboardList,
  detailed: FileSpreadsheet,
  parent: Users,
};

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
  // Auto-trigger print for PDF save
  setTimeout(() => win.print(), 500);
}

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<"summary" | "detailed" | "parent">("summary");
  const [generating, setGenerating] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleDownloadPdf = () => {
    setGenerating("pdf");
    setTimeout(() => {
      const html = generateDashboardReport(selectedType);
      openPrintPreview(html);
      setGenerating(null);
      showToast("PDFプレビューを開きました（印刷ダイアログからPDF保存できます）");
    }, 1500);
  };

  const handleDownloadHtml = () => {
    setGenerating("html");
    setTimeout(() => {
      const html = generateDashboardReport(selectedType);
      const typeLabel = selectedType === "summary" ? "サマリー" : selectedType === "detailed" ? "詳細分析" : "保護者向け";
      downloadAsHtml(html, `成績分析_${typeLabel}レポート.html`);
      setGenerating(null);
      showToast("HTMLレポートをダウンロードしました");
    }, 1500);
  };

  const handlePreview = () => {
    const html = generateDashboardReport(selectedType);
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)] mb-4">
          <FileText className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
          レポート自動生成
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          分析結果を保護者面談や会議で使えるレポート形式で出力します。
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {reportTypes.map((report) => {
          const Icon = iconMap[report.id] || FileText;
          return (
            <label
              key={report.id}
              className="card card-hover flex items-start gap-4 cursor-pointer"
            >
              <input
                type="radio"
                name="reportType"
                value={report.id}
                checked={selectedType === report.id}
                onChange={() => setSelectedType(report.id as "summary" | "detailed" | "parent")}
                className="mt-1 accent-[var(--primary)]"
              />
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    {report.title}
                  </h3>
                  <span className="text-xs text-[var(--muted)] bg-gray-100 px-2 py-0.5 rounded-full">
                    {report.pages}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mt-1">
                  {report.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleDownloadPdf}
          disabled={!!generating}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {generating === "pdf" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {generating === "pdf" ? "生成中..." : "PDFで保存"}
        </button>
        <button
          onClick={handleDownloadHtml}
          disabled={!!generating}
          className="btn-outline flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {generating === "html" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {generating === "html" ? "生成中..." : "HTMLでダウンロード"}
        </button>
        <button
          onClick={handlePreview}
          disabled={!!generating}
          className="btn-outline flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Eye className="w-4 h-4" />
          プレビュー
        </button>
      </div>
    </div>
  );
}
