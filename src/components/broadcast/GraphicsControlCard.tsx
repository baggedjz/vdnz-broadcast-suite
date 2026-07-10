import { BBSButton, BBSCard } from "../ui";

import {
  showVSGraphic,
  showWinnerGraphic,
  showDriverLowerThird,
  showStandingsGraphic,
  clearGraphic,
} from "../../services/graphicsWorkflow";


export default function GraphicsControlCard() {


  return (

    <BBSCard title="Broadcast Graphics">


      <div className="grid grid-cols-2 gap-3">


        <BBSButton
          onClick={() =>
            showVSGraphic(
              "Lead Driver",
              "Chase Driver"
            )
          }
        >
          ⚔️ VS Graphic
        </BBSButton>



        <BBSButton
          onClick={() =>
            showWinnerGraphic(
              "Winner"
            )
          }
        >
          🏆 Winner Reveal
        </BBSButton>



        <BBSButton
          onClick={() =>
            showDriverLowerThird(
              "Driver"
            )
          }
        >
          👤 Driver Card
        </BBSButton>



        <BBSButton
          onClick={() =>
            showStandingsGraphic()
          }
        >
          📊 Standings
        </BBSButton>



        <BBSButton
          variant="secondary"
          onClick={() =>
            clearGraphic()
          }
        >
          ❌ Clear Graphic
        </BBSButton>


      </div>


    </BBSCard>

  );

}