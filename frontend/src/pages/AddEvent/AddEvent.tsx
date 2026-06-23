import { CheckCircle, ChevronRight, Upload, X } from "lucide-react";
import { useState } from "react";
import type { AppPage } from "../../types/navigation";
import { DashboardLayout } from "../../components/layout/DashboardLayout";

export default function AddEventPage({ onNavigate }: { onNavigate: (p: AppPage) => void }) {
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
              <input className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent" placeholder="e.g. AI Innovation Hackathon 2025" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea rows={3} className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent resize-none" placeholder="Describe the event, goals, and who should attend..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                <input type="date" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                <input type="time" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200" />
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
                <input className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Organizer name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Upload Participants (Excel / CSV)</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) setUploadedFile(file.name);
                }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragOver ? "border-orange-400 bg-orange-50" : "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/60"
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
                    <button onClick={() => setUploadedFile(null)} className="ml-2 text-gray-400 hover:text-red-500 transition-colors">
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
                          const file = e.target.files?.[0];
                          if (file) setUploadedFile(file.name);
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
                  saved ? "bg-emerald-500 text-white" : "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200"
                }`}
              >
                {saved ? (
                  <>
                    <CheckCircle size={16} /> Saved!
                  </>
                ) : (
                  "Save Event"
                )}
              </button>
              <button onClick={() => onNavigate("events")} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

