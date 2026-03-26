"use client";

import { useState, useEffect } from "react";
import { Upload, Image, FileSpreadsheet, CheckCircle2, Loader2 } from "lucide-react";

const analysisSteps = [
  "ファイルを読み込み中...",
  "データ形式を判定中...",
  "AIが成績データを解析中...",
  "生徒名・科目を照合中...",
  "分析用データに変換中...",
];

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setPhase("done"), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [phase]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    startAnalysis();
  };
  const handleClick = () => startAnalysis();
  const startAnalysis = () => {
    setPhase("analyzing");
    setCurrentStep(0);
    setProgress(0);
  };
  const reset = () => {
    setPhase("idle");
    setCurrentStep(0);
    setProgress(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)] mb-4">
          <Upload className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
          成績表アップロード
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          AIが成績表を自動で読み取り、分析に回します。
        </p>
      </div>

      {phase === "idle" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`card cursor-pointer transition-all duration-200 text-center py-16 ${
            isDragging
              ? "border-[var(--primary)] border-2 bg-[var(--accent)]"
              : "border-dashed border-2 border-[var(--border)] hover:border-[var(--primary-light)] hover:bg-[var(--accent)]"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <Upload className={`w-7 h-7 ${isDragging ? "text-[var(--primary)]" : "text-[var(--muted)]"}`} />
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--foreground)] mb-1">
                ファイルをドラッグ&ドロップ
              </p>
              <p className="text-sm text-[var(--muted)]">
                またはクリックしてファイルを選択
              </p>
            </div>
          </div>
        </div>
      )}

      {phase === "analyzing" && (
        <div className="card text-center py-12">
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-[var(--primary)] animate-spin" />
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--foreground)] mb-1">
                AI解析中...
              </p>
              <p className="text-sm text-[var(--muted)] transition-all duration-300">
                {analysisSteps[currentStep]}
              </p>
            </div>
            <div className="w-72 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--muted)]">{progress}%</p>
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="card text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--foreground)] mb-1">
                解析完了
              </p>
              <p className="text-sm text-[var(--muted)]">
                42名分の成績データを正常に読み取りました
              </p>
            </div>
            {/* Preview table */}
            <div className="w-full mt-4 text-left">
              <div className="border border-[var(--border)] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-[var(--border)]">
                      <th className="text-left py-2 px-3 font-semibold text-[var(--muted)]">項目</th>
                      <th className="text-right py-2 px-3 font-semibold text-[var(--muted)]">検出値</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 px-3">検出生徒数</td>
                      <td className="py-2 px-3 text-right font-medium">42名</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 px-3">科目数</td>
                      <td className="py-2 px-3 text-right font-medium">5科目</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-2 px-3">テスト名</td>
                      <td className="py-2 px-3 text-right font-medium">2025年度 1学期 中間テスト</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">平均点</td>
                      <td className="py-2 px-3 text-right font-medium">63.8点</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button className="btn-primary text-sm">
                ダッシュボードに反映
              </button>
              <button onClick={reset} className="btn-outline text-sm">
                別のファイルをアップロード
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white">
          <Image className="w-5 h-5 text-[var(--primary)]" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">画像ファイル</p>
            <p className="text-xs text-[var(--muted)]">JPG, PNG, PDF（スキャンした成績表）</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white">
          <FileSpreadsheet className="w-5 h-5 text-[var(--success)]" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">データファイル</p>
            <p className="text-xs text-[var(--muted)]">CSV, Excel（成績データ）</p>
          </div>
        </div>
      </div>
    </div>
  );
}
