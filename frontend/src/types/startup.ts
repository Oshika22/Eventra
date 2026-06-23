export type StartupStage = "Pre-Incubation" | "Incubated";

export type FundingStage = "Bootstrapped" | "Seed Funded" | "Angel Funded" | "Pre-Series A";

export interface Startup {
  id: number;
  name: string;
  domain: string;
  stage: StartupStage;
  funding: FundingStage;
  progress: number;
  nextReview: string;
  founders: string[];
}

