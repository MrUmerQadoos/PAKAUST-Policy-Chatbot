"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, BookOpen } from "lucide-react";

type ChatMessage = {
    id: number;
    from: "user" | "bot";
    text: string;
    sources?: Array<{ content: string; similarity: number }>;
};

export function ChatInterface() {
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

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg: ChatMessage = { id: Date.now(), from: "user", text: input.trim() };
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
                text: data.answer ?? "Sorry, I couldn't find an answer. Please try rephrasing your question.",
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
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 md:p-6 relative z-10">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"
                                } animate-fadeIn`}
                        >
                            {/* Avatar */}
                            <div
                                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${msg.from === "user"
                                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                                    }`}
                            >
                                {msg.from === "user" ? (
                                    <User className="w-5 h-5 text-white" />
                                ) : (
                                    <Bot className="w-5 h-5 text-white" />
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div
                                className={`flex flex-col max-w-[80%] md:max-w-[70%] ${msg.from === "user" ? "items-end" : "items-start"
                                    }`}
                            >
                                <div
                                    className={`rounded-2xl px-5 py-3 shadow-lg hover-lift ${msg.from === "user"
                                        ? "message-user text-white"
                                        : "message-bot text-gray-100"
                                        }`}
                                >
                                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                        {msg.text}
                                    </p>
                                </div>

                                {/* Source Citations */}
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-3 space-y-2 animate-fadeIn">
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <BookOpen className="w-3 h-3" />
                                            Sources from Rule Book:
                                        </p>
                                        {msg.sources.map((source, idx) => (
                                            <div
                                                key={idx}
                                                className="text-xs glass rounded-xl px-4 py-2 text-gray-300 max-w-md"
                                            >
                                                <span className="inline-flex items-center gap-1 text-blue-400 font-semibold mb-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    {(source.similarity * 100).toFixed(0)}% match
                                                </span>
                                                <p className="text-gray-400 line-clamp-2">
                                                    {source.content.substring(0, 120)}...
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {loading && (
                        <div className="flex items-start gap-3 animate-fadeIn">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="message-bot rounded-2xl px-5 py-4 shadow-lg">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full typing-dot"></div>
                                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full typing-dot"></div>
                                    <div className="w-2.5 h-2.5 bg-pink-400 rounded-full typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="relative z-10 border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-lg">
                <div className="max-w-4xl mx-auto p-4">
                    {/* Quick Questions */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {quickQuestions.map((q) => (
                            <button
                                key={q}
                                onClick={() => setInput(q)}
                                className="text-xs glass hover:bg-gray-700/70 text-gray-300 px-3 py-1.5 rounded-full transition-all hover-lift"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input Field */}
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <Input
                                placeholder="Ask about academic rules, exams, scholarships..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                className="bg-gray-800/80 border-gray-700/50 text-white placeholder:text-gray-500 pr-4 py-6 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                        </div>
                        <Button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl px-6 py-6 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 hover:shadow-blue-500/40"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Footer Text */}
                    <p className="text-xs text-gray-500 text-center mt-3">
                        💡 Ask me anything about PAF-IAST Academic Rules and Regulations
                    </p>
                </div>
            </div>
        </div>
    );
}