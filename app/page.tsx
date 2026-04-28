// app/page.tsx
"use client";

import { useState } from "react";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import {
  AcademicRegulationsTab,
  CodeOfConductTab,
  ExaminationPolicyTab,
  ScholarshipCriteriaTab,
} from "./components/assistify/AssistifyTabs";
import {
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  MessageSquareIcon,
} from "lucide-react";
import { AssistifySidebar } from "./components/assistify/AssistifySidebar";
import { AssistifyChat } from "./components/assistify/AssistifyChat";

/* ============================================= */
/* ===== LOGO ICON ============================ */
/* ============================================= */
function AssistifyLogoIcon({
  className = "w-5 h-5",
  color = "#3b82f6",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <img
      src="/Logo.png"
      alt="Assistify Logo"
      className={className}
      style={{ color }}
    />
  );
}

/* ============================================= */
/* ===== LANDING PAGE (Not Logged In) ========= */
/* ============================================= */
function LandingPage() {
  return (
    <div className="flex h-screen bg-[#0a0e1a] text-white overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full animate-blob"
          style={{
            top: "-10%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background: "rgba(59,130,246,0.07)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full animate-blob"
          style={{
            top: "20%",
            right: "-10%",
            width: "400px",
            height: "400px",
            background: "rgba(139,92,246,0.07)",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute rounded-full animate-blob"
          style={{
            bottom: "-10%",
            left: "30%",
            width: "450px",
            height: "450px",
            background: "rgba(236,72,153,0.05)",
            filter: "blur(80px)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "12%", left: "8%", size: 3, delay: "0s", color: "rgba(59,130,246,0.4)" },
          { top: "22%", right: "12%", size: 4, delay: "1.2s", color: "rgba(139,92,246,0.35)" },
          { top: "55%", left: "15%", size: 3, delay: "2.4s", color: "rgba(236,72,153,0.3)" },
          { top: "65%", right: "20%", size: 4, delay: "0.6s", color: "rgba(59,130,246,0.3)" },
          { top: "35%", left: "4%", size: 2, delay: "1.8s", color: "rgba(139,92,246,0.25)" },
          { top: "78%", right: "8%", size: 3, delay: "3s", color: "rgba(59,130,246,0.25)" },
          { top: "8%", right: "35%", size: 2, delay: "0.9s", color: "rgba(236,72,153,0.2)" },
          { top: "88%", left: "40%", size: 2, delay: "2.1s", color: "rgba(139,92,246,0.2)" },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-blob"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              animationDelay: p.delay,
              animationDuration: "6s",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 animate-fadeIn">
          <div className="relative mb-5">
            <div
              className="absolute pointer-events-none animate-pulse"
              style={{
                inset: "-12px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)",
              }}
            />
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))",
                border: "1px solid rgba(59,130,246,0.25)",
                boxShadow: "0 0 30px rgba(59,130,246,0.12)",
              }}
            >
              <AssistifyLogoIcon className="w-8 h-8" color="#3b82f6" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-white">Assist</span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ify
            </span>
          </h1>
          <p
            className="font-semibold uppercase tracking-[0.16em] mt-1"
            style={{ fontSize: "10px", color: "#4b5563" }}
          >
            PAF-IAST Rule Book Assistant
          </p>
        </div>

        {/* Hero text */}
        <div
          className="text-center max-w-xl mb-8 animate-fadeIn"
          style={{ animationDelay: "0.15s" }}
        >
          <h2
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontSize: "clamp(26px, 5vw, 42px)",
              lineHeight: "1.1",
            }}
          >
            <span className="text-white">Your AI-Powered </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Academic Guide
            </span>
          </h2>
          <p
            className="font-medium max-w-md mx-auto"
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              color: "#6b7280",
            }}
          >
            Instantly find answers about academic regulations, examinations,
            scholarships, and code of conduct — powered by AI.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex items-center gap-4 mb-10 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          <SignInButton mode="modal">
            <button
              className="inline-flex items-center gap-2 px-7 py-[12px] rounded-xl font-bold text-white text-[14px] transition-all duration-300 hover:scale-[1.05] active:scale-[0.97] group"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                boxShadow:
                  "0 6px 24px rgba(59,130,246,0.25), 0 2px 8px rgba(139,92,246,0.15)",
              }}
            >
              <SparklesIcon className="w-4 h-4" strokeWidth={2} />
              Get Started
              <ArrowRightIcon
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </button>
          </SignInButton>

          <SignInButton mode="modal">
            <button
              className="inline-flex items-center gap-2 px-6 py-[12px] rounded-xl font-semibold text-white text-[14px] transition-all duration-300 hover:scale-[1.04] hover:bg-white/[0.06]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </div>

        {/* Feature pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 animate-fadeIn"
          style={{ animationDelay: "0.45s" }}
        >
          {[
            {
              icon: <MessageSquareIcon className="w-3.5 h-3.5" />,
              text: "AI Chat",
              color: "#3b82f6",
            },
            {
              icon: <BookOpenIcon className="w-3.5 h-3.5" />,
              text: "Rule Book Search",
              color: "#8b5cf6",
            },
            {
              icon: <ShieldCheckIcon className="w-3.5 h-3.5" />,
              text: "Instant Answers",
              color: "#ec4899",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span style={{ color: feature.color }}>{feature.icon}</span>
              <span
                className="font-medium"
                style={{ fontSize: "12px", color: "#9ca3af" }}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================= */
/* ===== CHAT PAGE (Logged In) ================ */
/* ============================================= */
function ChatPage() {
  const [activeTab, setActiveTab] = useState("Chat");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getHeaderTitle = () => {
    if (activeTab === "Chat") return "PAF-IAST Rule Book Assistant";
    return activeTab;
  };

  return (
    <main className="flex h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Sidebar — Desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <AssistifySidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AssistifySidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsMenuOpen(false);
          }}
        />
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="flex items-center justify-between px-5 py-3 lg:justify-center"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(10,14,26,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <button
            className="lg:hidden z-50 text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <h1
            className="font-bold text-center"
            style={{ fontSize: "15px", color: "#e5e7eb" }}
          >
            {getHeaderTitle()}
          </h1>
          <div className="lg:hidden w-6" />
        </header>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "Chat" && <AssistifyChat />}
          {activeTab === "Academic Regulations" && <AcademicRegulationsTab />}
          {activeTab === "Code of Conduct" && <CodeOfConductTab />}
          {activeTab === "Examination Policy" && <ExaminationPolicyTab />}
          {activeTab === "Scholarship Criteria" && <ScholarshipCriteriaTab />}
        </div>
      </div>
    </main>
  );
}

/* ============================================= */
/* ===== MAIN EXPORT ========================== */
/* ============================================= */
export default function ChatbotPage() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return <ChatPage />;
}