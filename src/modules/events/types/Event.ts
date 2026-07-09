export interface Event {

  id: string;

  name: string;

  organisation: string;

  venue: string;

  date: string;

  format:
    | "Top 32"
    | "Top 16"
    | "Top 8"
    | "Custom";


  status:
    | "draft"
    | "ready"
    | "live"
    | "complete";


  createdAt: string;

}