import type { EventItem, Participant } from "../types/event";
import type { Startup } from "../types/startup";

export const startupGrowthData = [
  { month: "Jan", startups: 12, incubated: 8 },
  { month: "Feb", startups: 15, incubated: 10 },
  { month: "Mar", startups: 18, incubated: 12 },
  { month: "Apr", startups: 22, incubated: 15 },
  { month: "May", startups: 28, incubated: 18 },
  { month: "Jun", startups: 35, incubated: 22 },
];

export const eventParticipationData = [
  { month: "Jan", workshops: 4, hackathons: 2, seminars: 3 },
  { month: "Feb", workshops: 6, hackathons: 3, seminars: 4 },
  { month: "Mar", workshops: 5, hackathons: 4, seminars: 2 },
  { month: "Apr", workshops: 8, hackathons: 2, seminars: 5 },
  { month: "May", workshops: 7, hackathons: 5, seminars: 3 },
  { month: "Jun", workshops: 9, hackathons: 3, seminars: 6 },
];

export const fundingData = [
  { name: "Seed", value: 40, color: "#F97316" },
  { name: "Angel", value: 25, color: "#FB923C" },
  { name: "Pre-Series A", value: 20, color: "#FDBA74" },
  { name: "Bootstrapped", value: 15, color: "#FED7AA" },
];

export const events: EventItem[] = [
  { id: 1, name: "AI Innovation Hackathon 2025", category: "Hackathon", date: "2025-07-15", participants: 245, status: "Upcoming" },
  { id: 2, name: "Startup Pitch Workshop", category: "Workshop", date: "2025-07-08", participants: 89, status: "Active" },
  { id: 3, name: "Deep Tech Seminar", category: "Seminar", date: "2025-06-28", participants: 156, status: "Completed" },
  { id: 4, name: "FinTech Bootcamp", category: "Bootcamp", date: "2025-07-22", participants: 67, status: "Upcoming" },
  { id: 5, name: "AgriTech Innovation Day", category: "Workshop", date: "2025-07-05", participants: 120, status: "Active" },
  { id: 6, name: "Women in Tech Leadership", category: "Seminar", date: "2025-06-20", participants: 200, status: "Completed" },
];

export const startups: Startup[] = [
  { id: 1, name: "AgroSense AI", domain: "AgriTech", stage: "Pre-Incubation", funding: "Bootstrapped", progress: 35, nextReview: "2025-07-10", founders: ["Arjun Sharma", "Priya Patel"] },
  { id: 2, name: "MediSync", domain: "HealthTech", stage: "Incubated", funding: "Seed Funded", progress: 72, nextReview: "2025-07-18", founders: ["Dr. Ravi Kumar", "Anita Singh"] },
  { id: 3, name: "EduBridge", domain: "EdTech", stage: "Incubated", funding: "Angel Funded", progress: 88, nextReview: "2025-07-25", founders: ["Kiran Mehta"] },
  { id: 4, name: "GreenFlux", domain: "CleanTech", stage: "Pre-Incubation", funding: "Bootstrapped", progress: 20, nextReview: "2025-08-01", founders: ["Deepak Nair", "Sana Khan"] },
  { id: 5, name: "FinLeap", domain: "FinTech", stage: "Incubated", funding: "Pre-Series A", progress: 91, nextReview: "2025-07-30", founders: ["Vikram Joshi"] },
  { id: 6, name: "SpaceNav", domain: "Space Tech", stage: "Pre-Incubation", funding: "Seed Funded", progress: 45, nextReview: "2025-08-05", founders: ["Aisha Reddy", "Rohan Das"] },
];

export const participantsData: Participant[] = [
  { name: "Aarav Mehta", email: "aarav.m@iit.ac.in", college: "IIT Delhi", category: "Student", status: "Confirmed" },
  { name: "Diya Sharma", email: "diya.s@bits.ac.in", college: "BITS Pilani", category: "Student", status: "Confirmed" },
  { name: "Karan Patel", email: "karan.p@startup.io", college: "Alumni", category: "Entrepreneur", status: "Pending" },
  { name: "Meera Iyer", email: "meera.i@nit.ac.in", college: "NIT Trichy", category: "Student", status: "Confirmed" },
  { name: "Rohan Gupta", email: "rohan.g@iim.ac.in", college: "IIM Ahmedabad", category: "Professional", status: "Waitlist" },
];

export const aiResponses: Record<string, string> = {
  "What are the eligibility criteria for AIC incubation?":
    "To qualify for AIC (Atal Incubation Centre) incubation, your startup must meet the following criteria:\n\n1. **Innovation**: Tech-driven product or service with demonstrable novelty\n2. **Stage**: Ideation, validation, or early-traction stage\n3. **Team**: At least one technical co-founder\n4. **Registration**: Legal entity (Pvt. Ltd, LLP, or Partnership Firm)\n5. **Sector Alignment**: HealthTech, EdTech, AgriTech, CleanTech, FinTech, or Deep Tech\n\nApplications are reviewed quarterly by the AIC evaluation committee. Shortlisted teams are invited for a presentation round.",
  "How to apply for seed funding under AIM?":
    "The AIM seed funding process is structured in four stages:\n\n**Stage 1** — Submit your application via the AIM online portal with business plan, financial model, and team profiles.\n\n**Stage 2** — Shortlisted startups present their pitch to the evaluation panel.\n\n**Stage 3** — Due diligence by the AIC team (financials, IP, market research).\n\n**Stage 4** — Grant approval and milestone-linked disbursement.\n\nFunding typically ranges from ₹10L to ₹1 Cr based on stage and sector. Disbursements are tranche-based tied to milestone achievement.",
  "What documents are required for startup evaluation?":
    "For AIC startup evaluation, you will need to prepare the following documents:\n\n- **Incorporation Certificate** (MCA registered)\n- **Business Plan** (problem, solution, market, GTM strategy)\n- **Financial Projections** (3-year P&L and cash flow)\n- **Team Profiles** (CVs of all co-founders)\n- **IP Documentation** (patents filed / trade secret register)\n- **Prototype / MVP Demo** (working product or wireframes)\n- **Pitch Deck** (max 15 slides)\n\nAll documents should be submitted in PDF format via the AIC portal before the application deadline.",
  "Explain the incubation program milestones.":
    "The AIC incubation program is structured across six key milestones:\n\n**Milestone 1 (Month 1-2)**: Validation — market research, customer interviews, MVP definition\n\n**Milestone 2 (Month 3-4)**: Product Build — prototype development and initial testing\n\n**Milestone 3 (Month 5-6)**: Pilot Launch — 50-100 beta users, feedback integration\n\n**Milestone 4 (Month 7-9)**: Go-to-Market — revenue generation, sales channel setup\n\n**Milestone 5 (Month 10-11)**: Scale — team expansion, investor readiness\n\n**Milestone 6 (Month 12)**: Graduation — demo day, investor introductions, grant disbursement completion\n\nProgress reviews are conducted monthly by assigned mentors.",
};

