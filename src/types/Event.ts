export type CompetitionFormat =
  | "Qualifying"
  | "Top32"
  | "Top16"
  | "Top8"
  | "Top4"
  | "Final";

export interface Event {
  id: string;
  name: string;
  series: string;
  round: number;
  venue: string;
  date: string;
  format: CompetitionFormat;
  judges: string[];
  sponsors: string[];
  replayEnabled: boolean;
  obsSceneCollection: string;
}