"use client";

import { Monitor } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-1.5 text-xs font-medium flex items-center justify-center gap-1.5">
      <Monitor className="w-3.5 h-3.5" />
      <span>デモモード — サンプルデータで動作しています</span>
    </div>
  );
}
