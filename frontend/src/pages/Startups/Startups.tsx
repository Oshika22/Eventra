import { Clock, Users } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { startups } from "../../data/startups";

export default function StartupsPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
  const [section, setSection] = useState<"pre" | "incubated">("pre");
  const pre = startups.filter((startup) => startup.stage === "Pre-Incubation");
  const inc = startups.filter((startup) => startup.stage === "Incubated");
  const list = section === "pre" ? pre : inc;

  const fundingColor = (funding: string) =>
    funding === "Bootstrapped"
      ? "bg-gray-100 text-gray-600"
      : funding === "Seed Funded"
        ? "bg-emerald-100 text-emerald-700"
        : funding === "Angel Funded"
          ? "bg-blue-100 text-blue-700"
          : "bg-purple-100 text-purple-700";

  return (
    <DashboardLayout currentPage="startups" onNavigate={onNavigate} title="Startup Management">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSection("pre")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
            section === "pre"
              ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
          }`}
        >
          Pre-Incubated ({pre.length})
        </button>
        <button
          onClick={() => setSection("incubated")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
            section === "incubated"
              ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
          }`}
        >
          Incubated ({inc.length})
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((startup) => (
          <div
            key={startup.id}
            onClick={() => onNavigate("startup-detail")}
            className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-lg font-bold text-orange-600">{startup.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{startup.name}</h3>
                <p className="text-xs text-gray-500">{startup.domain}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${fundingColor(startup.funding)}`}>
                {startup.funding}
              </span>
              <span className="text-xs font-semibold text-gray-600">{startup.progress}%</span>
            </div>

            <ProgressBar value={startup.progress} />

            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {new Date(startup.nextReview).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
              <span className="flex items-center gap-1">
                <Users size={10} />
                {startup.founders.length} founder{startup.founders.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

