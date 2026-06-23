import { useState, useRef, useEffect } from "react";
import {
  Home, Calendar, Building2, Bot, Star, Menu, X, Bell, Search,
  Plus, TrendingUp, Users, Zap, Award, ChevronRight, Upload,
  MessageSquare, Send, Sparkles, FileText, Settings,
  ArrowRight, CheckCircle, Target, Lightbulb, Rocket, Globe,
  Clock, Download, LogOut, User
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────
type Page =
  | "landing"
  | "dashboard"
  | "events"
  | "add-event"
  | "event-details"
  | "startups"
  | "startup-detail"
  | "ai-assistant"
  | "evaluator";

// ── Mock data ───────────────────────────────────────────────────────────────
const startupGrowthData = [
  { month: "Jan", startups: 12, incubated: 8 },
  { month: "Feb", startups: 15, incubated: 10 },
  { month: "Mar", startups: 18, incubated: 12 },
  { month: "Apr", startups: 22, incubated: 15 },
  { month: "May", startups: 28, incubated: 18 },
  { month: "Jun", startups: 35, incubated: 22 },
];

const eventParticipationData = [
  { month: "Jan", workshops: 4, hackathons: 2, seminars: 3 },
  { month: "Feb", workshops: 6, hackathons: 3, seminars: 4 },
  { month: "Mar", workshops: 5, hackathons: 4, seminars: 2 },
  { month: "Apr", workshops: 8, hackathons: 2, seminars: 5 },
  { month: "May", workshops: 7, hackathons: 5, seminars: 3 },
  { month: "Jun", workshops: 9, hackathons: 3, seminars: 6 },
];

const fundingData = [
  { name: "Seed", value: 40, color: "#F97316" },
  { name: "Angel", value: 25, color: "#FB923C" },
  { name: "Pre-Series A", value: 20, color: "#FDBA74" },
  { name: "Bootstrapped", value: 15, color: "#FED7AA" },
];

const events = [
  { id: 1, name: "AI Innovation Hackathon 2025", category: "Hackathon", date: "2025-07-15", participants: 245, status: "Upcoming" },
  { id: 2, name: "Startup Pitch Workshop", category: "Workshop", date: "2025-07-08", participants: 89, status: "Active" },
  { id: 3, name: "Deep Tech Seminar", category: "Seminar", date: "2025-06-28", participants: 156, status: "Completed" },
  { id: 4, name: "FinTech Bootcamp", category: "Bootcamp", date: "2025-07-22", participants: 67, status: "Upcoming" },
  { id: 5, name: "AgriTech Innovation Day", category: "Workshop", date: "2025-07-05", participants: 120, status: "Active" },
  { id: 6, name: "Women in Tech Leadership", category: "Seminar", date: "2025-06-20", participants: 200, status: "Completed" },
];

const startups = [
  { id: 1, name: "AgroSense AI", domain: "AgriTech", stage: "Pre-Incubation", funding: "Bootstrapped", progress: 35, nextReview: "2025-07-10", founders: ["Arjun Sharma", "Priya Patel"] },
  { id: 2, name: "MediSync", domain: "HealthTech", stage: "Incubated", funding: "Seed Funded", progress: 72, nextReview: "2025-07-18", founders: ["Dr. Ravi Kumar", "Anita Singh"] },
  { id: 3, name: "EduBridge", domain: "EdTech", stage: "Incubated", funding: "Angel Funded", progress: 88, nextReview: "2025-07-25", founders: ["Kiran Mehta"] },
  { id: 4, name: "GreenFlux", domain: "CleanTech", stage: "Pre-Incubation", funding: "Bootstrapped", progress: 20, nextReview: "2025-08-01", founders: ["Deepak Nair", "Sana Khan"] },
  { id: 5, name: "FinLeap", domain: "FinTech", stage: "Incubated", funding: "Pre-Series A", progress: 91, nextReview: "2025-07-30", founders: ["Vikram Joshi"] },
  { id: 6, name: "SpaceNav", domain: "Space Tech", stage: "Pre-Incubation", funding: "Seed Funded", progress: 45, nextReview: "2025-08-05", founders: ["Aisha Reddy", "Rohan Das"] },
];

const participantsData = [
  { name: "Aarav Mehta", email: "aarav.m@iit.ac.in", college: "IIT Delhi", category: "Student", status: "Confirmed" },
  { name: "Diya Sharma", email: "diya.s@bits.ac.in", college: "BITS Pilani", category: "Student", status: "Confirmed" },
  { name: "Karan Patel", email: "karan.p@startup.io", college: "Alumni", category: "Entrepreneur", status: "Pending" },
  { name: "Meera Iyer", email: "meera.i@nit.ac.in", college: "NIT Trichy", category: "Student", status: "Confirmed" },
  { name: "Rohan Gupta", email: "rohan.g@iim.ac.in", college: "IIM Ahmedabad", category: "Professional", status: "Waitlist" },
];

const aiResponses: Record<string, string> = {
  "What are the eligibility criteria for AIC incubation?":
    "To qualify for AIC (Atal Incubation Centre) incubation, your startup must meet the following criteria:\n\n1. **Innovation**: Tech-driven product or service with demonstrable novelty\n2. **Stage**: Ideation, validation, or early-traction stage\n3. **Team**: At least one technical co-founder\n4. **Registration**: Legal entity (Pvt. Ltd, LLP, or Partnership Firm)\n5. **Sector Alignment**: HealthTech, EdTech, AgriTech, CleanTech, FinTech, or Deep Tech\n\nApplications are reviewed quarterly by the AIC evaluation committee. Shortlisted teams are invited for a presentation round.",
  "How to apply for seed funding under AIM?":
    "The AIM seed funding process is structured in four stages:\n\n**Stage 1** — Submit your application via the AIM online portal with business plan, financial model, and team profiles.\n\n**Stage 2** — Shortlisted startups present their pitch to the evaluation panel.\n\n**Stage 3** — Due diligence by the AIC team (financials, IP, market research).\n\n**Stage 4** — Grant approval and milestone-linked disbursement.\n\nFunding typically ranges from ₹10L to ₹1 Cr based on stage and sector. Disbursements are tranche-based tied to milestone achievement.",
  "What documents are required for startup evaluation?":
    "For AIC startup evaluation, you will need to prepare the following documents:\n\n- **Incorporation Certificate** (MCA registered)\n- **Business Plan** (problem, solution, market, GTM strategy)\n- **Financial Projections** (3-year P&L and cash flow)\n- **Team Profiles** (CVs of all co-founders)\n- **IP Documentation** (patents filed / trade secret register)\n- **Prototype / MVP Demo** (working product or wireframes)\n- **Pitch Deck** (max 15 slides)\n\nAll documents should be submitted in PDF format via the AIC portal before the application deadline.",
  "Explain the incubation program milestones.":
    "The AIC incubation program is structured across six key milestones:\n\n**Milestone 1 (Month 1-2)**: Validation — market research, customer interviews, MVP definition\n\n**Milestone 2 (Month 3-4)**: Product Build — prototype development and initial testing\n\n**Milestone 3 (Month 5-6)**: Pilot Launch — 50-100 beta users, feedback integration\n\n**Milestone 4 (Month 7-9)**: Go-to-Market — revenue generation, sales channel setup\n\n**Milestone 5 (Month 10-11)**: Scale — team expansion, investor readiness\n\n**Milestone 6 (Month 12)**: Graduation — demo day, investor introductions, grant disbursement completion\n\nProgress reviews are conducted monthly by assigned mentors.",
};

// ── Shared UI components ───────────────────────────────────────────────────
type BadgeVariant = "default" | "success" | "warning" | "info" | "error";
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: BadgeVariant }) {
  const cls: Record<BadgeVariant, string> = {
    default: "bg-orange-100 text-orange-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    error: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls[variant]}`}>
      {children}
    </span>
  );
}

