import { create } from "zustand";


export interface Sponsor {

  id: string;

  name: string;

  logo: string;

  package:
    | "TITLE"
    | "GOLD"
    | "SILVER"
    | "BRONZE";

}



interface SponsorStore {


  sponsors: Sponsor[];


  addSponsor:
    (sponsor: Sponsor) => void;


  removeSponsor:
    (id: string) => void;


}



export const useSponsorStore =
create<SponsorStore>((set) => ({


  sponsors: [],



  addSponsor: (sponsor) =>

    set((state) => ({

      sponsors: [
        ...state.sponsors,
        sponsor,
      ],

    })),



  removeSponsor: (id) =>

    set((state) => ({

      sponsors:
        state.sponsors.filter(
          (sponsor) =>
            sponsor.id !== id
        ),

    })),


}));