import { useCompetitionStore } from "../store/competitionStore";

export default function CurrentBattlePanel() {
  const { battleQueue } = useCompetitionStore();

  const currentBattle =
    battleQueue.find((b) => b.status === "Live") ??
    battleQueue[0];

  if (!currentBattle)
    return (
      <div className="rounded-xl bg-zinc-900 p-6">
        No current battle.
      </div>
    );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        🏁 Current Battle
      </h2>

      <div className="grid grid-cols-3 items-center">

        <div className="text-center">
          <div className="text-2xl font-bold text-amber-500">
            {currentBattle.leadDriverName}
          </div>

          <div className="text-zinc-400">
            {currentBattle.leadCar}
          </div>
        </div>

        <div className="text-center text-5xl font-black">
          VS
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-amber-500">
            {currentBattle.chaseDriverName}
          </div>

          <div className="text-zinc-400">
            {currentBattle.chaseCar}
          </div>
        </div>

      </div>

    </div>
  );
}