import { BBSButton, BBSCard } from "../ui";

import {
  setCamera,
} from "../../services/cameraDirector";

import {
  useCameraDirectorStore,
} from "../../store/cameraDirectorStore";


export default function CameraControlCard() {


  const {
    camera,
  } = useCameraDirectorStore();



  return (

    <BBSCard title="Camera Director">


      <div className="space-y-4">


        <p className="text-zinc-400">

          Current Camera:

          {" "}

          <span className="font-bold text-amber-400">

            {camera}

          </span>

        </p>



        <div className="grid grid-cols-3 gap-3">


          <BBSButton
            onClick={() =>
              setCamera("LEAD_CAM")
            }
          >
            🎥 Lead
          </BBSButton>



          <BBSButton
            onClick={() =>
              setCamera("CHASE_CAM")
            }
          >
            🎥 Chase
          </BBSButton>



          <BBSButton
            onClick={() =>
              setCamera("BATTLE_CAM")
            }
          >
            🔥 Battle
          </BBSButton>



          <BBSButton
            onClick={() =>
              setCamera("REPLAY_CAM")
            }
          >
            🎬 Replay
          </BBSButton>



          <BBSButton
            onClick={() =>
              setCamera("CINEMATIC_CAM")
            }
          >
            🎞 Cinematic
          </BBSButton>


        </div>


      </div>


    </BBSCard>

  );

}
