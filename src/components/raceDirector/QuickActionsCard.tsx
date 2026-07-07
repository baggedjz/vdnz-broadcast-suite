import { Play, Trophy, SkipForward } from "lucide-react";
import { useCompetitionStore } from "../../store/competitionStore";
import { setScene } from "../../services/obs";

export default function QuickActionsCard() {
  const { nextBattle } = useCompetitionStore();

  async function showVS() {
    await setScene("VS Overlay");
  }

  async function showWinner() {
    await setScene("Winner");
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={showVS}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-4 font-bold text-black transition hover:bg-cyan-400"
        >
          <Play size={20} />
          Show VS
        </button>

        <button
          onClick={showWinner}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold transition hover:bg-green-500"
        >
          <Trophy size={20} />
          Show Winner
        </button>

        <button
          onClick={nextBattle}
          className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-4 font-bold transition hover:bg-zinc-700"
        >
          <SkipForward size={20} />
          Next Battle
        </button>

      </div>

    </div>
  );
}