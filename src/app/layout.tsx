import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "浜学園 AI教育プラットフォーム",
  description: "AIを活用した成績分析と個別最適化学習サポート。過年度データの比較分析、AI要因分析、施策提案を行う教育プラットフォーム。",
  openGraph: {
    title: "浜学園 AI教育プラットフォーム",
    description: "AIを活用した成績分析と個別最適化学習サポート",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
