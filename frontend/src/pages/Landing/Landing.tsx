import { useState } from "react";
import { ArrowRight, Award, Bot, Calendar, CheckCircle, ChevronRight, Globe, Lightbulb, Menu, Rocket, Sparkles, Star, Target, Users, X, Zap } from "lucide-react";
import type { AppPage } from "../../types/navigation";

export default function LandingPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      desc: "Plan hackathons, workshops, seminars, and bootcamps. Manage registrations, upload participant lists, and track outcomes.",
      accent: "bg-blue-50 text-blue-600",
      border: "border-blue-100",
    },
    {
      icon: Rocket,
      title: "Startup Tracking",
      desc: "Monitor progress, funding milestones, mentor sessions, and review schedules across your entire incubation portfolio.",
      accent: "bg-orange-50 text-orange-600",
      border: "border-orange-100",
    },
    {
      icon: Bot,
      title: "AI Knowledge Assistant",
      desc: "Instant answers on AIC policies, incubation processes, funding eligibility, and AIM guidelines — always accurate.",
      accent: "bg-purple-50 text-purple-600",
      border: "border-purple-100",
    },
    {
      icon: Star,
      title: "Startup Evaluation",
      desc: "AI-driven scoring for innovation potential, market size, AIC fit, and scalability — with actionable recommendations.",
      accent: "bg-emerald-50 text-emerald-600",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">
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
            <button onClick={() => onNavigate("dashboard")} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors">
              Sign In
            </button>
            <button onClick={() => onNavigate("dashboard")} className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-sm">
              Get Started
            </button>
          </div>

          <button onClick={() => setMobileOpen((open) => !open)} className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white px-4 py-3 space-y-2">
            {["Home", "Events", "Startups", "AI Assistant", "Evaluator"].map((item) => (
              <a key={item} href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg">
                {item}
              </a>
            ))}
            <button onClick={() => onNavigate("dashboard")} className="w-full mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl">
              Get Started
            </button>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-6">
                <Sparkles size={11} /> Powered by AI for AICs
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                The AI platform for
                <span className="block text-orange-500">modern incubation</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                Streamline event management, startup tracking, AI-powered evaluation, and knowledge assistance in one polished incubation platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => onNavigate("dashboard")} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
                  Get Started Free <ArrowRight size={16} />
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-[2rem] shadow-2xl border border-orange-100 p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { title: "Startups", value: "35", icon: Rocket, color: "bg-orange-50 text-orange-600" },
                    { title: "Events", value: "48", icon: Calendar, color: "bg-blue-50 text-blue-600" },
                    { title: "AI Questions", value: "1.2k", icon: Bot, color: "bg-purple-50 text-purple-600" },
                    { title: "Evaluations", value: "200+", icon: Star, color: "bg-emerald-50 text-emerald-600" },
                  ].map(({ title, value, icon: Icon, color }) => (
                    <div key={title} className="bg-gray-50 rounded-2xl p-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                        <Icon size={18} />
                      </div>
                      <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 font-medium">{title}</div>
                    </div>
                  ))}
                </div>
                <div className="h-28 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-end p-3 gap-1 mb-4">
                  {[35, 55, 42, 75, 62, 88, 70].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        background: `rgba(249,115,22,${0.4 + index * 0.08})`,
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
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-4">
              <Target size={11} /> Atal Innovation Mission
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Empowering India&apos;s Innovation Ecosystem</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Aligned with AIM&apos;s vision to cultivate a culture of innovation and entrepreneurship across India through technology-driven incubation support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                color: "bg-orange-500",
                title: "Our Mission",
                desc: "To provide world-class incubation support to innovative startups, enabling them to scale and create meaningful impact through the AIC ecosystem.",
              },
              {
                icon: Lightbulb,
                color: "bg-amber-500",
                title: "Our Vision",
                desc: "To become India's most impactful innovation hub — fostering 1000+ startups by 2030 with AI-driven support systems and global mentorship networks.",
              },
              {
                icon: Globe,
                color: "bg-orange-600",
                title: "AIC Values",
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

      <section className="py-20 bg-[#FFF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Everything your incubator needs</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">A complete AI-powered platform designed for modern incubation centers and the AIC ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc, accent, border }) => (
              <div key={title} className={`bg-white rounded-2xl p-6 border ${border} hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group`}>
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

      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to transform your incubation center?</h2>
          <p className="text-orange-100 text-lg mb-8">Join 50+ AIC centers already using Eventra AI to power their innovation programs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate("dashboard")} className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
              Get Started Free
            </button>
            <button className="px-8 py-3 bg-orange-700/50 text-white font-bold rounded-xl hover:bg-orange-700/70 transition-colors border border-orange-400">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

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
              <p className="text-sm leading-relaxed text-gray-500">AI-powered platform for AIC incubation management and startup ecosystem development.</p>
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
            <p className="text-sm text-gray-600">© 2025 Eventra AI. Built for the Atal Innovation Mission ecosystem.</p>
            <p className="text-sm text-gray-600">Made with ❤️ for India&apos;s startup ecosystem</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

