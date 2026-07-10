import { create } from "zustand";


export interface ChampionshipDriver {

  id: string;

  name: string;

  points: number;

  wins: number;

  podiums: number;

}



interface ChampionshipStore {


  drivers: ChampionshipDriver[];


  addDriver:
    (driver: ChampionshipDriver) => void;


  addPoints:
    (
      id: string,
      points: number
    ) => void;


  resetChampionship:
    () => void;


}



export const useChampionshipStore =
create<ChampionshipStore>((set) => ({


  drivers: [],



  addDriver: (driver) =>

    set((state) => ({

      drivers: [
        ...state.drivers,
        driver,
      ],

    })),



  addPoints: (
    id,
    points
  ) =>

    set((state) => ({

      drivers:

        state.drivers.map(
          (driver) =>

            driver.id === id

              ? {

                  ...driver,

                  points:
                    driver.points + points,

                }

              : driver

        ),

    })),



  resetChampionship: () =>

    set({

      drivers: [],

    }),


}));