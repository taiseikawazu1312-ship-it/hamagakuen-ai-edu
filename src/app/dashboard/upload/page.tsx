"use client";

import { useState, useEffect } from "react";
import {
  Upload, FileSpreadsheet, FileText, Image, CheckCircle2, Loader2,
  ClipboardList, BookOpen, Calendar, Clock, Trash2, Eye, BarChart3,
  GraduationCap, AlertTriangle,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useToast } from "@/components/Toast";

// 資料カテゴリ定義
const documentCategories = [
  {
    id: "mock-exam",
    label: "模試成績表",
    icon: ClipboardList,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    iconColor: "text-blue-600",
    description: "全国模試・校内模試の成績一覧や個人成績表",
    formats: "PDF, CSV, Excel, 画像（スキャン）",
    aiSteps: ["成績データを読み取り中...", "生徒名を照合中...", "偏差値を計算中...", "ダッシュボードに反映中..."],
    resultPreview: {
      rows: [
        { label: "模試名", value: "2025年度 第1回 全国模試" },
        { label: "検出生徒数", value: "42名" },
        { label: "科目数", value: "5科目（数学/国語/英語/物理/化学）" },
        { label: "平均偏差値", value: "52.8" },
        { label: "最高偏差値", value: "74.2（佐藤花子）" },
      ],
    },
  },
  {
    id: "answer-sheet",
    label: "解答用紙・答案",
    icon: FileText,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    iconColor: "text-purple-600",
    description: "生徒の解答用紙をスキャン。AIが誤答パターンを分析",
    formats: "PDF, JPG, PNG（スキャン画像）",
    aiSteps: ["画像を解析中（OCR処理）...", "解答を正誤判定中...", "誤答パターンを分析中...", "弱点レポートを生成中..."],
    resultPreview: {
      rows: [
        { label: "生徒名", value: "山田太一" },
        { label: "科目", value: "数学IIB" },
        { label: "正答率", value: "68%（17/25問）" },
        { label: "検出された誤答パターン", value: "計算ミス3件、公式適用ミス2件" },
        { label: "重点対策単元", value: "微分積分（チェインルール）" },
      ],
    },
  },
  {
    id: "curriculum",
    label: "カリキュラム・シラバス",
    icon: BookOpen,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    iconColor: "text-emerald-600",
    description: "年間カリキュラムや授業計画書。進捗管理に使用",
    formats: "PDF, Word, Excel",
    aiSteps: ["文書構造を解析中...", "単元・スケジュールを抽出中...", "進捗管理データに変換中...", "カレンダーに反映中..."],
    resultPreview: {
      rows: [
        { label: "対象科目", value: "数学IIB" },
        { label: "期間", value: "2025年4月〜2026年1月" },
        { label: "総単元数", value: "24単元" },
        { label: "現在の進捗", value: "第16単元 / 24単元（66.7%）" },
        { label: "遅延単元", value: "2単元（ベクトル応用、複素数平面）" },
      ],
    },
  },
  {
    id: "past-exam",
    label: "過去問・入試問題",
    icon: GraduationCap,
    color: "bg-amber-50 text-amber-600 border-amber-200",
    iconColor: "text-amber-600",
    description: "志望校の過去問。AIが出題傾向を分析",
    formats: "PDF, 画像",
    aiSteps: ["問題文を解析中（OCR処理）...", "出題分野を分類中...", "難易度を判定中...", "傾向分析レポートを生成中..."],
    resultPreview: {
      rows: [
        { label: "大学名", value: "早稲田大学 商学部" },
        { label: "年度", value: "2024年度 一般入試" },
        { label: "科目", value: "英語" },
        { label: "大問数", value: "5問" },
        { label: "出題傾向", value: "長文読解60%、文法語法25%、英作文15%" },
      ],
    },
  },
  {
    id: "attendance",
    label: "出席・学習記録",
    icon: Calendar,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    iconColor: "text-pink-600",
    description: "出席簿、学習時間記録、課題提出状況など",
    formats: "CSV, Excel",
    aiSteps: ["記録データを読み取り中...", "生徒別に集計中...", "欠席パターンを分析中...", "アラート生成中..."],
    resultPreview: {
      rows: [
        { label: "対象期間", value: "2024年10月" },
        { label: "生徒数", value: "42名" },
        { label: "平均出席率", value: "94.2%" },
        { label: "要注意生徒", value: "高橋健太（出席率78%）" },
        { label: "課題提出率", value: "平均86.5%" },
      ],
    },
  },
];

