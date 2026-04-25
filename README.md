# PAF-IAST Rule Book Assistant - RAG Chatbot

A sophisticated Retrieval-Augmented Generation (RAG) chatbot built with Next.js 14, designed to help students and faculty navigate the PAF-IAST (Pakistan Air Force Institute of Aviation Technology) academic rulebook efficiently. This intelligent assistant provides instant, context-aware answers to queries about academic regulations, examination policies, scholarship criteria, and more.

## 🚀 Live Demo
[Coming Soon] - Deploy on Vercel for instant access

## ✨ Features

### 🤖 **Intelligent RAG Chatbot**
- **Semantic Search**: Uses OpenAI embeddings to understand natural language queries
- **Context-Aware Responses**: Retrieves relevant rulebook sections before generating answers
- **Multi-Tab Interface**: Separate sections for different rule categories
- **Conversation History**: Maintains chat context for follow-up questions

### 📚 **Rulebook Sections**
- **Academic Regulations**: Semester structure, credit hours, course loads
- **Examination Policy**: Grading system, attendance requirements, re-examination rules
- **Scholarship Criteria**: Eligibility, merit-based awards, financial aid
- **Code of Conduct**: Student behavior, disciplinary actions, ethics

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly interface with Tailwind CSS styling
- **Interactive Components**: Radix UI components for smooth interactions
- **Real-time Chat**: Streaming responses with typing indicators

### 🔧 **Technical Features**
- **Vector Database**: Supabase PostgreSQL with pgvector for efficient similarity search
- **Document Processing**: Automated text splitting and embedding generation
- **Authentication**: Clerk integration for user management (login/signup)
- **API Routes**: Separate endpoints for different chatbot functionalities

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

### **Backend & AI**
- **OpenAI API** - GPT-4 for chat completions and text-embedding-3-large for embeddings
- **LangChain** - Document processing and text splitting
- **Supabase** - PostgreSQL database with pgvector extension
- **Clerk** - Authentication and user management

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PNPM** - Fast package management
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
rag-chatbot/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── chat/          # Main chatbot API
│   │   └── paf-chat/      # Alternative chatbot API
│   ├── components/        # React components
│   │   ├── ChatInterface.tsx
│   │   ├── RuleSectionTabs.tsx
│   │   └── Sidebar.tsx
│   ├── login/             # Authentication pages
│   ├── signup/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Shared UI components
│   └── ui/               # Radix UI based components
├── data/                  # Data files
│   ├── paf-iast-rulebook.txt  # Rulebook document
│   └── products.ts        # Sample data
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
├── scripts/               # Processing scripts
│   └── process-documents.ts  # Document embedding script
├── public/                # Static assets
└── documents/             # Additional documents
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PNPM package manager (`npm install -g pnpm`)
- OpenAI API key
- Supabase account with pgvector enabled
- Clerk account for authentication

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rag-chatbot.git
cd rag-chatbot
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. **Set up Supabase Database**
- Create a new Supabase project
- Enable pgvector extension
- Run the following SQL to create the documents table:

```sql
-- Enable the pgvector extension
create extension if not exists vector;

-- Create documents table
create table documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(3072)  -- For text-embedding-3-large
);

-- Create function for similarity search
create or replace function match_documents (
  query_embedding vector(3072),
  match_count int default 5,
  filter jsonb default '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Create index for faster similarity search
create index on documents using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
```

5. **Process the rulebook document**
```bash
pnpm embed
```
This script will:
- Read the `data/paf-iast-rulebook.txt` file
- Split it into chunks using LangChain's RecursiveCharacterTextSplitter
- Generate embeddings using OpenAI's text-embedding-3-large
- Store embeddings in Supabase

6. **Run the development server**
```bash
pnpm dev
```

7. **Open your browser**
Navigate to `http://localhost:3000` to see the application.

## 📊 How It Works

### 1. **Document Processing Pipeline**
```
Rulebook Text → Text Splitting → Embedding Generation → Vector Storage
```

### 2. **Query Processing Flow**
```
User Query → Embedding Generation → Similarity Search → Context Retrieval → GPT Response
```

### 3. **API Endpoints**

#### **Main Chatbot API** (`POST /api/chat`)
```json
Request:
{
  "message": "What is the minimum CGPA for scholarship?"
}

Response:
{
  "response": "According to PAF-IAST rules, the minimum CGPA required for scholarship is 3.50...",
  "sources": [
    {
      "content": "Scholarship Criteria: Minimum CGPA 3.50 required...",
      "similarity": 0.85
    }
  ]
}
```

#### **Alternative Chat API** (`POST /api/paf-chat`)
- Simplified version without RAG
- Direct OpenAI completion
- Faster response time for general queries

#### **API Response Format**
```typescript
interface ChatResponse {
  response: string;
  sources?: Array<{
    content: string;
    similarity: number;
    metadata?: Record<string, any>;
  }>;
  error?: string;
}
```

#### **Error Handling**
- `400` - Invalid request format
- `500` - Internal server error
- `429` - Rate limit exceeded
- `503` - Service unavailable (OpenAI/Supabase down)

## 🔧 Configuration

### Customizing the Rulebook
1. Replace `data/paf-iast-rulebook.txt` with your own document
2. Update the text splitting parameters in `scripts/process-documents.ts`:
```typescript
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
```

