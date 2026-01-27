// app/components/ChatInterface.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

type ChatMessage = {
    id: number;
    from: "user" | "bot";
    text: string;
};

export function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            from: "bot",
            text: "Welcome! I am the PAF-IAST Rule Book assistant. How can I help you today?",
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
            // IMPORTANT: Make sure your API route is correctly set up at '/api/paf-chat'
            const res = await fetch("/api/paf-chat", {
                method: "POST",
                body: JSON.stringify({ message: userMsg.text }),
            });
            const data = await res.json();
            const botMsg: ChatMessage = {
                id: Date.now() + 1,
                from: "bot",
                text: data.answer ?? "Sorry, I couldn't find an answer. Please try rephrasing your question.",
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 2,
                    from: "bot",
                    text: "Oops, an error occurred. Please try again later.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-900">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 pr-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`rounded-lg px-4 py-2 text-sm max-w-[80%] text-white ${msg.from === "user" ? "bg-blue-600" : "bg-gray-700"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="rounded-lg px-4 py-2 text-sm bg-gray-700 text-white">
                                Typing…
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>
            <div className="border-t border-gray-700 p-4 flex gap-2 items-center">
                <Input
                    placeholder="Ask about the PAF-IAST rule book..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className="bg-gray-800 border-gray-600 text-white"
                />
                <Button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
