import { Area, AreaChart, Cell, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar, ChevronRight, Download, Users, Zap } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Badge } from "../../components/ui/Badge";
import { events, participantsData } from "../../data/mockData";

export default function EventDetailsPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
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

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
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
                {["AI for precision agriculture and crop yield prediction", "Affordable AI diagnostics for rural healthcare", "Multilingual NLP for vernacular education accessibility"].map((statement) => (
                  <div key={statement} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-5 h-5 bg-orange-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap size={11} className="text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-700">{statement}</p>
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
            ].map(([label, value]) => (
              <div key={label} className="bg-white rounded-xl p-4 border border-orange-50 shadow-sm">
                <p className="text-xs text-gray-400 mb-1 font-medium">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
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
                  {["Name", "Email", "College", "Category", "Status"].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {participantsData.map((participant, index) => (
                  <tr key={index} className="hover:bg-orange-50/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {participant.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{participant.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{participant.email}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{participant.college}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-semibold">{participant.category}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={participant.status === "Confirmed" ? "success" : participant.status === "Pending" ? "warning" : "info"}>
                        {participant.status}
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
              <AreaChart data={[{ w: "W1", r: 30 }, { w: "W2", r: 65 }, { w: "W3", r: 112 }, { w: "W4", r: 180 }, { w: "W5", r: 245 }]} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
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
                <Pie data={[{ name: "Students", value: 180 }, { name: "Professionals", value: 40 }, { name: "Entrepreneurs", value: 25 }]} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {["#F97316", "#FB923C", "#FDBA74"].map((color, index) => (
                    <Cell key={index} fill={color} />
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
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                  rank === 1 ? "bg-yellow-50" : rank === 2 ? "bg-gray-50" : "bg-orange-50"
                }`}
              >
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

