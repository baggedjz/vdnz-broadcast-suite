import { BBSButton, BBSCard } from "../ui";
import { useOBSStore } from "../../store/obsStore";
import { broadcastScenes } from "../../config/broadcastScenes";


export default function SceneControls() {

  const { changeScene } = useOBSStore();


  return (
    <BBSCard title="Director Controls">

      <div className="grid grid-cols-5 gap-3">

        <BBSButton
          onClick={() => changeScene(broadcastScenes.intro)}
        >
          Intro
        </BBSButton>


        <BBSButton
          onClick={() => changeScene(broadcastScenes.battle)}
        >
          VS
        </BBSButton>


        <BBSButton
          onClick={() => changeScene(broadcastScenes.live)}
        >
          Live
        </BBSButton>


        <BBSButton
          onClick={() => changeScene(broadcastScenes.replay)}
          variant="secondary"
        >
          Replay
        </BBSButton>


        <BBSButton
          onClick={() => changeScene(broadcastScenes.winner)}
          variant="success"
        >
          Winner
        </BBSButton>

      </div>

    </BBSCard>
  );
}