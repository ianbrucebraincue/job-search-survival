export interface Job {
  companyName: string;
  appliedDate: Date;
  eventDate?: Date;
  eventType?: "interview" | "test" | "offer" | "rejected";
  stageReached: "applied" | "interview" | "test" | "offer";
}