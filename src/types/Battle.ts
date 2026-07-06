export interface Battle {
  id: string;

  leadDriverId: string;
  chaseDriverId: string;

  leadDriverName: string;
  chaseDriverName: string;

  leadCar: string;
  chaseCar: string;

  status: "Queued" | "On Deck" | "Live" | "Completed";

  winnerId?: string;
}