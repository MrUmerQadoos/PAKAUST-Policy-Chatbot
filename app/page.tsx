// app/page.tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { ChatInterface } from "./components/ChatInterface";
import { AcademicRegulationsTab, CodeOfConductTab, ExaminationPolicyTab, ScholarshipCriteriaTab } from "./components/RuleSectionTabs";

export default function ChatbotPage() {
  const [activeTab, setActiveTab] = useState("Chat");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const getHeaderTitle = () => {
    if (activeTab === "Chat") return "PAF-IAST Rule Book Assistant";
    return activeTab;
  };

  return (
    <main className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* --- Sidebar for Desktop --- */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* --- Mobile Menu (Slider) --- */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsMenuOpen(false); // Close menu on selection
          }}
        />
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 lg:justify-center">
          {/* Hamburger Menu Button for Mobile */}
          <button
            className="lg:hidden z-50 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-lg font-bold text-center">
            {getHeaderTitle()}
          </h1>

          {/* Spacer for mobile to keep title centered */}
          <div className="lg:hidden w-6"></div>
        </header>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "Chat" && <ChatInterface />}
          {activeTab === "Academic Regulations" && <AcademicRegulationsTab />}
          {activeTab === "Code of Conduct" && <CodeOfConductTab />}
          {activeTab === "Examination Policy" && <ExaminationPolicyTab />}
          {activeTab === "Scholarship Criteria" && <ScholarshipCriteriaTab />}
        </div>
      </div>
    </main>
  );
}
