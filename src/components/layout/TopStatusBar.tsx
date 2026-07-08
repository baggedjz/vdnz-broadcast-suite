import {
  Wifi,
  Radio,
  Trophy,
  Monitor,
  Clock3,
} from "lucide-react";

import { useOBSStore } from "../../store/obsStore";
import { useCompetitionStore } from "../../store/competitionStore";

export default function TopStatusBar() {
  const {
    connected,
    recording,
    streaming,
    currentScene,
  } = useOBSStore();

  const { competition } = useCompetitionStore();

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-[#090909] px-6">

      <div className="flex items-center gap-6">

        <h1 className="text-xl font-bold tracking-wide text-cyan-400">
          BBS RACE CONTROL
        </h1>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex items-center gap-2">
          <Wifi
            size={18}
            className={
              connected ? "text-green-400" : "text-red-400"
            }
          />

          <span className="text-sm">
            {connected ? "OBS Connected" : "OBS Offline"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Radio
            size={18}
            className={
              recording ? "text-red-500" : "text-zinc-600"
            }
          />

          <span className="text-sm">
            {recording ? "REC" : "Idle"}
          </span>
        </div>
        <div className="flex items-center gap-2">
  <Radio
    size={18}
    className={
      streaming ? "text-green-400" : "text-zinc-600"
    }
  />

  <span className="text-sm">
    {streaming ? "LIVE" : "Offline"}
  </span>
</div>

        <div className="flex items-center gap-2">
          <Monitor
            size={18}
            className="text-cyan-400"
          />

          <span className="text-sm">
            {currentScene || "No Scene"}
          </span>
        </div>

      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">
          <Trophy
            size={18}
            className="text-yellow-400"
          />

          <span>
            {competition.stage}
          </span>
        </div>

        <span>
          Battle {competition.currentBattle}/{competition.totalBattles}
        </span>

        <div className="flex items-center gap-2">

          <Clock3
            size={18}
            className="text-cyan-400"
          />

          <span>{time}</span>

        </div>

      </div>

    </header>
  );
}