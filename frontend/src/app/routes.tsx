import type { ComponentType } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router";
import type { AppPage } from "../types/navigation";
import AIAssistantPage from "../pages/AIAssistant/AIAssistant";
import AddEventPage from "../pages/AddEvent/AddEvent";
import DashboardPage from "../pages/Dashboard/Dashboard";
import EventDetailsPage from "../pages/EventDetails/EventDetails";
import EventsPage from "../pages/Events/Events";
import EvaluatorPage from "../pages/Evaluator/Evaluator";
import LandingPage from "../pages/Landing/Landing";
import StartupDetailsPage from "../pages/StartupDetails/StartupDetails";
import StartupsPage from "../pages/Startups/Startups";

export const pagePaths: Record<AppPage, string> = {
  landing: "/",
  dashboard: "/dashboard",
  events: "/events",
  "add-event": "/events/new",
  "event-details": "/events/details",
  startups: "/startups",
  "startup-detail": "/startups/details",
  "ai-assistant": "/assistant",
  evaluator: "/evaluator",
};

export function getPathForPage(page: AppPage) {
  return pagePaths[page];
}

function RouteBridge({
  Component,
}: {
  Component: ComponentType<{ onNavigate: (page: AppPage) => void }>;
}) {
  const navigate = useNavigate();

  const handleNavigate = (page: AppPage) => {
    navigate(getPathForPage(page));
    window.scrollTo(0, 0);
  };

  return <Component onNavigate={handleNavigate} />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteBridge Component={LandingPage} />} />
        <Route path="/dashboard" element={<RouteBridge Component={DashboardPage} />} />
        <Route path="/events" element={<RouteBridge Component={EventsPage} />} />
        <Route path="/events/new" element={<RouteBridge Component={AddEventPage} />} />
        <Route path="/events/details" element={<RouteBridge Component={EventDetailsPage} />} />
        <Route path="/startups" element={<RouteBridge Component={StartupsPage} />} />
        <Route path="/startups/details" element={<RouteBridge Component={StartupDetailsPage} />} />
        <Route path="/assistant" element={<RouteBridge Component={AIAssistantPage} />} />
        <Route path="/evaluator" element={<RouteBridge Component={EvaluatorPage} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

