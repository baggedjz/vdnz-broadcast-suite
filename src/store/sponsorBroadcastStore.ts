import { create } from "zustand";


interface SponsorBroadcastStore {


  activeSponsor: string;


  showSponsor:
    (name: string) => void;


  clearSponsor:
    () => void;


}



export const useSponsorBroadcastStore =
create<SponsorBroadcastStore>((set) => ({


  activeSponsor: "",



  showSponsor: (name) =>

    set({

      activeSponsor: name,

    }),




  clearSponsor: () =>

    set({

      activeSponsor: "",

    }),


}));