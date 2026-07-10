import { BBSCard } from "../../../components/ui";
import { useCompetitionStore } from "../../../store/competitionStore";

export default function BattleQueueCard() {
  const { battleQueue } = useCompetitionStore();

  return (
    <BBSCard title="Battle Queue">
      <div className="space-y-3">
        {battleQueue.map((battle) => (
          <div
            key={battle.id}
            className={`rounded-xl border p-4 transition ${
              battle.status === "Live"
                ? "border-green-500 bg-green-500/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  {battle.leadDriverName}
                </h3>

                <p className="text-sm text-zinc-400">
                  {battle.leadCar}
                </p>
              </div>

              <span className="text-amber-500 font-bold">
                VS
              </span>

              <div className="text-right">
                <h3 className="font-semibold">
                  {battle.chaseDriverName}
                </h3>

                <p className="text-sm text-zinc-400">
                  {battle.chaseCar}
                </p>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  battle.status === "Live"
                    ? "bg-green-600"
                    : "bg-zinc-700"
                }`}
              >
                {battle.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </BBSCard>
  );
}