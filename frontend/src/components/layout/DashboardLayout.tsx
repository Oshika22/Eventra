import type { ReactNode } from "react";
import type { AppPage } from "../../types/navigation";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({
  children,
  currentPage,
  onNavigate,
  title,
}: {
  children: ReactNode;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-[#FFF9F5] font-[Inter,sans-serif]">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="ml-64">
        <Topbar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

