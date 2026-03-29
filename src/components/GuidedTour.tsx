"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Joyride = dynamic(() => import("react-joyride").then(mod => (mod as any).Joyride || mod), { ssr: false }) as React.ComponentType<any>;

interface GuidedTourProps {
  steps: { target: string; content: string; title?: string }[];
  run?: boolean;
}

export default function GuidedTour({ steps, run = false }: GuidedTourProps) {
  const [mounted, setMounted] = useState(false);
  const [isRunning, setIsRunning] = useState(run);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsRunning(run);
  }, [run]);

  if (!mounted) return null;

  return (
    <Joyride
      steps={steps.map(s => ({
        target: s.target,
        content: s.content,
        title: s.title,
        disableBeacon: true,
      }))}
      run={isRunning}
      continuous
      showSkipButton
      showProgress
      callback={(data: { status: string }) => {
        if (data.status === "finished" || data.status === "skipped") {
          setIsRunning(false);
        }
      }}
      styles={{
        options: {
          primaryColor: "#2563eb",
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: "12px",
          fontSize: "13px",
        },
        buttonNext: {
          borderRadius: "8px",
          fontSize: "13px",
          padding: "8px 16px",
        },
        buttonBack: {
          fontSize: "13px",
        },
        buttonSkip: {
          fontSize: "12px",
        },
      }}
      locale={{
        back: "戻る",
        close: "閉じる",
        last: "完了",
        next: "次へ",
        skip: "スキップ",
      }}
    />
  );
}
