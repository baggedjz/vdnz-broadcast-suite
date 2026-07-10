export interface HealthStatus {
  name: string;
  connected: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  message: string;
  level: "info" | "success" | "warning";
}