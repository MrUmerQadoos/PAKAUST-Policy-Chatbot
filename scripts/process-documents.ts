import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from "dotenv";

// Load environment variables from .env (not .env.local)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Debug: Check if env vars are loaded
console.log("🔍 Checking environment variables...");
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Found" : "❌ Missing");
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Found" : "❌ Missing");
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "✅ Found" : "❌ Missing");

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error("\n❌ Error: NEXT_PUBLIC_SUPABASE_URL is missing from .env");
    process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("\n❌ Error: SUPABASE_SERVICE_ROLE_KEY is missing from .env");
    process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
    console.error("\n❌ Error: OPENAI_API_KEY is missing from .env");
    process.exit(1);
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function embed() {
    console.log("\n🚀 Starting embedding process...\n");

    const filePath = path.join(process.cwd(), "data", "paf-iast-rulebook.txt");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: File not found at ${filePath}`);
        console.log("\n📝 Please create the file: data/paf-iast-rulebook.txt");
        process.exit(1);
    }

    const rawText = fs.readFileSync(filePath, "utf-8");
    console.log(`📄 File loaded: paf-iast-rulebook.txt`);
    console.log(`📏 File size: ${(rawText.length / 1024).toFixed(2)} KB`);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 800,
        chunkOverlap: 150,
    });

    const chunks = await splitter.splitText(rawText);

    console.log(`✂️  Total chunks created: ${chunks.length}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        try {
            const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-large",
                input: chunk,
            });

            const embedding = embeddingRes.data[0].embedding;

            const { error } = await supabase.from("documents").insert({
                content: chunk,
                metadata: { source: "PAF-IAST Rulebook" },
                embedding
            });

            if (error) {
                console.error(`❌ Error inserting chunk ${i + 1}:`, error.message);
                errorCount++;
            } else {
                successCount++;
                process.stdout.write(`\r✅ Progress: ${successCount}/${chunks.length} chunks inserted`);
            }

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error: any) {
            console.error(`\n❌ Error processing chunk ${i + 1}:`, error.message);
            errorCount++;
        }
    }

    console.log(`\n\n📊 Summary:`);
    console.log(`✅ Success: ${successCount} chunks`);
    console.log(`❌ Errors: ${errorCount} chunks`);
    console.log("\n🎉 Embedding completed!");
}

embed().catch((error) => {
    console.error("\n❌ Fatal error:", error.message);
    process.exit(1);
});