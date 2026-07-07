import CurrentBattleCard from "../components/raceDirector/CurrentBattleCard";
import BattleQueueCard from "../components/raceDirector/BattleQueueCard";
import QuickActionsCard from "../components/raceDirector/QuickActionsCard";
import ProgramPreviewCard from "../components/raceDirector/ProgramPreviewCard";

export default function RaceDirector() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          🏁 Race Director
        </h1>

        <p className="mt-1 text-zinc-400">
          Live event control centre
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-4">
          <CurrentBattleCard />
        </div>

        <div className="col-span-8">
          <ProgramPreviewCard />
        </div>

        <div className="col-span-6">
          <BattleQueueCard />
        </div>

        <div className="col-span-6">
          <QuickActionsCard />
        </div>

      </div>

    </div>
  );
}