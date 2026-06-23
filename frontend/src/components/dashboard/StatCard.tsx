import type { ElementType } from "react";
import { TrendingUp } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
}: {
  icon: ElementType;
  label: string;
  value: string;
  change?: string;
  color: string;
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

