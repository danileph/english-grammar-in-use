export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type UnitItem = {
  id: string;
  title: string;
  topic: string;
  order: number;
  estimatedMinutes: number;
};

export type ProgressUnitRecord = Record<
  string,
  {
    status: ProgressStatus;
    accuracy: number | null;
  }
>;
