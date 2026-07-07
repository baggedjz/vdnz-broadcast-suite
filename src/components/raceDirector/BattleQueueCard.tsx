import { useCompetitionStore } from "../../store/competitionStore";

export default function BattleQueueCard() {
  const { battleQueue } = useCompetitionStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-cyan-400">
          Battle Queue
        </h2>

        <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
          {battleQueue.length} Battles
        </span>

      </div>

      <div className="space-y-3">

        {battleQueue.map((battle, index) => (

          <div
            key={battle.id}
            className={`rounded-xl border p-4 transition ${
              battle.status === "Live"
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-zinc-700 bg-zinc-950"
            }`}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold">
                  Battle {index + 1}
                </p>

                <p className="text-sm text-zinc-400">
                  {battle.leadDriverName} vs {battle.chaseDriverName}
                </p>

              </div>

              <span
                className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                  battle.status === "Live"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {battle.status}
              </span>

            </div>
          </div>

        ))}

      </div>

    </div>
  );
}