import { Wifi, Radio, Trophy } from "lucide-react";
import { useOBSStore } from "../../store/obsStore";
import { useCompetitionStore } from "../../store/competitionStore";

export default function TopStatusBar() {
  const { connected } = useOBSStore();
  const { competition } = useCompetitionStore();

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

      <div className="flex items-center gap-6">

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
          <Radio size={18} className="text-red-400" />

          <span className="text-sm">
            Recording
          </span>
        </div>

      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">

          <Trophy
            size={18}
            className="text-cyan-400"
          />

          <span className="text-sm">
            {competition.stage}
          </span>

        </div>

        <span className="text-sm">
          Battle {competition.currentBattle}/{competition.totalBattles}
        </span>

      </div>

    </header>
  );
}