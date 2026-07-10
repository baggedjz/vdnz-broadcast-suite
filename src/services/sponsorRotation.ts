import {
  useSponsorStore,
} from "../store/sponsorStore";

import {
  useSponsorBroadcastStore,
} from "../store/sponsorBroadcastStore";



let rotationIndex = 0;



export function rotateSponsor() {


  const sponsors =
    useSponsorStore
      .getState()
      .sponsors;



  if (
    sponsors.length === 0
  ) {

    return;

  }



  const sponsor =
    sponsors[
      rotationIndex %
      sponsors.length
    ];



  rotationIndex++;



  useSponsorBroadcastStore
    .getState()
    .showSponsor(
      sponsor.name
    );



}



export function clearSponsorRotation() {


  useSponsorBroadcastStore
    .getState()
    .clearSponsor();


}