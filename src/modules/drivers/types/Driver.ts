export interface DriverStats {
  wins: number;
  podiums: number;
  battles: number;
}


export interface Driver {

  id: string;

  number: string;

  firstName: string;

  lastName: string;

  team: string;

  car: string;

  country: string;

  photo?: string;

  sponsors: string[];

  stats: DriverStats;

  notes?: string;

}