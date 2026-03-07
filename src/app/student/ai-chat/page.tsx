"use client";

import { useState } from "react";
import { Send, Bot, User, Zap } from "lucide-react";
import { chatHistory } from "@/lib/student-data";

const quickQuestions = [
  "積分の公式を教えて",
  "英語長文の読み方のコツは？",
  "化学式の覚え方",
  "古文の助動詞について",
];

export default function AiChatPage() {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user" as const, message: input },
      {
        role: "ai" as const,
        message:
          "ご質問ありがとうございます。ただいまデモモードのため、実際のAI回答は生成されません。本番環境ではAIが丁寧に解説いたします。",
      },
    ]);
    setInput("");
  };

  const handleQuickQuestion = (q: string) => {
    setInput(q);
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
      <div className="flex-1 bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
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
                {msg.message}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white text-xs font-bold">
                田
              </div>
            )}
          </div>
        ))}
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
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
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
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
