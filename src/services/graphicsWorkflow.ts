import { useBroadcastStore } from "../store/broadcastStore";


export function showVSGraphic(
  driverOne: string,
  driverTwo: string
) {


  const store =
    useBroadcastStore.getState();



  store.setDrivers(
    driverOne,
    driverTwo
  );


  store.showGraphic(
    "VS"
  );

}



export function showWinnerGraphic(
  winner: string
) {


  const store =
    useBroadcastStore.getState();



  store.setWinner(
    winner
  );


  store.showGraphic(
    "WINNER"
  );

}



export function showDriverLowerThird(
  driver: string
) {


  const store =
    useBroadcastStore.getState();



  store.setDrivers(
    driver,
    ""
  );


  store.showGraphic(
    "LOWER_THIRD"
  );

}



export function showStandingsGraphic() {


  useBroadcastStore
    .getState()
    .showGraphic(
      "STANDINGS"
    );

}



export function clearGraphic() {


  useBroadcastStore
    .getState()
    .clearGraphic();

}