import { CheckCircle, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";

export default function EvaluatorPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
  const [form, setForm] = useState({ startup: "", problem: "", solution: "", market: "", team: "", tech: "" });
  const [evaluated, setEvaluated] = useState(false);
  const [loading, setLoading] = useState(false);

  const scores = { innovation: 82, market: 74, aicFit: 91, scalability: 78 };
  const avg = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4);
  const eligible = avg >= 70;

  const handleEvaluate = () => {
    if (!form.startup.trim() || !form.problem.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEvaluated(true);
    }, 2000);
  };

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <DashboardLayout currentPage="evaluator" onNavigate={onNavigate} title="Startup Evaluator">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-orange-500" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">AI-Powered Startup Evaluation</h2>
            <p className="text-sm text-gray-500 mt-0.5">Get an instant assessment of AIC eligibility, innovation score, market potential, and scalability.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
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

          {evaluated ? (
            <div className="space-y-4">
              <div className={`rounded-2xl p-5 border ${eligible ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${eligible ? "bg-emerald-500" : "bg-amber-500"} shadow-sm`}>
                    {eligible ? <CheckCircle size={20} className="text-white" /> : <Zap size={20} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">AIC Evaluation Verdict</p>
                    <p className={`text-xl font-extrabold ${eligible ? "text-emerald-700" : "text-amber-700"}`}>{eligible ? "✓ Eligible for AIC Incubation" : "Needs Improvement"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Average score: {avg}/100</p>
                  </div>
                </div>
              </div>

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
                        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">AI Recommendations</h3>
                <div className="space-y-2.5">
                  {[
                    { type: "strength", text: "Strong problem-solution fit with clear articulation of rural healthcare gap — this resonates with AIC's mission." },
                    { type: "strength", text: "Technology approach (AI + Edge Computing) is well-aligned with AIC priority sectors and NITI Aayog mandates." },
                    { type: "improve", text: "Strengthen the business model with a clear, time-bound revenue pathway and monetization strategy." },
                    { type: "improve", text: "Add an IP strategy — filed patents or trade secrets will significantly strengthen AIC evaluation scores." },
                  ].map(({ type, text }, index) => (
                    <div key={index} className={`flex gap-3 p-3.5 rounded-xl ${type === "strength" ? "bg-emerald-50" : "bg-amber-50"}`}>
                      <span className={`flex-shrink-0 font-bold text-sm ${type === "strength" ? "text-emerald-600" : "text-amber-600"}`}>{type === "strength" ? "✓" : "→"}</span>
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

