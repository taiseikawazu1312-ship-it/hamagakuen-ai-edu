"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Zap } from "lucide-react";
import { chatHistory } from "@/lib/student-data";

const quickQuestions = [
  "積分の公式を教えて",
  "英語長文の読み方のコツは？",
  "化学式の覚え方",
  "古文の助動詞について",
];

const aiResponses: Record<string, string> = {
  "積分の公式を教えて": `基本的な積分公式をまとめますね！

【不定積分の基本公式】
• ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ -1)
• ∫ 1/x dx = ln|x| + C
• ∫ eˣ dx = eˣ + C
• ∫ sin x dx = -cos x + C
• ∫ cos x dx = sin x + C

【よく使うテクニック】
1. 置換積分: ∫ f(g(x))·g'(x) dx → ∫ f(u) du
2. 部分積分: ∫ f·g' dx = f·g - ∫ f'·g dx

田中さんが苦手な微分積分の分野では、まず基本公式を確実に覚えてから、置換積分の練習に進むのがおすすめです。`,

  "英語長文の読み方のコツは？": `英語長文読解のコツを3つのステップでお伝えしますね！

【Step 1: パラグラフリーディング】
各段落の最初と最後の文に注目。ここにトピックセンテンスがあることが多いです。

【Step 2: ディスコースマーカーに注目】
• However, But → 逆接（重要な主張が来る）
• For example → 具体例（前の文が抽象的な主張）
• Therefore, As a result → 結論

【Step 3: 設問を先に読む】
本文を読む前に設問を確認。「何を聞かれているか」を把握してから読むと、必要な情報にフォーカスできます。

早稲田の商学部は特に長文量が多いので、速読力が重要です。1日1題、時間を計って演習しましょう！`,

  "化学式の覚え方": `化学式の効率的な覚え方をお教えします！

【イオンの価数で覚える方法】
まずイオンの価数を覚えれば、化学式は自動的に作れます：
• Na⁺, K⁺, Ag⁺ → 1価の陽イオン
• Ca²⁺, Mg²⁺, Zn²⁺ → 2価の陽イオン
• Cl⁻, OH⁻, NO₃⁻ → 1価の陰イオン
• SO₄²⁻, CO₃²⁻ → 2価の陰イオン

【語呂合わせ】
• 炎色反応: 「リアカー無き K村、動力借りようとするも暮れない」
  Li(赤) Na(黄) K(紫) Cu(緑) Ca(橙) Sr(紅) Ba(緑)

【田中さんへのアドバイス】
化学は暗記に頼りすぎず「なぜそうなるか」を理解すると定着率が上がります。周期表の族の特徴から推測できることも多いですよ。`,

  "古文の助動詞について": `古文の助動詞、一緒に整理しましょう！

【まず覚えるべき6つの助動詞】
1. 「ず」（打消） - 未然形接続 - 「〜ない」
2. 「き・けり」（過去） - 連用形接続 - 「〜した」
3. 「む」（推量・意志） - 未然形接続 - 「〜だろう」
4. 「べし」（推量・当然） - 終止形接続 - 「〜はずだ」
5. 「る・らる」（受身・尊敬・自発・可能） - 未然形接続
6. 「なり」（断定/伝聞推定） - 接続で意味が変わる！

【覚え方のコツ】
接続で分類すると覚えやすいです：
• 未然形接続: ず、む、る・らる、す・さす
• 連用形接続: き、けり、つ、ぬ、たり
• 終止形接続: べし、らむ、まじ、なり（伝聞）

早稲田の国語は古文の配点が高いので、助動詞の意味の判別は必須スキルです！`,
};

const defaultResponse = `ご質問ありがとうございます！

その分野について詳しく解説しますね。田中さんの現在の学習状況を踏まえると、まず基礎の確認から始めて、段階的に応用問題に取り組むのが効果的です。

具体的な問題や分からない箇所があれば、写真を撮って送っていただければ、ステップごとに解説いたします。

一緒に頑張りましょう！`;

type Message = { role: "user" | "ai"; message: string };

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>(chatHistory);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, streamingText, isTyping]);

  const simulateStreaming = (responseText: string) => {
    setIsTyping(true);
    setStreamingText("");

    // Show typing indicator for 1 second, then start streaming
    setTimeout(() => {
      setIsTyping(false);
      let idx = 0;
      const interval = setInterval(() => {
        idx += 2;
        if (idx >= responseText.length) {
          setStreamingText("");
          setMessages((prev) => [
            ...prev,
            { role: "ai", message: responseText },
          ]);
          clearInterval(interval);
        } else {
          setStreamingText(responseText.slice(0, idx));
        }
      }, 15);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping || streamingText) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", message: userMessage }]);
    setInput("");

    // Find matching response
    const response = aiResponses[userMessage] || defaultResponse;
    simulateStreaming(response);
  };

  const handleQuickQuestion = (q: string) => {
    if (isTyping || streamingText) return;
    setMessages((prev) => [...prev, { role: "user", message: q }]);
    const response = aiResponses[q] || defaultResponse;
    simulateStreaming(response);
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
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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

        {/* Streaming message */}
        {streamingText && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white border border-gray-200 text-gray-800">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {streamingText}
                <span className="inline-block w-0.5 h-4 bg-gray-800 ml-0.5 animate-blink align-middle" />
              </p>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
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
              disabled={isTyping || !!streamingText}
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
            disabled={isTyping || !!streamingText}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !!streamingText || !input.trim()}
            className="w-10 h-10 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
