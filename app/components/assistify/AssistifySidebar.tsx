
"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  BookOpen,
  Scale,
  Award,
  ClipboardCheck,
  MessageSquare,
  GraduationCap,
  LogOutIcon,
  ChevronUpIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

/* ===== LOGO ICON ===== */
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

/* ===== NAV ITEMS ===== */
const sections = [
  {
    name: "Chat",
    icon: MessageSquare,
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.12)",
    iconBg: "rgba(59,130,246,0.1)",
    iconBorder: "rgba(59,130,246,0.2)",
  },
  {
    name: "Academic Regulations",
    icon: BookOpen,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.12)",
    iconBg: "rgba(139,92,246,0.1)",
    iconBorder: "rgba(139,92,246,0.2)",
  },
  {
    name: "Code of Conduct",
    icon: Scale,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.12)",
    iconBg: "rgba(236,72,153,0.1)",
    iconBorder: "rgba(236,72,153,0.2)",
  },
  {
    name: "Examination Policy",
    icon: ClipboardCheck,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    iconBg: "rgba(245,158,11,0.1)",
    iconBorder: "rgba(245,158,11,0.2)",
  },
  {
    name: "Scholarship Criteria",
    icon: Award,
    color: "#10b981",
    glow: "rgba(16,185,129,0.12)",
    iconBg: "rgba(16,185,129,0.1)",
    iconBorder: "rgba(16,185,129,0.2)",
  },
];

