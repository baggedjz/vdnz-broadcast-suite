import {
  Trophy,
  SkipForward,
  Radio,
  Square,
  MonitorPlay,
  RotateCcw,
  Users,
} from "lucide-react";

import {
  setScene,
  startRecording,
  stopRecording,
} from "../../services/obs";

import { useCompetitionStore } from "../../store/competitionStore";

export default function QuickActionsCard() {
  const { nextBattle } = useCompetitionStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        Broadcast Control
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() => setScene("VS Overlay")}
          className="rounded-xl bg-cyan-500 py-4 font-semibold text-black transition hover:bg-cyan-400"
        >
          <div className="flex items-center justify-center gap-2">
            <Users size={20} />
            Driver VS
          </div>
        </button>

        <button
          onClick={() => setScene("Winner")}
          className="rounded-xl bg-green-600 py-4 font-semibold transition hover:bg-green-500"
        >
          <div className="flex items-center justify-center gap-2">
            <Trophy size={20} />
            Winner
          </div>
        </button>

        <button
          onClick={() => setScene("Replay")}
          className="rounded-xl bg-purple-600 py-4 font-semibold transition hover:bg-purple-500"
        >
          <div className="flex items-center justify-center gap-2">
            <RotateCcw size={20} />
            Replay
          </div>
        </button>

        <button
          onClick={() => setScene("Commentary")}
          className="rounded-xl bg-orange-600 py-4 font-semibold transition hover:bg-orange-500"
        >
          <div className="flex items-center justify-center gap-2">
            <MonitorPlay size={20} />
            Commentary
          </div>
        </button>

        <button
          onClick={startRecording}
          className="rounded-xl bg-red-600 py-4 font-semibold transition hover:bg-red-500"
        >
          <div className="flex items-center justify-center gap-2">
            <Radio size={20} />
            Start Record
          </div>
        </button>

        <button
          onClick={stopRecording}
          className="rounded-xl bg-zinc-700 py-4 font-semibold transition hover:bg-zinc-600"
        >
          <div className="flex items-center justify-center gap-2">
            <Square size={20} />
            Stop Record
          </div>
        </button>

        <button
          onClick={nextBattle}
          className="col-span-2 rounded-xl bg-cyan-700 py-4 font-semibold transition hover:bg-cyan-600"
        >
          <div className="flex items-center justify-center gap-2">
            <SkipForward size={20} />
            Next Battle
          </div>
        </button>

      </div>

    </div>
  );
}