function StatCard({
  icon: Icon, label, value, change, color,
}: {
  icon: React.ElementType; label: string; value: string; change?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 hover:shadow-md transition-all hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1 font-medium">
              <TrendingUp size={11} /> {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, color = "bg-orange-500" }: { value: number; color?: string }) {
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────
const navItems: { icon: React.ElementType; label: string; page: Page }[] = [
  { icon: Home, label: "Dashboard", page: "dashboard" },
  { icon: Calendar, label: "Events", page: "events" },
  { icon: Building2, label: "Startups", page: "startups" },
  { icon: Bot, label: "AI Assistant", page: "ai-assistant" },
  { icon: Star, label: "Evaluator", page: "evaluator" },
];

function Sidebar({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
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

// ── TopBar ─────────────────────────────────────────────────────────────────
function TopBar({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-orange-50 flex items-center justify-between px-6 sticky top-0 z-20">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="pl-8 pr-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 w-48"
            placeholder="Search..."
          />
        </div>
        <button className="relative p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <User size={14} className="text-white" />
        </div>
      </div>
    </header>
  );
}

// ── Dashboard layout wrapper ────────────────────────────────────────────────
function DashboardLayout({
  children, currentPage, onNavigate, title,
}: {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (p: Page) => void;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-[#FFF9F5] font-[Inter,sans-serif]">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="ml-64">
        <TopBar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Landing
// ══════════════════════════════════════════════════════════════════════════
function LandingPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const features = [
    {
      icon: Calendar, title: "Event Management",
      desc: "Plan hackathons, workshops, seminars, and bootcamps. Manage registrations, upload participant lists, and track outcomes.",
      accent: "bg-blue-50 text-blue-600", border: "border-blue-100",
    },
    {
      icon: Building2, title: "Startup Tracking",
      desc: "Monitor progress, funding milestones, mentor sessions, and review schedules across your entire incubation portfolio.",
      accent: "bg-orange-50 text-orange-600", border: "border-orange-100",
    },
    {
      icon: Bot, title: "AI Knowledge Assistant",
      desc: "Instant answers on AIC policies, incubation processes, funding eligibility, and AIM guidelines — always accurate.",
      accent: "bg-purple-50 text-purple-600", border: "border-purple-100",
    },
    {
      icon: Star, title: "Startup Evaluation",
      desc: "AI-driven scoring for innovation potential, market size, AIC fit, and scalability — with actionable recommendations.",
      accent: "bg-emerald-50 text-emerald-600", border: "border-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Eventra <span className="text-orange-500">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Home", "Events", "Startups", "AI Assistant", "Evaluator"].map((item) => (
              <a key={item} href="#" className="text-sm text-gray-600 hover:text-orange-500 font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-4 py-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-5 py-2 text-sm font-semibold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-orange-50 px-4 py-4 space-y-1">
            {["Home", "Events", "Startups", "AI Assistant", "Evaluator"].map((item) => (
              <a key={item} href="#" className="block py-2.5 px-3 text-sm text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50">
                {item}
              </a>
            ))}
            <button
              onClick={() => onNavigate("dashboard")}
              className="w-full mt-3 px-4 py-2.5 text-sm font-semibold bg-orange-500 text-white rounded-xl"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FFF3E8] to-[#FFE8CC] pt-20 pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-40 -left-20 w-72 h-72 bg-amber-200 rounded-full opacity-25 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-6">
                <Sparkles size={11} />
                Powered by Atal Innovation Mission
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                AI-powered<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  incubation
                </span>{" "}
                and<br />
                event management
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Streamline your AIC operations with intelligent tools for startup tracking, event management, and AI-driven evaluation — built for the innovation ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200/60"
                >
                  Get Started <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all"
                >
                  Explore Platform
                </button>
              </div>

              <div className="mt-10 flex items-center gap-10">
                {[["500+", "Startups Supported"], ["120+", "Events Managed"], ["98%", "Satisfaction Rate"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-extrabold text-gray-900">{v}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard illustration */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 shadow-2xl p-6">
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-orange-500 rounded-md flex items-center justify-center">
                        <Zap size={10} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">Eventra AI</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[["35", "Startups", "bg-orange-50 text-orange-600"], ["12", "Events", "bg-blue-50 text-blue-600"], ["8", "Reviews", "bg-purple-50 text-purple-600"]].map(([v, l, c]) => (
                      <div key={l} className={`${c.split(" ")[0]} rounded-xl p-3`}>
                        <div className={`text-xl font-extrabold ${c.split(" ")[1]}`}>{v}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="h-28 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-end p-3 gap-1 mb-4">
                    {[35, 55, 42, 75, 62, 88, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          background: `rgba(249,115,22,${0.4 + i * 0.08})`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: "AgroSense AI", tag: "AgriTech", pct: 35 },
                      { name: "MediSync", tag: "HealthTech", pct: 72 },
                      { name: "EduBridge", tag: "EdTech", pct: 88 },
                    ].map(({ name, tag, pct }) => (
                      <div key={name} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{name[0]}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-700 flex-1">{name}</span>
                        <span className="text-xs text-gray-400">{tag}</span>
                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating chips */}
                <div className="absolute -top-5 -right-6 bg-white rounded-2xl shadow-lg border border-orange-50 px-3 py-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">AIC Eligible</div>
                    <div className="text-xs text-gray-400">Score: 87/100</div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-lg border border-orange-50 px-3 py-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Bot size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">AI Assistant</div>
                    <div className="text-xs text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                      Always ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AIM/AIC Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-4">
              <Target size={11} /> Atal Innovation Mission
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Empowering India{"'"}s Innovation Ecosystem
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Aligned with AIM{"'"}s vision to cultivate a culture of innovation and entrepreneurship across India through technology-driven incubation support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target, color: "bg-orange-500", title: "Our Mission",
                desc: "To provide world-class incubation support to innovative startups, enabling them to scale and create meaningful impact through the AIC ecosystem.",
              },
              {
                icon: Lightbulb, color: "bg-amber-500", title: "Our Vision",
                desc: "To become India's most impactful innovation hub — fostering 1000+ startups by 2030 with AI-driven support systems and global mentorship networks.",
              },
              {
                icon: Globe, color: "bg-orange-600", title: "AIC Values",
                desc: "Inclusivity, innovation-first thinking, data-driven decisions, and collaborative ecosystem building at the core of every program we run.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-gradient-to-br from-[#FFF9F5] to-[#FFF3E8] rounded-2xl p-7 border border-orange-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#FFF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Everything your incubator needs</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A complete AI-powered platform designed for modern incubation centers and the AIC ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc, accent, border }) => (
              <div
                key={title}
                className={`bg-white rounded-2xl p-6 border ${border} hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group`}
              >
                <div className={`w-11 h-11 ${accent} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center text-orange-500 text-sm font-semibold gap-1 group/link">
                  Learn more
                  <ChevronRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 bg-white border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50+", lbl: "AIC Centers" },
              { num: "500+", lbl: "Startups Incubated" },
              { num: "₹45Cr+", lbl: "Funding Facilitated" },
              { num: "200+", lbl: "Mentors Connected" },
            ].map(({ num, lbl }) => (
              <div key={lbl}>
                <div className="text-4xl font-extrabold text-orange-500 mb-1">{num}</div>
                <div className="text-sm text-gray-500 font-medium">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to transform your incubation center?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Join 50+ AIC centers already using Eventra AI to power their innovation programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
            >
              Get Started Free
            </button>
            <button className="px-8 py-3 bg-orange-700/50 text-white font-bold rounded-xl hover:bg-orange-700/70 transition-colors border border-orange-400">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Zap size={13} className="text-white" />
                </div>
                <span className="font-bold text-white">Eventra AI</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                AI-powered platform for AIC incubation management and startup ecosystem development.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Dashboard", "Events", "Startups", "AI Assistant"] },
              { title: "Resources", links: ["AIC Guidelines", "Documentation", "API Reference", "Blog"] },
              { title: "Company", links: ["About", "Contact", "Privacy Policy", "Terms"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-semibold text-white mb-4 text-sm">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2025 Eventra AI. Built for the Atal Innovation Mission ecosystem.
            </p>
            <p className="text-sm text-gray-600">Made with ❤️ for India{"'"}s startup ecosystem</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Dashboard
// ══════════════════════════════════════════════════════════════════════════
function Dashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <DashboardLayout currentPage="dashboard" onNavigate={onNavigate} title="Dashboard Overview">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Calendar} label="Total Events" value="48" change="+12% this month" color="bg-blue-500" />
        <StatCard icon={Rocket} label="Active Startups" value="35" change="+5 this week" color="bg-orange-500" />
        <StatCard icon={Building2} label="Incubated" value="22" change="+3 this month" color="bg-emerald-500" />
        <StatCard icon={Clock} label="Upcoming Reviews" value="8" color="bg-purple-500" />
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Startup Growth</h3>
              <p className="text-xs text-gray-400 mt-0.5">Total vs Incubated · Jan–Jun 2025</p>
            </div>
            <Badge>2025</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={startupGrowthData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #fed7aa", fontSize: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
              />
              <Area type="monotone" dataKey="startups" stroke="#F97316" strokeWidth={2} fill="url(#gTotal)" name="Total" />
              <Area type="monotone" dataKey="incubated" stroke="#10B981" strokeWidth={2} fill="url(#gInc)" name="Incubated" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Funding Overview</h3>
          <p className="text-xs text-gray-400 mb-4">By funding stage</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={fundingData} cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={4} dataKey="value">
                {fundingData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {fundingData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs text-gray-600">{name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Event Participation</h3>
          <p className="text-xs text-gray-400 mb-5">By event type · Jan–Jun 2025</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={eventParticipationData} barSize={10} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #fed7aa", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Bar dataKey="workshops" fill="#F97316" name="Workshops" radius={[3, 3, 0, 0]} />
              <Bar dataKey="hackathons" fill="#FB923C" name="Hackathons" radius={[3, 3, 0, 0]} />
              <Bar dataKey="seminars" fill="#FDBA74" name="Seminars" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Startups</h3>
            <button
              onClick={() => onNavigate("startups")}
              className="text-xs text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {startups.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-orange-600">{s.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.domain}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{s.progress}%</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("events")}
            className="w-full mt-4 py-2 text-xs font-semibold text-orange-500 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
          >
            View All Events →
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Events
// ══════════════════════════════════════════════════════════════════════════
function EventsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "Workshops", "Hackathons", "Seminars", "Bootcamps"];

  const filtered = events.filter((e) => {
    const matchFilter =
      filter === "All" ||
      e.category.toLowerCase() === filter.slice(0, -1).toLowerCase();
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const catColor: Record<string, string> = {
    Hackathon: "bg-purple-100 text-purple-700",
    Workshop: "bg-blue-100 text-blue-700",
    Seminar: "bg-emerald-100 text-emerald-700",
    Bootcamp: "bg-orange-100 text-orange-700",
  };

  const statusVariant = (s: string): BadgeVariant =>
    s === "Active" ? "success" : s === "Upcoming" ? "info" : "default";

  return (
    <DashboardLayout currentPage="events" onNavigate={onNavigate} title="Events">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2.5 text-sm bg-white border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 w-60"
            placeholder="Search events..."
          />
        </div>
        <button
          onClick={() => onNavigate("add-event")}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
        >
          <Plus size={15} /> Add Event
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              filter === f
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            onClick={() => onNavigate("event-details")}
            className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${catColor[ev.category] ?? "bg-gray-100 text-gray-600"}`}>
                {ev.category}
              </span>
              <Badge variant={statusVariant(ev.status)}>{ev.status}</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 leading-snug">{ev.name}</h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={11} />
                {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={11} />
                {ev.participants} participants
              </div>
            </div>
          </div>
        ))}

        {/* Add event card */}
        <div
          onClick={() => onNavigate("add-event")}
          className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition-all min-h-[160px]"
        >
          <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <Plus size={20} className="text-orange-500" />
          </div>
          <p className="text-sm font-semibold text-orange-600">Add New Event</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Add Event
// ══════════════════════════════════════════════════════════════════════════
function AddEventPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onNavigate("events"), 1200);
  };

  return (
    <DashboardLayout currentPage="events" onNavigate={onNavigate} title="Add New Event">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate("events")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors font-medium"
        >
          <ChevronRight size={14} className="rotate-180" />
          Back to Events
        </button>

        <div className="bg-white rounded-2xl p-8 border border-orange-50 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Event Information</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Name</label>
              <input
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                placeholder="e.g. AI Innovation Hackathon 2025"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent resize-none"
                placeholder="Describe the event, goals, and who should attend..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200">
                  <option value="">Select category</option>
                  <option>Workshop</option>
                  <option>Hackathon</option>
                  <option>Seminar</option>
                  <option>Bootcamp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Organizer</label>
                <input
                  className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Organizer name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Upload Participants (Excel / CSV)
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const f = e.dataTransfer.files[0];
                  if (f) setUploadedFile(f.name);
                }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragOver
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/60"
                }`}
              >
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <CheckCircle size={18} className="text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{uploadedFile}</p>
                      <p className="text-xs text-gray-400">Uploaded successfully</p>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Upload size={20} className="text-orange-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Drag & drop Excel file here</p>
                    <p className="text-xs text-gray-400 mb-3">or</p>
                    <label className="px-4 py-2 bg-orange-500 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-orange-600 transition-colors">
                      Browse File
                      <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setUploadedFile(f.name);
                        }}
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-3">Supports: .xlsx, .xls, .csv (max 10MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className={`flex-1 py-3 font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 ${
                  saved
                    ? "bg-emerald-500 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200"
                }`}
              >
                {saved ? <><CheckCircle size={16} /> Saved!</> : "Save Event"}
              </button>
              <button
                onClick={() => onNavigate("events")}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Event Details
// ══════════════════════════════════════════════════════════════════════════
function EventDetailsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Participants", "Analytics", "Winners"];
  const ev = events[0];

  return (
    <DashboardLayout currentPage="events" onNavigate={onNavigate} title="Event Details">
      <button
        onClick={() => onNavigate("events")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors font-medium"
      >
        <ChevronRight size={14} className="rotate-180" />
        Back to Events
      </button>

      {/* Header card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-7 text-white mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-3">
              {ev.category}
            </span>
            <h2 className="text-2xl font-bold mb-2">{ev.name}</h2>
            <div className="flex flex-wrap items-center gap-5 text-orange-100 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> July 15, 2025 · 9:00 AM IST
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={13} /> {ev.participants} Registered
              </span>
            </div>
          </div>
          <Badge variant="success">Upcoming</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "Overview" && (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">About This Event</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                The AI Innovation Hackathon 2025 is a premier 48-hour event bringing together the brightest minds from colleges and startups across India to solve real-world problems using artificial intelligence and machine learning.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Participants will work in teams of 2–4, mentored by industry experts, with exciting prizes and incubation opportunities for top performers. Organized under the Atal Innovation Mission framework.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Problem Statements</h3>
              <div className="space-y-2">
                {["AI for precision agriculture and crop yield prediction", "Affordable AI diagnostics for rural healthcare", "Multilingual NLP for vernacular education accessibility"].map((ps) => (
                  <div key={ps} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-5 h-5 bg-orange-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap size={11} className="text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-700">{ps}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ["Organizer", "AIC Innovation Hub, IIT Delhi"],
              ["Venue", "LHC Block A, IIT Delhi"],
              ["Registration Deadline", "July 10, 2025"],
              ["Prize Pool", "₹5,00,000"],
              ["Team Size", "2–4 members"],
              ["Mode", "In-person"],
            ].map(([k, v]) => (
              <div key={k} className="bg-white rounded-xl p-4 border border-orange-50 shadow-sm">
                <p className="text-xs text-gray-400 mb-1 font-medium">{k}</p>
                <p className="text-sm font-semibold text-gray-900">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Participants" && (
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">{participantsData.length} Participants</p>
            <button className="flex items-center gap-1.5 text-xs text-orange-500 font-semibold hover:text-orange-600">
              <Download size={12} /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  {["Name", "Email", "College", "Category", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {participantsData.map((p, i) => (
                  <tr key={i} className="hover:bg-orange-50/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {p.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{p.email}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{p.college}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={p.status === "Confirmed" ? "success" : p.status === "Pending" ? "warning" : "info"}>
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Analytics" && (
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Registration Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={[{ w: "W1", r: 30 }, { w: "W2", r: 65 }, { w: "W3", r: 112 }, { w: "W4", r: 180 }, { w: "W5", r: 245 }]}
                margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="w" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="r" stroke="#F97316" strokeWidth={2} fill="url(#regGrad)" name="Registrations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Participant Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[{ name: "Students", value: 180 }, { name: "Professionals", value: 40 }, { name: "Entrepreneurs", value: 25 }]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {["#F97316", "#FB923C", "#FDBA74"].map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "Winners" && (
        <div className="space-y-4">
          {[
            { rank: 1, team: "Team NeuralNest", project: "AI-powered crop disease detection using satellite imagery", prize: "₹2,00,000", college: "IIT Bombay" },
            { rank: 2, team: "ByteBridge", project: "Real-time Indian sign language translation for deaf communities", prize: "₹1,50,000", college: "BITS Pilani" },
            { rank: 3, team: "CodeCraft", project: "Predictive healthcare analytics for PHC resource allocation", prize: "₹50,000", college: "NIT Trichy" },
          ].map(({ rank, team, project, prize, college }) => (
            <div key={rank} className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                rank === 1 ? "bg-yellow-50" : rank === 2 ? "bg-gray-50" : "bg-orange-50"
              }`}>
                {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{team}</p>
                <p className="text-sm text-gray-500 mt-0.5 leading-snug">{project}</p>
                <p className="text-xs text-gray-400 mt-1">{college}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-extrabold text-orange-500 text-lg">{prize}</p>
                <p className="text-xs text-gray-400">Prize Money</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Startups
// ══════════════════════════════════════════════════════════════════════════
function StartupsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [section, setSection] = useState<"pre" | "incubated">("pre");
  const pre = startups.filter((s) => s.stage === "Pre-Incubation");
  const inc = startups.filter((s) => s.stage === "Incubated");
  const list = section === "pre" ? pre : inc;

  const fundingColor = (f: string) =>
    f === "Bootstrapped" ? "bg-gray-100 text-gray-600" :
    f === "Seed Funded" ? "bg-emerald-100 text-emerald-700" :
    f === "Angel Funded" ? "bg-blue-100 text-blue-700" :
    "bg-purple-100 text-purple-700";

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
        {list.map((s) => (
          <div
            key={s.id}
            onClick={() => onNavigate("startup-detail")}
            className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-lg font-bold text-orange-600">{s.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{s.name}</h3>
                <p className="text-xs text-gray-500">{s.domain}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${fundingColor(s.funding)}`}>
                {s.funding}
              </span>
              <span className="text-xs font-semibold text-gray-600">{s.progress}%</span>
            </div>

            <ProgressBar value={s.progress} />

            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {new Date(s.nextReview).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
              <span className="flex items-center gap-1">
                <Users size={10} />
                {s.founders.length} founder{s.founders.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Startup Detail
// ══════════════════════════════════════════════════════════════════════════
function StartupDetailPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const s = startups[1]; // MediSync
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

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm mb-5">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-3xl font-extrabold text-white">{s.name[0]}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{s.name}</h2>
                <p className="text-gray-500 text-sm mt-0.5">{s.domain} · {s.stage}</p>
              </div>
              <Badge variant="success">{s.funding}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
              {[
                ["Founders", s.founders.join(", ")],
                ["Progress", `${s.progress}% complete`],
                ["Next Review", new Date(s.nextReview).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-400 font-medium">{k}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ProgressBar value={s.progress} color="bg-gradient-to-r from-orange-400 to-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
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
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{k}</span>
                    <span className="text-xs font-semibold text-gray-800">{v}</span>
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
                <p className="font-bold text-gray-900">{round} · <span className="text-orange-500">{amount}</span></p>
                <p className="text-xs text-gray-400 mt-0.5">{source} · {date}</p>
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
                  {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
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
                  <div className={`absolute left-3.5 w-3.5 h-3.5 rounded-full -translate-x-1/2 mt-1 border-2 border-white ${
                    status === "done"
                      ? "bg-emerald-500"
                      : status === "current"
                      ? "bg-orange-500 ring-4 ring-orange-100"
                      : "bg-gray-200"
                  }`} />
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

// ══════════════════════════════════════════════════════════════════════════
// PAGE: AI Assistant
// ══════════════════════════════════════════════════════════════════════════
type Message = { role: "user" | "assistant"; content: string };

function AIAssistantPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the Eventra AI Assistant — your intelligent guide for everything related to AIC policies, incubation processes, startup evaluation, and AIM funding guidelines.\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const conversations = [
    "AIC eligibility criteria",
    "Seed funding process",
    "Incubation milestones",
    "IP protection for startups",
    "AIC reporting requirements",
  ];

  const suggestions = [
    "What are the eligibility criteria for AIC incubation?",
    "How to apply for seed funding under AIM?",
    "What documents are required for startup evaluation?",
    "Explain the incubation program milestones.",
  ];

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply =
        aiResponses[msg] ??
        "Thank you for your question! Based on the AIC guidelines and Atal Innovation Mission framework, I can provide tailored guidance on this topic. The AIC ecosystem is designed to support innovative startups from ideation through to scale. Please feel free to ask more specific questions about policies, funding, evaluation criteria, or incubation milestones.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 1100);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <DashboardLayout currentPage="ai-assistant" onNavigate={onNavigate} title="AI Assistant">
      <div className="flex gap-5" style={{ height: "calc(100vh - 9rem)" }}>
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 bg-white rounded-2xl border border-orange-50 shadow-sm p-4 flex flex-col overflow-hidden">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors mb-4">
            <Plus size={14} /> New Chat
          </button>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Recent</p>
          <div className="space-y-0.5 flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c}
                className="w-full text-left px-3 py-2 text-xs text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <MessageSquare size={11} className="inline mr-1.5 opacity-50" />
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-white rounded-2xl border border-orange-50 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-orange-50 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles size={15} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Eventra AI Assistant</p>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                Online · AIC Knowledge Base v2.5
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    m.role === "assistant"
                      ? "bg-gradient-to-br from-orange-400 to-orange-600"
                      : "bg-orange-500"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <Sparkles size={13} className="text-white" />
                  ) : (
                    <User size={13} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === "assistant"
                      ? "bg-gray-50 text-gray-800 rounded-tl-sm"
                      : "bg-orange-500 text-white rounded-tr-sm shadow-sm shadow-orange-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only on first message) */}
          {messages.length === 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2 flex-shrink-0">
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-orange-50 flex-shrink-0">
            <div className="flex gap-3 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                placeholder="Ask anything about AIC policies, incubation process..."
              />
              <button
                onClick={() => send()}
                className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex-shrink-0 shadow-sm shadow-orange-200 disabled:opacity-50"
                disabled={!input.trim() || loading}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE: Startup Evaluator
// ══════════════════════════════════════════════════════════════════════════
function EvaluatorPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({
    startup: "", problem: "", solution: "", market: "", team: "", tech: "",
  });
  const [evaluated, setEvaluated] = useState(false);
  const [loading, setLoading] = useState(false);

  const scores = { innovation: 82, market: 74, aicFit: 91, scalability: 78 };
  const avg = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4);
  const eligible = avg >= 70;

  const handleEvaluate = () => {
    if (!form.startup.trim() || !form.problem.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setEvaluated(true); }, 2000);
  };

  const set = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <DashboardLayout currentPage="evaluator" onNavigate={onNavigate} title="Startup Evaluator">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-orange-500" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">AI-Powered Startup Evaluation</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Get an instant assessment of AIC eligibility, innovation score, market potential, and scalability.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white rounded-2xl p-7 border border-orange-50 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5">Startup Information</h3>
            <div className="space-y-4">
              {[
                { key: "startup", label: "Startup Name *", placeholder: "e.g. HealthAI Solutions", type: "input" },
                { key: "problem", label: "Problem Statement *", placeholder: "Describe the core problem you are solving...", type: "textarea" },
                { key: "solution", label: "Your Solution", placeholder: "How does your product/service solve the problem?", type: "textarea" },
                { key: "market", label: "Market & Target Audience", placeholder: "Target customers, market size, and geography...", type: "textarea" },
                { key: "team", label: "Team Details", placeholder: "Number of founders, backgrounds, experience...", type: "input" },
                { key: "tech", label: "Technology Stack", placeholder: "AI/ML, IoT, Blockchain, Mobile App...", type: "input" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      rows={2}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => set(key, e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent resize-none"
                      placeholder={placeholder}
                    />
                  ) : (
                    <input
                      value={form[key as keyof typeof form]}
                      onChange={(e) => set(key, e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                      placeholder={placeholder}
                    />
                  )}
                </div>
              ))}

              <button
                onClick={handleEvaluate}
                disabled={loading || !form.startup.trim() || !form.problem.trim()}
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Evaluating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} /> Evaluate with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {evaluated ? (
            <div className="space-y-4">
              {/* Verdict */}
              <div className={`rounded-2xl p-5 border ${eligible ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${eligible ? "bg-emerald-500" : "bg-amber-500"} shadow-sm`}>
                    {eligible ? <CheckCircle size={20} className="text-white" /> : <Zap size={20} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">AIC Evaluation Verdict</p>
                    <p className={`text-xl font-extrabold ${eligible ? "text-emerald-700" : "text-amber-700"}`}>
                      {eligible ? "✓ Eligible for AIC Incubation" : "Needs Improvement"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Average score: {avg}/100</p>
                  </div>
                </div>
              </div>

              {/* Score cards */}
              <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-5">AI Evaluation Report</h3>
                <div className="space-y-4">
                  {[
                    { label: "Innovation Score", value: scores.innovation, color: "bg-blue-500", text: "text-blue-600" },
                    { label: "Market Potential", value: scores.market, color: "bg-emerald-500", text: "text-emerald-600" },
                    { label: "AIC Fit Score", value: scores.aicFit, color: "bg-orange-500", text: "text-orange-600" },
                    { label: "Scalability Score", value: scores.scalability, color: "bg-purple-500", text: "text-purple-600" },
                  ].map(({ label, value, color, text }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-gray-700">{label}</span>
                        <span className={`text-sm font-extrabold ${text}`}>{value}/100</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-700`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">AI Recommendations</h3>
                <div className="space-y-2.5">
                  {[
                    { type: "strength", text: "Strong problem-solution fit with clear articulation of rural healthcare gap — this resonates with AIC's mission." },
                    { type: "strength", text: "Technology approach (AI + Edge Computing) is well-aligned with AIC priority sectors and NITI Aayog mandates." },
                    { type: "improve", text: "Strengthen the business model with a clear, time-bound revenue pathway and monetization strategy." },
                    { type: "improve", text: "Add an IP strategy — filed patents or trade secrets will significantly strengthen AIC evaluation scores." },
                  ].map(({ type, text }, i) => (
                    <div key={i} className={`flex gap-3 p-3.5 rounded-xl ${type === "strength" ? "bg-emerald-50" : "bg-amber-50"}`}>
                      <span className={`flex-shrink-0 font-bold text-sm ${type === "strength" ? "text-emerald-600" : "text-amber-600"}`}>
                        {type === "strength" ? "✓" : "→"}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200 flex flex-col items-center justify-center p-14 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-5">
                <Star size={28} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Evaluation Report</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Fill in your startup details on the left and click{" "}
                <span className="font-semibold text-orange-600">"Evaluate with AI"</span>{" "}
                to get your comprehensive AIC evaluation report with scores and recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState<Page>("landing");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  switch (page) {
    case "landing":        return <LandingPage onNavigate={navigate} />;
    case "dashboard":      return <Dashboard onNavigate={navigate} />;
    case "events":         return <EventsPage onNavigate={navigate} />;
    case "add-event":      return <AddEventPage onNavigate={navigate} />;
    case "event-details":  return <EventDetailsPage onNavigate={navigate} />;
    case "startups":       return <StartupsPage onNavigate={navigate} />;
    case "startup-detail": return <StartupDetailPage onNavigate={navigate} />;
    case "ai-assistant":   return <AIAssistantPage onNavigate={navigate} />;
    case "evaluator":      return <EvaluatorPage onNavigate={navigate} />;
    default:               return <LandingPage onNavigate={navigate} />;
  }
}
