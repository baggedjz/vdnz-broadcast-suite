import { BBSButton, BBSCard } from "../ui";
import { useOBSStore } from "../../store/obsStore";


export default function SceneControls() {

  const {
    changeScene,
  } = useOBSStore();


  return (

    <BBSCard title="Scene Controls">

      <div className="grid grid-cols-2 gap-3">


        <BBSButton
          onClick={() => changeScene("Intro")}
        >
          Intro
        </BBSButton>


        <BBSButton
          onClick={() => changeScene("Live")}
        >
          Live
        </BBSButton>


        <BBSButton
          variant="secondary"
          onClick={() => changeScene("Replay")}
        >
          Replay
        </BBSButton>


        <BBSButton
          variant="success"
          onClick={() => changeScene("Winner")}
        >
          Winner
        </BBSButton>


      </div>


    </BBSCard>

  );
}