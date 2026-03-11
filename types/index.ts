export interface Job {
  companyName: string;
  appliedDate: Date;
  eventDate?: Date;
  eventType?: "interview" | "test" | "offer" | "rejected";
  stageReached: "applied" | "interview" | "test" | "offer";
}

export interface LinePlotProps {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}