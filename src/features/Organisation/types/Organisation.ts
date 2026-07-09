export interface BrandColours {
  primary: string;
  secondary: string;
  accent: string;
}

export interface OBSConfiguration {
  address: string;
  port: number;
  password: string;

  scenes: {
    intro: string;
    vs: string;
    replay: string;
    winner: string;
    commentary: string;
  };
}

export interface CompetitionRules {
  format: "Top8" | "Top16" | "Top32" | "Top64";
  judges: 3 | 5;
  allowOMT: boolean;
}

export interface Organisation {
  id: string;

  name: string;
  shortName: string;

  logo: string;

  colours: BrandColours;

  obs: OBSConfiguration;

  competition: CompetitionRules;
}