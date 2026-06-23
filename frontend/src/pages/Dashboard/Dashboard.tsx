import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Building2, Calendar, Clock, Rocket } from "lucide-react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Badge } from "../../components/ui/Badge";
import { StatCard } from "../../components/dashboard/StatCard";
import { StartupGrowthChart, FundingOverviewChart, EventParticipationChart } from "../../components/charts/DashboardCharts";
import { startups } from "../../data/startups";

export default function Dashboard({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
  return (
    <DashboardLayout currentPage="dashboard" onNavigate={onNavigate} title="Dashboard Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Calendar} label="Total Events" value="48" change="+12% this month" color="bg-blue-500" />
        <StatCard icon={Rocket} label="Active Startups" value="35" change="+5 this week" color="bg-orange-500" />
        <StatCard icon={Building2} label="Incubated" value="22" change="+3 this month" color="bg-emerald-500" />
        <StatCard icon={Clock} label="Upcoming Reviews" value="8" color="bg-purple-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Startup Growth</h3>
              <p className="text-xs text-gray-400 mt-0.5">Total vs Incubated · Jan–Jun 2025</p>
            </div>
            <Badge>2025</Badge>
          </div>
          <StartupGrowthChart />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Funding Overview</h3>
          <p className="text-xs text-gray-400 mb-4">By funding stage</p>
          <FundingOverviewChart />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Event Participation</h3>
          <p className="text-xs text-gray-400 mb-5">By event type · Jan–Jun 2025</p>
          <EventParticipationChart />
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

