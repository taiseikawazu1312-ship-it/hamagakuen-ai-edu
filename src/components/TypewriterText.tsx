"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  renderText?: (visibleText: string) => React.ReactNode;
}

export default function TypewriterText({
  text,
  speed = 20,
  delay = 0,
  onComplete,
  className,
  renderText,
}: TypewriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedLength >= text.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setDisplayedLength((prev) => Math.min(prev + 1, text.length));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayedLength, text.length, speed, started, onComplete]);

  const visibleText = text.slice(0, displayedLength);
  const isTyping = started && displayedLength < text.length;

  return (
    <span className={className}>
      {renderText ? renderText(visibleText) : visibleText}
      {isTyping && (
        <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-blink align-middle" />
      )}
    </span>
  );
}
