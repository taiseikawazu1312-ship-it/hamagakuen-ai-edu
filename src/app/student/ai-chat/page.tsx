"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Zap } from "lucide-react";
import type { UIMessage } from "ai";

const quickQuestions = [
  "積分の公式を教えて",
  "英語長文の読み方のコツは？",
  "化学式の覚え方",
  "古文の助動詞について",
];

const initialMessages: UIMessage[] = [
  {
    id: "1",
    role: "user",
    parts: [{ type: "text", text: "合成関数の微分がよくわかりません。教えてください。" }],
  },
  {
    id: "2",
    role: "assistant",
    parts: [{ type: "text", text: `合成関数の微分について一緒に考えていきましょう！

まずヒントです。合成関数とは「関数の中に関数がある」状態のことです。例えば y = (2x + 3)^5 のような形ですね。

この場合、外側の関数と内側の関数に分けて考えることがポイントです。

考えてみてください：
- 外側の関数は何でしょう？
- 内側の関数は何でしょう？` }],
  },
  {
    id: "3",
    role: "user",
    parts: [{ type: "text", text: "外側が5乗で、内側が2x+3ですか？" }],
  },
  {
    id: "4",
    role: "assistant",
    parts: [{ type: "text", text: `その通りです！素晴らしい理解です。

では、合成関数の微分の公式（チェインルール）を適用しましょう：

dy/dx = dy/du × du/dx

ここで u = 2x + 3 とおくと：
- y = u^5 → dy/du = 5u^4
- u = 2x + 3 → du/dx = 2

したがって：
dy/dx = 5u^4 × 2 = 10(2x + 3)^4

【練習問題】
次の関数を微分してみましょう：
1. y = (3x - 1)^4
2. y = sin(2x + 1)
3. y = e^(x^2)` }],
  },
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export default function AiChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
  });
  const chatRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, status]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    sendMessage({ text });
  };

  const handleQuickQuestion = (q: string) => {
    if (isLoading) return;
    sendMessage({ text: q });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="bg-white rounded-t-xl border border-gray-200 border-b-0 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              AI学習アシスタント
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">
                オンライン・いつでも質問できます
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => {
          const text = getMessageText(msg);
          if (!text) return null;
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-emerald-600" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-emerald-500 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {text}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white text-xs font-bold">
                  田
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {status === "submitted" && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-white border border-gray-200">
              <div className="flex items-center gap-1">
                <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block" />
                <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block" />
                <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="bg-white border-x border-gray-200 px-4 py-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-400">クイック質問</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickQuestion(q)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white rounded-b-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="質問を入力してください..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
