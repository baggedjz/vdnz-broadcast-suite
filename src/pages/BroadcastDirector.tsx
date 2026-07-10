import { BBSCard, BBSButton } from "../components/ui";

import CameraControlCard from "../components/broadcast/CameraControlCard";

import SponsorControlCard from "../components/broadcast/SponsorControlCard";

import {
  showVSOverlay,
  showWinnerOverlay,
  showStandingsOverlay,
  hideGraphics,
} from "../services/obsGraphics";



export default function BroadcastDirector() {


  return (

    <div className="space-y-6">



      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Broadcast Director
        </h1>


        <p className="text-zinc-400">
          Live production control
        </p>

      </div>





      <BBSCard title="Graphics Control">


        <div className="grid grid-cols-2 gap-4">


          <BBSButton
            onClick={showVSOverlay}
          >
            ⚔️ VS Overlay
          </BBSButton>



          <BBSButton
            onClick={showWinnerOverlay}
          >
            🏆 Winner
          </BBSButton>



          <BBSButton
            onClick={showStandingsOverlay}
          >
            📊 Standings
          </BBSButton>



          <BBSButton
            variant="secondary"
            onClick={hideGraphics}
          >
            ❌ Hide Graphics
          </BBSButton>


        </div>


      </BBSCard>






      <BBSCard title="Scene Control">


        <div className="grid grid-cols-3 gap-4">


          <BBSButton>
            🎬 Intro
          </BBSButton>



          <BBSButton>
            🏁 Live
          </BBSButton>



          <BBSButton>
            🔁 Replay
          </BBSButton>


        </div>


      </BBSCard>






      <CameraControlCard />

<SponsorControlCard />

    </div>

  );

}