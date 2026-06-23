import { Search, Plus } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../../types/navigation";
import { events } from "../../data/events";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { EventCard } from "./components/EventCard";

export default function EventsPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
  const filters = ["All", "Workshops", "Hackathons", "Seminars", "Bootcamps"];
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = events.filter((event) => {
    const matchFilter = filter === "All" || event.category.toLowerCase() === filter.slice(0, -1).toLowerCase();
    const matchSearch = event.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

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
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              filter === item
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => onNavigate("event-details")} />
        ))}

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

