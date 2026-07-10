import { create } from "zustand";

export type SidebarMode =
  | "expanded"
  | "collapsed"
  | "hidden";

interface LayoutStore {
  sidebarMode: SidebarMode;

  setSidebarMode: (mode: SidebarMode) => void;

  toggleSidebar: () => void;
}

export const useLayoutStore =
create<LayoutStore>((set, get) => ({

  sidebarMode: "expanded",

  setSidebarMode: (mode) =>
    set({
      sidebarMode: mode,
    }),

  toggleSidebar: () => {

    const mode = get().sidebarMode;

    switch (mode) {

      case "expanded":
        set({
          sidebarMode: "collapsed",
        });
        break;

      case "collapsed":
        set({
          sidebarMode: "hidden",
        });
        break;

      case "hidden":
        set({
          sidebarMode: "expanded",
        });
        break;

    }

  },

}));