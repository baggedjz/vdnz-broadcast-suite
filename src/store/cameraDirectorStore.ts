import { create } from "zustand";


export type CameraMode =
  | "LEAD_CAM"
  | "CHASE_CAM"
  | "BATTLE_CAM"
  | "REPLAY_CAM"
  | "CINEMATIC_CAM";



interface CameraDirectorStore {

  camera:
    CameraMode;


  setCamera:
    (camera: CameraMode) => void;


}



export const useCameraDirectorStore =
create<CameraDirectorStore>((set) => ({

  camera: "BATTLE_CAM",


  setCamera: (camera) =>
    set({
      camera,
    }),

}));