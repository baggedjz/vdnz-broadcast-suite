import { setScene } from "./obs";


export type OBS_CAMERA =
  | "LEAD_CAM"
  | "CHASE_CAM"
  | "BATTLE_CAM"
  | "REPLAY_CAM"
  | "CINEMATIC_CAM";



const cameraScenes: Record<OBS_CAMERA, string> = {


  LEAD_CAM:
    "Lead Camera",


  CHASE_CAM:
    "Chase Camera",


  BATTLE_CAM:
    "Battle Camera",


  REPLAY_CAM:
    "Replay Camera",


  CINEMATIC_CAM:
    "Cinematic Camera",


};



export async function switchCamera(
  camera: OBS_CAMERA
) {


  const scene =
    cameraScenes[camera];



  if (!scene) {

    return false;

  }



  await setScene(
    scene
  );



  return true;

}