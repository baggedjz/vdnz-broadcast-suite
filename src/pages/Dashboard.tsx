import CurrentBattlePanel from "../components/CurrentBattlePanel";
import { useCompetitionStore } from "../store/competitionStore";

import {
  Clapperboard,
  Gavel,
  Trophy,
  Play,
  RotateCcw,
  Monitor,
  RefreshCw,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const { competition, battleQueue } = useCompetitionStore();

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-cyan-400">
        Race Director Workspace
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <CurrentBattlePanel />

        {/* Broadcast */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-xl font-bold text-cyan-400">
            Broadcast Status
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>OBS</span>
              <span className="text-green-400">● Connected</span>
            </div>

            <div className="flex justify-between">
              <span>Assetto Corsa</span>
              <span className="text-red-400">● Offline</span>
            </div>

            <div className="flex justify-between">
              <span>Overlay</span>
              <span className="text-cyan-400">● Ready</span>
            </div>

          </div>

        </div>

        {/* Competition */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-5 text-xl font-bold text-cyan-400">
            Competition
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Stage</span>
              <span className="font-bold text-cyan-400">
                {competition.stage}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Battle</span>
              <span className="font-bold text-cyan-400">
                {competition.currentBattle}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Queue</span>
              <span className="font-bold text-cyan-400">
                {battleQueue.length}
              </span>
            </div>

          </div>

        </div>

        {/* Live Control Console */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-xl font-bold text-cyan-400">
            Live Control Console
          </h2>

          <div className="grid grid-cols-4 gap-3">

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <Clapperboard className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Show VS</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <Gavel className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Judging</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <Trophy className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Winner</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <Play className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Next</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <RotateCcw className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Replay</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <Monitor className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Overlay</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <RefreshCw className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">Reset</p>
            </button>

            <button className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 hover:border-cyan-400 hover:bg-zinc-800">
              <Settings className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition" size={28}/>
              <p className="text-sm">More</p>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}