### Adjusting Similarity Threshold
Modify the threshold in `app/api/chat/route.ts`:
```typescript
const THRESHOLD = 0.50; // Adjust between 0.3-0.7 based on accuracy needs
```

### Changing AI Model
Update the model in the API routes:
```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4", // or "gpt-3.5-turbo"
  messages: [...],
});
```

## 📱 Usage Examples

### Academic Regulations Queries
- "What is the minimum CGPA required for scholarship?"
- "How many credit hours can I take in a semester?"
- "What are the attendance requirements for exams?"

### Examination Policy Queries
- "What happens if I fail a course?"
- "How is the GPA calculated?"
- "Can I apply for re-examination?"

### General Queries
- "Explain the academic calendar"
- "What are the library rules?"
- "How to apply for leave of absence?"

## 🧪 Testing

### Run ESLint
```bash
pnpm lint
```

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

## 🚢 Deployment

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic CI/CD

### Environment Variables for Production
Ensure all environment variables from `.env.local` are set in your deployment platform.

### ⚠️ Common Vercel Deployment Issues

#### **API Routes Not Working on Vercel**
If your APIs are not working on Vercel, check these common issues:

1. **Environment Variables Missing**
   - Verify all required environment variables are set in Vercel dashboard
   - Check variable names match exactly with your code
   - Re-deploy after adding new environment variables

2. **CORS Issues**
   - Add proper CORS headers in your API routes
   - Update `next.config.ts` with appropriate CORS configuration

3. **Supabase Connection Issues**
   - Ensure Supabase project is in same region as Vercel deployment
   - Check if Supabase project allows connections from Vercel domain
   - Verify database functions (`match_documents`) are properly created

4. **OpenAI API Key Restrictions**
   - Ensure OpenAI API key has sufficient credits
   - Check if API key has usage limits or regional restrictions

5. **Build Configuration**
   - Ensure `next.config.ts` doesn't have restrictive settings
   - Check build logs for any compilation errors

#### **Quick Fixes for API Issues**
```typescript
// In next.config.ts - Add CORS headers
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};
```

#### **Testing API Endpoints Locally**
```bash
# Test chat API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the minimum CGPA for scholarship?"}'

# Test document processing
curl -X POST http://localhost:3000/api/process-documents
```

## 📈 Performance Optimization

### Vector Search Optimization
- Use appropriate `match_count` (default: 5)
- Implement caching for frequent queries
- Consider using HNSW index for larger datasets

### Response Time Improvements
- Implement streaming responses
- Cache embeddings for common queries
- Use edge functions for API routes

## 🔒 Security Considerations

1. **API Keys**: Never commit `.env.local` to version control
2. **Rate Limiting**: Implement rate limiting on API endpoints
3. **Input Validation**: Sanitize user inputs to prevent injection attacks
4. **CORS**: Configure CORS appropriately for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT models and embeddings
- **Supabase** for vector database infrastructure
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework
- **PAF-IAST** for the academic rulebook content

## 🔍 Troubleshooting Guide

### **API Not Responding on Vercel**
If you're getting generic responses like "I can help you with questions about PAF-IAST rules..." instead of specific answers:

1. **Check Environment Variables**
   ```bash
   # Verify in Vercel dashboard
   NEXT_PUBLIC_SUPABASE_URL ✅
   SUPABASE_ANON_KEY ✅
   SUPABASE_SERVICE_ROLE_KEY ✅
   OPENAI_API_KEY ✅
   ```

2. **Test Supabase Connection**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT COUNT(*) FROM documents;
   SELECT * FROM documents LIMIT 1;
   ```

3. **Test OpenAI Embeddings**
   ```bash
   # Test embedding generation locally
   node -e "const { OpenAI } = require('openai'); console.log('OpenAI loaded')"
   ```

4. **Check API Logs**
   - Go to Vercel dashboard → Deployment → Functions
   - Check `/api/chat` function logs
   - Look for errors in Supabase or OpenAI calls

### **Common Error Messages & Solutions**

#### **"No good matches found"**
- Increase similarity threshold in `app/api/chat/route.ts`
- Add more documents to the database
- Improve document chunking strategy

#### **"OpenAI API Error"**
- Verify API key is valid and has credits
- Check rate limits
- Ensure model is available in your region

#### **"Supabase Connection Failed"**
- Check if Supabase project is active
- Verify database functions exist
- Ensure network allows connections

### **Debugging Steps**
1. **Local Testing First**
   ```bash
   pnpm dev
   # Test API at http://localhost:3000/api/chat
   ```

2. **Check Database Content**
   ```bash
   pnpm embed  # Re-process documents
   ```

3. **Monitor Network Requests**
   - Use browser DevTools → Network tab
   - Check request/response payloads
   - Verify CORS headers

## 📞 Support

For issues, questions, or feature requests:
1. Check the [Issues](https://github.com/yourusername/rag-chatbot/issues) page
2. Create a new issue with detailed description including:
   - Error messages from console
   - Steps to reproduce
   - Environment (local/Vercel)
   - Browser/Node.js versions
3. Include relevant logs and screenshots

## 🎯 Roadmap

- [ ] Add multilingual support
- [ ] Implement voice input/output
- [ ] Add document upload functionality
- [ ] Create admin dashboard for content management
- [ ] Implement analytics for query patterns
- [ ] Add export functionality for conversations
- [ ] Integrate with calendar for academic dates

---

**Built with ❤️ for PAF-IAST students and faculty**

*Making academic rule navigation simple and intelligent*
