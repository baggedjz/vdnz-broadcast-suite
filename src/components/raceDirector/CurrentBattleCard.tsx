import { useCompetitionStore } from "../../store/competitionStore";

export default function CurrentBattleCard() {
  const { battleQueue, competition } = useCompetitionStore();

  const battle =
    battleQueue[competition.currentBattle - 1];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        Current Battle
      </h2>

      {battle ? (
        <div className="space-y-5">

          <div>

            <p className="text-sm text-zinc-500">
              Lead Driver
            </p>

            <h3 className="text-2xl font-bold">
              {battle.leadDriverName}
            </h3>

            <p className="text-zinc-400">
              {battle.leadCar}
            </p>

          </div>

          <div className="text-center text-4xl font-black text-cyan-400">
            VS
          </div>

          <div>

            <p className="text-sm text-zinc-500">
              Chase Driver
            </p>

            <h3 className="text-2xl font-bold">
              {battle.chaseDriverName}
            </h3>

            <p className="text-zinc-400">
              {battle.chaseCar}
            </p>

          </div>

        </div>
      ) : (
        <p>No Battle Loaded</p>
      )}

    </div>
  );
}