// アップロード履歴（デモ）
const uploadHistory = [
  { id: 1, name: "2024年度_第4回全国模試_成績一覧.xlsx", category: "模試成績表", date: "2024-10-28", status: "完了", students: 42 },
  { id: 2, name: "山田太一_数学IIB_答案.pdf", category: "解答用紙・答案", date: "2024-10-25", status: "完了", students: 1 },
  { id: 3, name: "2024年度_3学期カリキュラム.pdf", category: "カリキュラム・シラバス", date: "2024-10-20", status: "完了", students: null },
  { id: 4, name: "早稲田大学_商学部_2024_英語.pdf", category: "過去問・入試問題", date: "2024-10-18", status: "完了", students: null },
  { id: 5, name: "2024年度_第3回全国模試_成績一覧.csv", category: "模試成績表", date: "2024-08-15", status: "完了", students: 42 },
  { id: 6, name: "10月_出席簿.xlsx", category: "出席・学習記録", date: "2024-10-31", status: "完了", students: 42 },
  { id: 7, name: "佐藤花子_物理_答案スキャン.jpg", category: "解答用紙・答案", date: "2024-10-22", status: "完了", students: 1 },
  { id: 8, name: "京都大学_理学部_2024_数学.pdf", category: "過去問・入試問題", date: "2024-10-15", status: "完了", students: null },
];

