// components/assistify/AssistifyChat.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, BookOpen, ArrowUpRight } from "lucide-react";

type ChatMessage = {
  id: number;
  from: "user" | "bot";
  text: string;
  sources?: Array<{ content: string; similarity: number }>;
};

/* ===== SOURCE CARD ===== */
function SourceCard({
  source,
  index,
}: {
  source: { content: string; similarity: number };
  index: number;
}) {
  return (
    <div
      className="rounded-xl px-4 py-3 max-w-sm animate-fadeIn"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center"
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.15)",
          }}
        >
          <Sparkles className="w-3 h-3" style={{ color: "#3b82f6" }} />
        </div>
        <span
          className="font-bold"
          style={{ fontSize: "11px", color: "#3b82f6" }}
        >
          {(source.similarity * 100).toFixed(0)}% match
        </span>
      </div>
      <p
        className="font-medium line-clamp-2"
        style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }}
      >
        {source.content.substring(0, 140)}...
      </p>
    </div>
  );
}

/* ===== TYPING INDICATOR ===== */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fadeIn">
      <div
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <Bot className="w-4 h-4" style={{ color: "#8b5cf6" }} />
      </div>
      <div
        className="rounded-2xl px-5 py-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full typing-dot"
              style={{
                background:
                  i === 0
                    ? "#3b82f6"
                    : i === 1
                    ? "#8b5cf6"
                    : "#ec4899",
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== MESSAGE BUBBLE ===== */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.from === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      } animate-fadeIn`}
    >
      {/* Avatar */}
      <div
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: isUser
            ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.08))"
            : "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))",
          border: isUser
            ? "1px solid rgba(59,130,246,0.25)"
            : "1px solid rgba(139,92,246,0.2)",
          boxShadow: isUser
            ? "0 0 12px rgba(59,130,246,0.08)"
            : "0 0 12px rgba(139,92,246,0.06)",
        }}
      >
        {isUser ? (
          <User className="w-4 h-4" style={{ color: "#3b82f6" }} />
        ) : (
          <Bot className="w-4 h-4" style={{ color: "#8b5cf6" }} />
        )}
      </div>

      {/* Bubble + Sources */}
      <div
        className={`flex flex-col max-w-[80%] md:max-w-[70%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className="rounded-2xl px-5 py-3 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: isUser
              ? "linear-gradient(135deg, #3b82f6, #2563eb)"
              : "rgba(255,255,255,0.04)",
            border: isUser
              ? "1px solid rgba(59,130,246,0.3)"
              : "1px solid rgba(255,255,255,0.06)",
            boxShadow: isUser
              ? "0 4px 16px rgba(59,130,246,0.15)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            borderTopRightRadius: isUser ? "6px" : undefined,
            borderTopLeftRadius: !isUser ? "6px" : undefined,
          }}
        >
          <p
            className="font-medium leading-relaxed whitespace-pre-wrap"
            style={{
              fontSize: "13.5px",
              color: isUser ? "#fff" : "#e5e7eb",
              lineHeight: "1.65",
            }}
          >
            {msg.text}
          </p>
        </div>

        {/* Source Citations */}
        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-3 space-y-2 animate-fadeIn">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.1)",
              }}
            >
              <BookOpen className="w-3 h-3" style={{ color: "#3b82f6" }} />
              <span
                className="font-semibold"
                style={{ fontSize: "10px", color: "#3b82f6" }}
              >
                Sources from Rule Book
              </span>
            </div>
            {msg.sources.map((source, idx) => (
              <SourceCard key={idx} source={source} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== QUICK QUESTION PILL ===== */
function QuickPill({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-xl transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span
        className="font-medium"
        style={{ fontSize: "12px", color: "#9ca3af" }}
      >
        {text}
      </span>
      <ArrowUpRight
        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: "#3b82f6" }}
      />
    </button>
  );
}

/* ===== MAIN CHAT INTERFACE ===== */
export function AssistifyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: "bot",
      text: "👋 Welcome! I'm your PAF-IAST Rule Book assistant. Ask me anything about academic regulations, examinations, scholarships, or internships!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      from: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/paf-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        from: "bot",
        text:
          data.answer ??
          "Sorry, I couldn't find an answer. Please try rephrasing your question.",
        sources: data.sourceChunks?.slice(0, 2),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          from: "bot",
          text: "⚠️ Oops, an error occurred. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What is minimum CGPA?",
    "Attendance rules?",
    "Internship requirements?",
    "How to repeat a course?",
  ];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full animate-blob"
          style={{
            top: "-5%",
            left: "-5%",
            width: "300px",
            height: "300px",
            background: "rgba(59,130,246,0.04)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full animate-blob"
          style={{
            top: "30%",
            right: "-5%",
            width: "250px",
            height: "250px",
            background: "rgba(139,92,246,0.04)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute rounded-full animate-blob"
          style={{
            bottom: "-5%",
            left: "20%",
            width: "280px",
            height: "280px",
            background: "rgba(236,72,153,0.03)",
            filter: "blur(60px)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {loading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        className="relative z-10"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(10,14,26,0.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-4xl mx-auto p-4">
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((q) => (
              <QuickPill
                key={q}
                text={q}
                onClick={() => sendMessage(q)}
              />
            ))}
          </div>

          {/* Input Row */}
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ask about academic rules, exams, scholarships..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="w-full rounded-xl px-5 py-[14px] font-medium transition-all duration-300 focus:outline-none disabled:opacity-50"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e5e7eb",
                  fontSize: "13.5px",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(59,130,246,0.08), inset 0 1px 2px rgba(0,0,0,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px 2px rgba(0,0,0,0.1)";
                }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.06] active:scale-[0.95] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: input.trim()
                  ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                  : "rgba(255,255,255,0.06)",
                border: input.trim()
                  ? "1px solid rgba(59,130,246,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: input.trim()
                  ? "0 4px 16px rgba(59,130,246,0.2)"
                  : "none",
              }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Footer */}
          <p
            className="text-center font-medium mt-3"
            style={{ fontSize: "11px", color: "#374151" }}
          >
            💡 Ask me anything about PAF-IAST Academic Rules and Regulations
          </p>
        </div>
      </div>
    </div>
  );
}