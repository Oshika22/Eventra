import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eventParticipationData, fundingData, startupGrowthData } from "../../data/mockData";

export function StartupGrowthChart() {
  return (
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
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #fed7aa", fontSize: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
        <Area type="monotone" dataKey="startups" stroke="#F97316" strokeWidth={2} fill="url(#gTotal)" name="Total" />
        <Area type="monotone" dataKey="incubated" stroke="#10B981" strokeWidth={2} fill="url(#gInc)" name="Incubated" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FundingOverviewChart() {
  return (
    <>
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
    </>
  );
}

export function EventParticipationChart() {
  return (
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
  );
}

