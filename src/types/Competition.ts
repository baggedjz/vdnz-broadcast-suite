export type CompetitionStage =
  | "Practice"
  | "Qualifying"
  | "Top32"
  | "Top16"
  | "Top8"
  | "Top4"
  | "Final"
  | "Finished";

export interface Competition {
  stage: CompetitionStage;
  currentBattle: number;
  totalBattles: number;
  currentRun: number;
  judgesReady: boolean;
}