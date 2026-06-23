import { Calendar, Users } from "lucide-react";
import type { EventItem } from "../../../types/event";
import { Badge, type BadgeVariant } from "../../../components/ui/Badge";

const categoryColors: Record<string, string> = {
  Hackathon: "bg-purple-100 text-purple-700",
  Workshop: "bg-blue-100 text-blue-700",
  Seminar: "bg-emerald-100 text-emerald-700",
  Bootcamp: "bg-orange-100 text-orange-700",
};

const statusVariant = (status: string): BadgeVariant =>
  status === "Active" ? "success" : status === "Upcoming" ? "info" : "default";

export function EventCard({
  event,
  onClick,
}: {
  event: EventItem;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[event.category] ?? "bg-gray-100 text-gray-600"}`}>
          {event.category}
        </span>
        <Badge variant={statusVariant(event.status)}>{event.status}</Badge>
      </div>
      <h3 className="font-semibold text-gray-900 mb-3 leading-snug">{event.name}</h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={11} />
          {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users size={11} />
          {event.participants} participants
        </div>
      </div>
    </div>
  );
}

