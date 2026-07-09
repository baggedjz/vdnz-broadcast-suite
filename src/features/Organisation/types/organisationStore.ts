import { create } from "zustand";
import type { Organisation } from "../types/Organisation";

type OrganisationStore = {
  organisation: Organisation | null;

  setOrganisation: (organisation: Organisation) => void;
};

export const useOrganisationStore =
  create<OrganisationStore>((set) => ({
    organisation: null,

    setOrganisation: (organisation) =>
      set({ organisation }),
  }));