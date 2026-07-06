import { useCompetitionStore } from "../store/competitionStore";

export default function Competition() {
  const {
    competition,
    battleQueue,
    setStage,
    setCurrentBattle,
    setJudgesReady,
  } = useCompetitionStore();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-amber-500">
        Competition Control
      </h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-6">

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Competition Stage
          </label>

          <select
            className="w-full rounded bg-zinc-800 p-3"
            value={competition.stage}
            onChange={(e) => setStage(e.target.value as any)}
          >
            <option>Practice</option>
            <option>Qualifying</option>
            <option>Top32</option>
            <option>Top16</option>
            <option>Top8</option>
            <option>Top4</option>
            <option>Final</option>
            <option>Finished</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl">Current Battle</span>

          <span className="text-3xl font-bold text-amber-500">
            #{competition.currentBattle}
          </span>
        </div>

        <button
          className="w-full rounded bg-amber-500 py-3 font-bold text-black hover:bg-amber-400"
          onClick={() => setCurrentBattle(competition.currentBattle + 1)}
        >
          ▶ Next Battle
        </button>

        <button
          className={`w-full rounded py-3 font-bold ${
            competition.judgesReady
              ? "bg-green-600"
              : "bg-zinc-700"
          }`}
          onClick={() => setJudgesReady(!competition.judgesReady)}
        >
          {competition.judgesReady
            ? "Judges Ready"
            : "Waiting For Judges"}
        </button>

        <div className="rounded-lg bg-zinc-800 p-4">
          <h2 className="mb-4 text-lg font-bold">
            Battle Queue
          </h2>

          {battleQueue.length === 0 ? (
            <p className="text-zinc-400">
              No battles queued.
            </p>
          ) : (
            <div className="space-y-2">
              {battleQueue.map((battle) => (
                <div
                  key={battle.id}
                  className="flex justify-between rounded bg-zinc-900 p-3"
                >
                  <span>
                    {battle.leadDriverId} vs {battle.chaseDriverId}
                  </span>

                  <span>{battle.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}