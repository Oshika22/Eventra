export type EventStatus = "Upcoming" | "Active" | "Completed";

export type EventCategory = "Hackathon" | "Workshop" | "Seminar" | "Bootcamp";

export interface EventItem {
  id: number;
  name: string;
  category: EventCategory;
  date: string;
  participants: number;
  status: EventStatus;
}

export interface Participant {
  name: string;
  email: string;
  college: string;
  category: string;
  status: "Confirmed" | "Pending" | "Waitlist";
}

