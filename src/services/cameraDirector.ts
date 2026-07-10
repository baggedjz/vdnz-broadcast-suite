import {
  useCameraDirectorStore,
  type CameraMode,
} from "../store/cameraDirectorStore";

import {
  switchCamera,
} from "./cameraOBS";



export async function setCamera(
  camera: CameraMode
) {


  useCameraDirectorStore
    .getState()
    .setCamera(
      camera
    );



  await switchCamera(
    camera
  );


}



export async function handleCameraEvent(
  event:
    | "TANDEM_LOCKED"
    | "REPLAY_TRIGGER"
    | "FINISH"
    | "NORMAL"
) {


  switch(event) {


    case "TANDEM_LOCKED":

      await setCamera(
        "BATTLE_CAM"
      );

      break;



    case "REPLAY_TRIGGER":

      await setCamera(
        "REPLAY_CAM"
      );

      break;



    case "FINISH":

      await setCamera(
        "CINEMATIC_CAM"
      );

      break;



    case "NORMAL":

      await setCamera(
        "LEAD_CAM"
      );

      break;


  }

}