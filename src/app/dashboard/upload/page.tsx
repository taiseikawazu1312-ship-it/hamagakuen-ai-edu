"use client";

import { useState } from "react";
import { Upload, Image, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploaded(true);
  };

  const handleClick = () => {
    setUploaded(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
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

      {/* Upload Area */}
      {!uploaded ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            card cursor-pointer transition-all duration-200 text-center py-16
            ${
              isDragging
                ? "border-[var(--primary)] border-2 bg-[var(--accent)]"
                : "border-dashed border-2 border-[var(--border)] hover:border-[var(--primary-light)] hover:bg-[var(--accent)]"
            }
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <Upload
                className={`w-7 h-7 ${
                  isDragging ? "text-[var(--primary)]" : "text-[var(--muted)]"
                }`}
              />
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
      ) : (
        <div className="card text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--foreground)] mb-1">
                アップロード完了
              </p>
              <p className="text-sm text-[var(--muted)]">
                AIが成績データを分析しています...
              </p>
            </div>
            <button
              onClick={() => setUploaded(false)}
              className="btn-outline text-sm mt-2"
            >
              別のファイルをアップロード
            </button>
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white">
          <Image className="w-5 h-5 text-[var(--primary)]" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              画像ファイル
            </p>
            <p className="text-xs text-[var(--muted)]">
              JPG, PNG, PDF（スキャンした成績表）
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white">
          <FileSpreadsheet className="w-5 h-5 text-[var(--success)]" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              データファイル
            </p>
            <p className="text-xs text-[var(--muted)]">
              CSV, Excel（成績データ）
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
