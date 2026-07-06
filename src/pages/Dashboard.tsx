import CurrentBattlePanel from "../components/CurrentBattlePanel";
import { useCompetitionStore } from "../store/competitionStore";

export default function Dashboard() {
  const { competition, battleQueue } = useCompetitionStore();

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-amber-500">
        Broadcast Business Suite
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <CurrentBattlePanel />

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">
            📺 Broadcast Status
          </h2>

          <div className="space-y-2">
            <p>🟢 OBS Connected</p>
            <p>🔴 Assetto Offline</p>
            <p>🟢 Overlay Ready</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold">
            🌳 Competition
          </h2>

          <p>
            Stage:
            <span className="ml-2 text-amber-500 font-bold">
              {competition.stage}
            </span>
          </p>

          <p>
            Current Battle:
            <span className="ml-2 text-amber-500 font-bold">
              {competition.currentBattle}
            </span>
          </p>

          <p>
            Battles Queued:
            <span className="ml-2 text-amber-500 font-bold">
              {battleQueue.length}
            </span>
          </p>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold">
            ⚡ Quick Actions
          </h2>

          <div className="space-y-3">

            <button className="w-full rounded-lg bg-amber-600 p-3 font-bold hover:bg-amber-500">
              🎬 Show VS
            </button>

            <button className="w-full rounded-lg bg-blue-700 p-3 font-bold hover:bg-blue-600">
              👨‍⚖️ Open Judging
            </button>

            <button className="w-full rounded-lg bg-green-700 p-3 font-bold hover:bg-green-600">
              🏆 Show Winner
            </button>

            <button className="w-full rounded-lg bg-red-700 p-3 font-bold hover:bg-red-600">
              ❌ Hide Graphics
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}