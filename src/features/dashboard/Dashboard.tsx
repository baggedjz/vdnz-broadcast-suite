import CurrentBattleCard from "./components/CurrentBattleCard";
import ProgramPreviewCard from "./components/ProgramPreviewCard";
import BattleQueueCard from "./components/BattleQueueCard";
import ReplayFeedCard from "./components/ReplayFeedCard";
import SystemHealthCard from "./components/SystemHealthCard";
import EventStatisticsCard from "./components/EventStatisticsCard";
import QuickActionsCard from "./components/QuickActionsCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold text-amber-500">
          Mission Control
        </h1>

        <p className="text-zinc-400">
          Broadcast & Race Operations Centre
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CurrentBattleCard />
        <ProgramPreviewCard />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <BattleQueueCard />
        <ReplayFeedCard />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SystemHealthCard />
        <EventStatisticsCard />
      </div>

      <QuickActionsCard />

    </div>
  );
}