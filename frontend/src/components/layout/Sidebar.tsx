import { Building2, Bot, Calendar, Home, LogOut, User, Star, Zap } from "lucide-react";
import type { AppPage } from "../../types/navigation";

const navItems: { icon: React.ElementType; label: string; page: AppPage }[] = [
  { icon: Home, label: "Dashboard", page: "dashboard" },
  { icon: Calendar, label: "Events", page: "events" },
  { icon: Building2, label: "Startups", page: "startups" },
  { icon: Bot, label: "AI Assistant", page: "ai-assistant" },
  { icon: Star, label: "Evaluator", page: "evaluator" },
];

export function Sidebar({
  currentPage,
  onNavigate,
}: {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-orange-50 flex flex-col z-30 shadow-sm">
      <div className="p-6 border-b border-orange-50">
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Eventra <span className="text-orange-500">AI</span>
          </span>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 mt-1 mb-1">Main Menu</p>
        {navItems.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentPage === page || (page === "events" && (currentPage === "add-event" || currentPage === "event-details")) || (page === "startups" && currentPage === "startup-detail")
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-orange-50">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">AIC Manager</p>
            <p className="text-xs text-gray-400 truncate">aic@innovationhub.in</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate("landing")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

