import { ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { startups } from "../../data/startups";

export default function StartupDetailsPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
  const s = startups[1];
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Funding", "Mentors", "Timeline"];

  return (
    <DashboardLayout currentPage="startups" onNavigate={onNavigate} title="Startup Details">
      <button
        onClick={() => onNavigate("startups")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors font-medium"
      >
        <ChevronRight size={14} className="rotate-180" />
        Back to Startups
      </button>

      <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm mb-5">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-3xl font-extrabold text-white">{s.name[0]}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{s.name}</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {s.domain} · {s.stage}
                </p>
              </div>
              <Badge variant="success">{s.funding}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
              {[
                ["Founders", s.founders.join(", ")],
                ["Progress", `${s.progress}% complete`],
                ["Next Review", new Date(s.nextReview).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ProgressBar value={s.progress} color="bg-gradient-to-r from-orange-400 to-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === item ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Problem Statement</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                India faces a critical shortage of healthcare professionals in rural areas, with 600M+ people lacking access to timely medical diagnosis and treatment recommendations from qualified doctors.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Solution</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                MediSync is an AI-powered diagnostic assistant that enables community health workers to provide preliminary diagnoses, treatment recommendations, and patient monitoring in low-connectivity rural environments using edge AI.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Sector Details</h3>
              <div className="space-y-2">
                {[
                  ["Sector", "HealthTech / AI"],
                  ["Target Market", "Rural India (Tier 3–4 districts)"],
                  ["Technology", "AI/ML, Edge Computing, Mobile"],
                  ["Current Stage", "Incubated · Growth"],
                  ["Team Size", "8 members"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{label}</span>
                    <span className="text-xs font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "Funding" && (
        <div className="space-y-3">
          {[
            { round: "Pre-Seed", amount: "₹15L", date: "March 2024", source: "AIC Grant", status: "Disbursed" },
            { round: "Seed", amount: "₹75L", date: "September 2024", source: "Angel Network", status: "Disbursed" },
            { round: "Series A", amount: "₹3 Cr", date: "Expected Q3 2025", source: "VC Fund — Target", status: "Pending" },
          ].map(({ round, amount, date, source, status }) => (
            <div key={round} className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">
                  {round} · <span className="text-orange-500">{amount}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {source} · {date}
                </p>
              </div>
              <Badge variant={status === "Disbursed" ? "success" : "warning"}>{status}</Badge>
            </div>
          ))}
        </div>
      )}

      {tab === "Mentors" && (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "Dr. Ashok Mehta", role: "Medical AI Advisor", org: "AIIMS Delhi", sessions: "12" },
            { name: "Priyanka Krishnan", role: "Business Strategy", org: "McKinsey & Co.", sessions: "8" },
            { name: "Rahul Verma", role: "Technology Mentor", org: "Google India", sessions: "15" },
            { name: "Sarita Jain", role: "Regulatory Affairs", org: "MoH&FW", sessions: "5" },
          ].map(({ name, role, org, sessions }) => (
            <div key={name} className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-sm font-bold text-white">
                  {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{name}</p>
                <p className="text-xs text-gray-500">{role}</p>
                <p className="text-xs text-gray-400">{org}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-extrabold text-orange-500">{sessions}</p>
                <p className="text-xs text-gray-400">sessions</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Timeline" && (
        <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-orange-100" />
            <div className="space-y-6">
              {[
                { date: "January 2024", event: "Application Submitted", desc: "Initial application reviewed by AIC evaluation committee", status: "done" },
                { date: "February 2024", event: "Pre-Incubation Started", desc: "Enrolled in 3-month pre-incubation program", status: "done" },
                { date: "May 2024", event: "Incubation Approved", desc: "Graduated to full incubation with office space and mentorship", status: "done" },
                { date: "September 2024", event: "Seed Funding Secured", desc: "₹75L seed round from angel investor network", status: "done" },
                { date: "March 2025", event: "Product Beta Launch", desc: "Beta deployed in 3 pilot districts in Rajasthan", status: "current" },
                { date: "July 2025", event: "Series A Target", desc: "Targeting ₹3 Cr Series A round from VC funds", status: "upcoming" },
              ].map(({ date, event, desc, status }) => (
                <div key={event} className="relative flex gap-5 pl-12">
                  <div
                    className={`absolute left-3.5 w-3.5 h-3.5 rounded-full -translate-x-1/2 mt-1 border-2 border-white ${
                      status === "done" ? "bg-emerald-500" : status === "current" ? "bg-orange-500 ring-4 ring-orange-100" : "bg-gray-200"
                    }`}
                  />
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">{date}</p>
                    <p className="text-sm font-bold text-gray-900">{event}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

