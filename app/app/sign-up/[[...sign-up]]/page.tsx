// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
      style={{ background: "#0a0e1a" }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full animate-blob"
          style={{
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: "rgba(139,92,246,0.06)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full animate-blob"
          style={{
            bottom: "-10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            background: "rgba(59,130,246,0.06)",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute rounded-full animate-blob"
          style={{
            top: "30%",
            right: "40%",
            width: "350px",
            height: "350px",
            background: "rgba(236,72,153,0.04)",
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="relative inline-block mb-4">
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-8px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
              }}
            />
            <div
              className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))",
                border: "1px solid rgba(139,92,246,0.25)",
                boxShadow: "0 0 20px rgba(139,92,246,0.1)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6"
                style={{ color: "#8b5cf6" }}
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1
            className="font-extrabold tracking-tight"
            style={{ fontSize: "24px", color: "#f3f4f6" }}
          >
            Assist
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ify
            </span>
          </h1>
          <p
            className="font-medium mt-1"
            style={{ fontSize: "13px", color: "#6b7280" }}
          >
            Create your account to get started
          </p>
        </div>

        {/* Clerk SignUp card wrapper */}
        <div
          className="rounded-2xl overflow-hidden animate-fadeIn"
          style={{
            animationDelay: "0.15s",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox:
                  "bg-transparent shadow-none border-none p-0 w-full",
                card: "bg-transparent shadow-none border-none p-6",
                headerTitle:
                  "text-[18px] font-bold text-[#f3f4f6]",
                headerSubtitle:
                  "text-[13px] text-[#6b7280]",
                socialButtonsBlockButton:
                  "bg-white/[0.04] border border-white/[0.08] text-[#e5e7eb] hover:bg-white/[0.06] hover:border-white/[0.12] rounded-xl transition-all duration-300",
                socialButtonsBlockButtonText:
                  "text-[#e5e7eb] font-medium text-[13px]",
                dividerLine: "bg-white/[0.08]",
                dividerText:
                  "text-[#4b5563] text-[11px] font-medium",
                formFieldLabel:
                  "text-[#9ca3af] text-[12px] font-semibold",
                formFieldInput:
                  "bg-white/[0.04] border border-white/[0.08] text-[#e5e7eb] rounded-xl focus:border-[#8b5cf6]/30 focus:ring-2 focus:ring-[#8b5cf6]/10 text-[13px] placeholder:text-[#4b5563]",
                formFieldInputShowPasswordButton:
                  "text-[#6b7280] hover:text-[#9ca3af]",
                formButtonPrimary:
                  "bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:from-[#7c3aed] hover:to-[#db2777] text-white font-semibold rounded-xl text-[13px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_16px_rgba(139,92,246,0.2)]",
                footerActionLink:
                  "text-[#8b5cf6] font-semibold text-[12px] hover:text-[#a78bfa] transition-colors",
                footerActionText:
                  "text-[#6b7280] text-[12px]",
                formHeaderTitle: "text-[#f3f4f6]",
                formHeaderSubtitle: "text-[#6b7280]",
                identityPreviewText: "text-[#9ca3af] text-[13px]",
                identityPreviewEditButton:
                  "text-[#8b5cf6] text-[12px] font-semibold",
                alertText: "text-[13px]",
              },
              variables: {
                colorPrimary: "#8b5cf6",
                colorBackground: "transparent",
                colorInputBackground: "rgba(255,255,255,0.04)",
                colorInputText: "#e5e7eb",
                colorText: "#e5e7eb",
                colorTextSecondary: "#6b7280",
                borderRadius: "0.75rem",
              },
            }}
          />
        </div>

        {/* Footer */}
        <p
          className="text-center font-medium mt-6 animate-fadeIn"
          style={{
            fontSize: "11px",
            color: "#374151",
            animationDelay: "0.3s",
          }}
        >
          Secured by{" "}
          <span style={{ color: "#4b5563" }}>Clerk</span> · Built for PAF-IAST
        </p>
      </div>
    </div>
  );
}