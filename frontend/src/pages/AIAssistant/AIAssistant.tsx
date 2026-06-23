import { MessageSquare, Plus, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { aiResponses } from "../../data/mockData";

type Message = { role: "user" | "assistant"; content: string };

export default function AIAssistantPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
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

  const conversations = ["AIC eligibility criteria", "Seed funding process", "Incubation milestones", "IP protection for startups", "AIC reporting requirements"];
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
      const reply = aiResponses[msg] ?? "Thank you for your question! Based on the AIC guidelines and Atal Innovation Mission framework, I can provide tailored guidance on this topic. The AIC ecosystem is designed to support innovative startups from ideation through to scale. Please feel free to ask more specific questions about policies, funding, evaluation criteria, or incubation milestones.";
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
        <div className="w-56 flex-shrink-0 bg-white rounded-2xl border border-orange-50 shadow-sm p-4 flex flex-col overflow-hidden">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors mb-4">
            <Plus size={14} /> New Chat
          </button>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Recent</p>
          <div className="space-y-0.5 flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button key={conversation} className="w-full text-left px-3 py-2 text-xs text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <MessageSquare size={11} className="inline mr-1.5 opacity-50" />
                {conversation}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-orange-50 shadow-sm flex flex-col overflow-hidden">
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

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${message.role === "assistant" ? "bg-gradient-to-br from-orange-400 to-orange-600" : "bg-orange-500"}`}>
                  {message.role === "assistant" ? <Sparkles size={13} className="text-white" /> : <User size={13} className="text-white" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${message.role === "assistant" ? "bg-gray-50 text-gray-800 rounded-tl-sm" : "bg-orange-500 text-white rounded-tr-sm shadow-sm shadow-orange-200"}`}>
                  {message.content}
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
                    <span key={delay} className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2 flex-shrink-0">
              {suggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => send(suggestion)} className="text-xs px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors font-medium">
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 border-t border-orange-50 flex-shrink-0">
            <div className="flex gap-3 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                className="flex-1 px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                placeholder="Ask anything about AIC policies, incubation process..."
              />
              <button onClick={() => send()} className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex-shrink-0 shadow-sm shadow-orange-200 disabled:opacity-50" disabled={!input.trim() || loading}>
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