/* ===== USER MENU ===== */
function UserMenu() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "User";
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const initials = (firstName[0] || "") + (lastName[0] || "");
  const avatarUrl = user?.imageUrl;

  return (
    <div className="relative">
      {/* User button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-[10px] rounded-xl transition-all duration-300 hover:bg-white/[0.03]"
        style={{
          border: isOpen
            ? "1px solid rgba(59,130,246,0.15)"
            : "1px solid transparent",
          background: isOpen ? "rgba(59,130,246,0.06)" : "transparent",
        }}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-8 h-8 rounded-lg object-cover"
              style={{
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 0 10px rgba(59,130,246,0.08)",
              }}
            />
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <span
                className="font-bold"
                style={{ fontSize: "11px", color: "#3b82f6" }}
              >
                {initials || "?"}
              </span>
            </div>
          )}
          {/* Online dot */}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
            style={{
              background: "#10b981",
              border: "2px solid #0a0e1a",
              boxShadow: "0 0 6px rgba(16,185,129,0.4)",
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-left">
          <p
            className="font-semibold truncate"
            style={{ fontSize: "12.5px", color: "#e5e7eb" }}
          >
            {fullName}
          </p>
          <p
            className="font-medium truncate"
            style={{ fontSize: "10px", color: "#4b5563" }}
          >
            {email}
          </p>
        </div>

        {/* Chevron */}
        <ChevronUpIcon
          className="w-3.5 h-3.5 shrink-0 transition-transform duration-300"
          style={{
            color: "#4b5563",
            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute bottom-full left-0 right-0 mb-2 rounded-xl overflow-hidden animate-fadeIn"
          style={{
            background: "rgba(15,20,35,0.98)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* User info header */}
          <div
            className="px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(59,130,246,0.04)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-9 h-9 rounded-lg object-cover"
                    style={{
                      border: "1px solid rgba(59,130,246,0.2)",
                    }}
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))",
                      border: "1px solid rgba(59,130,246,0.2)",
                    }}
                  >
                    <UserIcon
                      className="w-4 h-4"
                      style={{ color: "#3b82f6" }}
                    />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p
                  className="font-semibold truncate"
                  style={{ fontSize: "13px", color: "#f3f4f6" }}
                >
                  {fullName}
                </p>
                <p
                  className="font-medium truncate"
                  style={{ fontSize: "11px", color: "#6b7280" }}
                >
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-1.5">
            <SignOutButton>
              <button
                className="w-full flex items-center gap-3 px-3 py-[9px] rounded-lg transition-all duration-300 hover:bg-white/[0.04]"
                style={{ color: "#ef4444" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.12)",
                  }}
                >
                  <LogOutIcon className="w-3.5 h-3.5" />
                </div>
                <span
                  className="font-semibold"
                  style={{ fontSize: "12.5px" }}
                >
                  Sign Out
                </span>
              </button>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== SIDEBAR ===== */
type AssistifySidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function AssistifySidebar({ activeTab, setActiveTab }: AssistifySidebarProps) {
  return (
    <aside
      className="w-64 flex flex-col h-full relative overflow-hidden"
      style={{
        background: "rgba(10,14,26,0.97)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Ambient glow — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-30px",
          left: "-15px",
          width: "160px",
          height: "100px",
          background: "rgba(59,130,246,0.06)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      />
      {/* Ambient glow — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-30px",
          right: "-15px",
          width: "140px",
          height: "80px",
          background: "rgba(139,92,246,0.04)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      />

      {/* ── Logo ── */}
      <div className="relative z-10 px-5 pt-5 pb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-5px",
                borderRadius: "14px",
                background: "rgba(59,130,246,0.2)",
                filter: "blur(10px)",
              }}
            />
            <div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))",
                border: "1px solid rgba(59,130,246,0.25)",
                boxShadow: "0 0 16px rgba(59,130,246,0.1)",
              }}
            >
              <AssistifyLogoIcon className="w-5 h-5" color="#3b82f6" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-[16px] leading-none tracking-tight">
              Assist
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ify
              </span>
            </span>
            <span
              className="font-bold uppercase tracking-[0.12em] mt-[3px]"
              style={{ fontSize: "8.5px", color: "#4b5563" }}
            >
              PAF-IAST Assistant
            </span>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="mx-4 mb-3"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      {/* ── Section Label ── */}
      <div className="px-5 mb-2">
        <span
          className="font-bold uppercase tracking-[0.14em]"
          style={{ fontSize: "9.5px", color: "#374151" }}
        >
          Navigation
        </span>
      </div>

      {/* ── Nav Items ── */}
      <nav className="relative z-10 flex flex-col gap-1 px-3 flex-1">
        {sections.map((section) => {
          const isActive = activeTab === section.name;
          const Icon = section.icon;

          return (
            <button
              key={section.name}
              onClick={() => setActiveTab(section.name)}
              className="relative flex items-center gap-3 px-3 py-[9px] rounded-xl transition-all duration-300 group"
              style={{
                background: isActive ? section.glow : "transparent",
                border: isActive
                  ? `1px solid ${section.color}20`
                  : "1px solid transparent",
              }}
            >
              {/* Active left bar */}
              {isActive && (
                <div
                  className="absolute left-0 top-[18%] bottom-[18%] w-[3px] rounded-full transition-all duration-300"
                  style={{
                    background: section.color,
                    boxShadow: `0 0 8px ${section.color}50`,
                  }}
                />
              )}

              {/* Icon container */}
              <div
                className="relative w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  background: isActive
                    ? section.iconBg
                    : "rgba(255,255,255,0.02)",
                  border: isActive
                    ? `1px solid ${section.iconBorder}`
                    : "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <Icon
                  className="w-3.5 h-3.5 transition-all duration-300"
                  style={{
                    color: isActive ? section.color : "#4b5563",
                    strokeWidth: isActive ? 2 : 1.5,
                  }}
                />
                {/* Active icon glow */}
                {isActive && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      inset: "-3px",
                      borderRadius: "8px",
                      background: `${section.color}08`,
                      filter: "blur(4px)",
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className="font-semibold transition-all duration-300 truncate"
                style={{
                  fontSize: "12.5px",
                  color: isActive ? "#f3f4f6" : "#6b7280",
                }}
              >
                {section.name}
              </span>

              {/* Hover glow (inactive only) */}
              {!isActive && (
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Bottom Section ── */}
      <div className="relative z-10 px-3 pb-4 space-y-3">
        {/* Divider */}
        <div
          className="mx-1"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
          }}
        />

        {/* PAF-IAST info */}
        <div
          className="flex items-center gap-3 px-3 py-[8px] rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04))",
            border: "1px solid rgba(59,130,246,0.1)",
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <GraduationCap
              className="w-3.5 h-3.5"
              style={{ color: "#3b82f6" }}
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className="font-semibold truncate"
              style={{ fontSize: "11.5px", color: "#93c5fd" }}
            >
              PAF-IAST
            </span>
            <span
              className="font-medium"
              style={{ fontSize: "9.5px", color: "#4b5563" }}
            >
              Rule Book v2021
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mx-1"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
          }}
        />

        {/* User menu */}
        <UserMenu />
      </div>
    </aside>
  );
}
