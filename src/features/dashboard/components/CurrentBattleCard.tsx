import { BBSCard } from "../../../components/ui";
import { useCompetitionStore } from "../../../store/competitionStore";

export default function CurrentBattleCard() {
  const { competition, battleQueue } = useCompetitionStore();

  const currentBattle =
    battleQueue.find((battle) => battle.status === "Live") ??
    battleQueue[0];

  return (
    <BBSCard title="Current Battle">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="rounded-lg bg-amber-500 px-3 py-1 text-sm font-semibold text-black">
            {competition.stage}
          </span>

          <span className="text-sm text-zinc-400">
            Battle {competition.currentBattle} / {competition.totalBattles}
          </span>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Lead Driver
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {currentBattle.leadDriverName}
          </h3>

          <p className="text-zinc-400">
            {currentBattle.leadCar}
          </p>
        </div>

        <div className="text-center text-3xl font-black text-amber-500">
          VS
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Chase Driver
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {currentBattle.chaseDriverName}
          </h3>

          <p className="text-zinc-400">
            {currentBattle.chaseCar}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-3">
          <span>Run {competition.currentRun}</span>

          <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold">
            {currentBattle.status}
          </span>
        </div>
      </div>
    </BBSCard>
  );
}