import CurrentBattleCard from "../components/raceDirector/CurrentBattleCard";
import BattleQueueCard from "../components/raceDirector/BattleQueueCard";
import ProgramPreviewCard from "../components/raceDirector/ProgramPreviewCard";
import QuickActionsCard from "../components/raceDirector/QuickActionsCard";
import EventLogCard from "../components/raceDirector/EventLogCard";

export default function RaceDirector() {
  return (
    <div className="flex h-full flex-col gap-6">

      {/* Workspace */}
      <div className="grid flex-1 grid-cols-12 gap-6">

        {/* Left */}
        <div className="col-span-3 flex flex-col gap-6">
          <CurrentBattleCard />
          <BattleQueueCard />
        </div>

        {/* Centre */}
        <div className="col-span-6">
          <ProgramPreviewCard />
        </div>

        {/* Right */}
        <div className="col-span-3">
          <QuickActionsCard />
        </div>

      </div>

      {/* Bottom */}
      <div className="h-64">
        <EventLogCard />
      </div>

    </div>
  );
}