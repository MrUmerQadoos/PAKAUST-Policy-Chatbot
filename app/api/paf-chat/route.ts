// app/api/paf-chat/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Invalid message" },
                { status: 400 }
            );
        }

        // Generate embedding for user query
        const embeddingRes = await openai.embeddings.create({
            model: "text-embedding-3-large",
            input: message,
        });

        const queryEmbedding = embeddingRes.data[0].embedding;

        // Search for similar documents
        const { data: matches, error } = await supabase.rpc("match_documents", {
            query_embedding: queryEmbedding,
            match_count: 5,
            filter: {},
        });

        if (error) {
            console.error("Supabase match_documents error", error);
        }

        console.log(matches, "matches");

        // ✅ LOWERED THRESHOLD from 0.50 to 0.30
        const THRESHOLD = 0.30;
        const topMatch = matches?.[0];

        if (!matches || matches.length === 0 || (topMatch && topMatch.similarity < THRESHOLD)) {
            const generic = `I can help you with questions about PAF-IAST rules and regulations, including Academic Regulations, Code of Conduct, Examination Policy, Scholarship Criteria, and Internship requirements. Please ask something related to these topics.`;
            return NextResponse.json({
                answer: generic,
                sourceChunks: [],
            });
        }

        // Build context from matched documents
        const contextText = matches
            .map((m: any) => m.content)
            .join("\n\n---\n\n");

        const systemPrompt = `
      You are the official PAF-IAST Rule Book Assistant.
      You ONLY answer questions related to PAF-IAST academic rules, policies, and regulations.
      Use the context provided. If something is not in the context, say you don't have that information in the rule book.
      Keep answers clear, accurate, and student-friendly.
      Quote specific rules or policies when relevant.
    `.trim();

        const userPrompt = `
      Context from PAF-IAST Rule Book:
      ${contextText}

      Student question: ${message}

      Answer in a helpful way, referencing specific rules and policies from PAF-IAST.
    `.trim();

        // Generate response using GPT
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 500,
        });

        const answer =
            completion.choices[0]?.message?.content ??
            "Sorry, I couldn't generate a response.";

        return NextResponse.json({
            answer,
            sourceChunks: matches,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}