export interface Battle {
  id: string;

  leadDriverId: string;
  chaseDriverId: string;

  status:
    | "queued"
    | "staging"
    | "live"
    | "finished";
}

export interface EventState {
  eventName: string;

  stage: string;

  currentBattle: number;

  battles: Battle[];
}