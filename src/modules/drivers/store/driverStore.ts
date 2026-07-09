import { create } from "zustand";
import type { Driver } from "../types/Driver";


interface DriverStore {

  drivers: Driver[];

  addDriver: (driver: Driver) => void;

  updateDriver: (driver: Driver) => void;

  removeDriver: (id: string) => void;

}


export const useDriverStore = create<DriverStore>((set) => ({

  drivers: [

    {
      id: "1",
      number: "278",
      firstName: "Dylan",
      lastName: "Whareaitu",
      team: "Trendsetters",
      car: "Nissan Silvia S14",
      country: "New Zealand",
      sponsors: [
        "Trendsetters",
        "VDNZ",
      ],
      stats: {
        wins: 0,
        podiums: 0,
        battles: 0,
      },
    },

    {
      id: "2",
      number: "410",
      firstName: "Matt",
      lastName: "Howell",
      team: "Trendsetters",
      car: "Mazda RX-7",
      country: "New Zealand",
      sponsors: [
        "Trendsetters",
        "VDNZ",
      ],
      stats: {
        wins: 0,
        podiums: 0,
        battles: 0,
      },
    },

  ],


  addDriver: (driver) =>
    set((state) => ({
      drivers: [
        ...state.drivers,
        driver,
      ],
    })),


  updateDriver: (driver) =>
    set((state) => ({
      drivers: state.drivers.map((item) =>
        item.id === driver.id
          ? driver
          : item
      ),
    })),


  removeDriver: (id) =>
    set((state) => ({
      drivers: state.drivers.filter(
        (driver) => driver.id !== id
      ),
    })),


}));