export default function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [phase, setPhase] = useState<"select" | "upload" | "analyzing" | "done">("select");
  const [isDragging, setIsDragging] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"upload" | "history">("upload");
  const { showToast } = useToast();

  const category = documentCategories.find(c => c.id === selectedCategory);

  useEffect(() => {
    if (phase !== "analyzing" || !category) return;
    const steps = category.aiSteps;
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) { clearInterval(stepInterval); return prev; }
        return prev + 1;
      });
    }, 900);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); setTimeout(() => setPhase("done"), 400); return 100; }
        return prev + 2;
      });
    }, 80);
    return () => { clearInterval(stepInterval); clearInterval(progressInterval); };
  }, [phase, category]);

  const startUpload = () => {
    setPhase("analyzing");
    setCurrentStep(0);
    setProgress(0);
  };

  const reset = () => {
    setPhase("select");
    setSelectedCategory(null);
    setCurrentStep(0);
    setProgress(0);
  };

  const selectAndUpload = (catId: string) => {
    setSelectedCategory(catId);
    setPhase("upload");
  };

  return (
    <div className="space-y-6">
      {/* Header with tabs */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)]">資料管理</h2>
            <p className="text-sm text-[var(--muted)]">模試成績・答案・カリキュラム等の各種資料をAIが自動解析</p>
          </div>
          <div className="flex gap-1 bg-white border border-[var(--border)] rounded-xl p-1">
            <button onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "upload" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)]"}`}>
              アップロード
            </button>
            <button onClick={() => setActiveTab("history")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "history" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)]"}`}>
              アップロード履歴
            </button>
          </div>
        </div>
      </FadeIn>

      {activeTab === "history" && (
        <FadeIn>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[var(--muted)]" />
              <h3 className="text-base font-bold text-[var(--foreground)]">アップロード履歴</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">{uploadHistory.length}件</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">ファイル名</th>
                    <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">種別</th>
                    <th className="text-left py-3 px-3 font-semibold text-[var(--muted)]">日付</th>
                    <th className="text-center py-3 px-3 font-semibold text-[var(--muted)]">状態</th>
                    <th className="text-right py-3 px-3 font-semibold text-[var(--muted)]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadHistory.map(item => (
                    <tr key={item.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--background)] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[var(--muted)] flex-shrink-0" />
                          <span className="font-medium text-xs">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary)] font-medium">{item.category}</span>
                      </td>
                      <td className="py-3 px-3 text-xs text-[var(--muted)]">{item.date}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--success)] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />{item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => showToast("解析結果を表示しました")}
                            className="p-1.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => showToast("ダッシュボードに反映しました")}
                            className="p-1.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-lg transition-colors">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => showToast("削除しました")}
                            className="p-1.5 text-[var(--muted)] hover:text-[var(--danger)] hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      )}

      {activeTab === "upload" && phase === "select" && (
        <>
          <FadeIn delay={100}>
            <p className="text-sm text-[var(--muted)]">アップロードする資料の種類を選択してください</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <FadeIn key={cat.id} delay={150 + i * 80}>
                  <button onClick={() => selectAndUpload(cat.id)}
                    className="card card-hover text-left w-full transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">{cat.label}</h3>
                        <p className="text-xs text-[var(--muted)] mb-2 leading-relaxed">{cat.description}</p>
                        <p className="text-xs text-[var(--primary)]">対応形式: {cat.formats}</p>
                      </div>
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </>
      )}

      {activeTab === "upload" && phase === "upload" && category && (
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <button onClick={reset} className="text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-4 transition-colors">
              ← 資料種別の選択に戻る
            </button>

            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 ${category.color}`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">{category.label}のアップロード</h3>
              <p className="text-sm text-[var(--muted)] mt-1">対応形式: {category.formats}</p>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); startUpload(); }}
              onClick={startUpload}
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
                  <p className="text-base font-semibold text-[var(--foreground)] mb-1">ファイルをドラッグ&ドロップ</p>
                  <p className="text-sm text-[var(--muted)]">またはクリックしてファイルを選択</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-[var(--accent)] border border-blue-100">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--muted)]">
                  アップロードされたファイルはAIが自動で解析し、関連するダッシュボードのデータに反映されます。個人情報を含むファイルは安全に暗号化して保存されます。
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {activeTab === "upload" && phase === "analyzing" && category && (
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <div className="card text-center py-12">
              <div className="flex flex-col items-center gap-5">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${category.color}`}>
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-semibold text-[var(--foreground)] mb-1">AI解析中...</p>
                  <p className="text-sm text-[var(--muted)] transition-all duration-300">{category.aiSteps[currentStep]}</p>
                </div>
                <div className="w-72 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)] rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-[var(--muted)]">{progress}%</p>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {activeTab === "upload" && phase === "done" && category && (
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
                </div>
                <p className="text-lg font-semibold text-[var(--foreground)]">解析完了</p>
                <p className="text-sm text-[var(--muted)] mt-1">{category.label}の解析が正常に完了しました</p>
              </div>

              <div className="border border-[var(--border)] rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-2 border-b border-[var(--border)]">
                  <p className="text-xs font-semibold text-[var(--muted)]">AI解析結果</p>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {category.resultPreview.rows.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-2.5 px-4 text-[var(--muted)] text-xs w-40">{row.label}</td>
                        <td className="py-2.5 px-4 font-medium text-xs">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => { showToast("ダッシュボードに反映しました"); }}
                  className="btn-primary text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />ダッシュボードに反映
                </button>
                <button onClick={() => { showToast("解析結果を保存しました"); }}
                  className="btn-outline text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />結果を保存
                </button>
                <button onClick={reset} className="btn-outline text-sm">
                  別の資料をアップロード
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* 対応形式一覧（アップロードタブ・選択画面時のみ） */}
      {activeTab === "upload" && phase === "select" && (
        <FadeIn delay={600}>
          <div className="card">
            <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">対応ファイル形式</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)]">
                <Image className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <p className="text-xs font-medium text-[var(--foreground)]">画像ファイル</p>
                  <p className="text-xs text-[var(--muted)]">JPG, PNG（スキャン・写真）</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)]">
                <FileText className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs font-medium text-[var(--foreground)]">ドキュメント</p>
                  <p className="text-xs text-[var(--muted)]">PDF, Word</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)]">
                <FileSpreadsheet className="w-5 h-5 text-[var(--success)]" />
                <div>
                  <p className="text-xs font-medium text-[var(--foreground)]">データファイル</p>
                  <p className="text-xs text-[var(--muted)]">CSV, Excel</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
