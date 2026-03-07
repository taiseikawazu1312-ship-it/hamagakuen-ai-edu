"use client";

import {
  FileText,
  Download,
  FileSpreadsheet,
  ClipboardList,
  Users,
} from "lucide-react";
import { reportTypes } from "@/lib/demo-data";

const iconMap: Record<string, React.ElementType> = {
  summary: ClipboardList,
  detailed: FileSpreadsheet,
  parent: Users,
};

export default function ReportsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)] mb-4">
          <FileText className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
          レポート自動生成
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          分析結果を保護者面談や会議で使えるレポート形式で出力します。PDF・Word形式に対応しています。
        </p>
      </div>

      {/* Report Type Cards */}
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
                defaultChecked={report.id === "summary"}
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

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="btn-primary flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          PDFでダウンロード
        </button>
        <button className="btn-outline flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Wordでダウンロード
        </button>
      </div>
    </div>
  );
}
