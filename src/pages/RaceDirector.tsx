import CurrentBattleCard from "../components/raceDirector/CurrentBattleCard";
import BattleControlCard from "../components/raceDirector/BattleControlCard";
import ProgramPreviewCard from "../components/raceDirector/ProgramPreviewCard";
import SceneControls from "../components/raceDirector/SceneControls";
import BattleQueueCard from "../components/raceDirector/BattleQueueCard";
import GraphicsControlCard from "../components/broadcast/GraphicsControlCard";


export default function RaceDirector() {

  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Race Director
        </h1>

        <p className="text-zinc-400">
          Complete event control centre
        </p>

      </div>



      <CurrentBattleCard />



      <BattleQueueCard />




      <div className="grid grid-cols-2 gap-6">

        <ProgramPreviewCard />

        <SceneControls />

      </div>




      <BattleControlCard />




      <GraphicsControlCard />


    </div>

  );

}