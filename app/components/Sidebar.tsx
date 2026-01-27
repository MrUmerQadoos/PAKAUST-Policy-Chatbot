// app/components/Sidebar.tsx
import Image from "next/image";
import { BookOpen, Scale, Award, ClipboardCheck, MessageSquare } from "lucide-react";

const sections = [
    { name: "Chat", icon: MessageSquare },
    { name: "Academic Regulations", icon: BookOpen },
    { name: "Code of Conduct", icon: Scale },
    { name: "Examination Policy", icon: ClipboardCheck },
    { name: "Scholarship Criteria", icon: Award },
];

type SidebarProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    return (
        // Added z-index to ensure it appears above content when sliding
        <aside className="w-64 bg-gray-800 p-4 flex flex-col h-full border-r border-gray-700 z-50">
            <div className="flex items-center gap-3 mb-8">
                <Image
                    src="/paf_iast_logo.jfif"
                    alt="PAF-IAST Logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <h2 className="font-semibold text-lg">PAF-IAST</h2>
            </div>
            <nav className="flex flex-col gap-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Menu</p>
                {sections.map((section) => (
                    <button
                        key={section.name}
                        onClick={() => setActiveTab(section.name)}
                        className={`flex w-full items-center gap-3 p-3 rounded-lg text-sm text-gray-200 transition-colors ${activeTab === section.name
                            ? "bg-blue-600 font-semibold"
                            : "hover:bg-gray-700"
                            }`}
                    >
                        <section.icon className="h-5 w-5 flex-shrink-0" />
                        <span>{section.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
