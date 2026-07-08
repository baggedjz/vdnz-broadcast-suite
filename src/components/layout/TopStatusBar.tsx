import { useEffect, useState } from "react";
import {
  Wifi,
  Radio,
  Trophy,
  Flag,
  Clock3,
} from "lucide-react";

import { useOBSStore } from "../../store/obsStore";
import { useCompetitionStore } from "../../store/competitionStore";

function Badge({
  active,
  icon,
  label,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${
        active
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-zinc-800 bg-zinc-900 text-zinc-500"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default function TopStatusBar() {
  const { connected } = useOBSStore();
  const { competition } = useCompetitionStore();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-[#080808] px-8">

      <div>

        <h1 className="text-2xl font-bold tracking-wide">
          🏁 BBS Race Control
        </h1>

        <p className="text-sm text-zinc-500">
          Broadcast Business Suite
        </p>

      </div>

      <div className="flex items-center gap-3">

        <Badge
          active={connected}
          icon={<Wifi size={16} />}
          label={connected ? "OBS Connected" : "OBS Offline"}
        />

        <Badge
          active={false}
          icon={<Radio size={16} />}
          label="Recording"
        />

        <Badge
          active
          icon={<Trophy size={16} />}
          label={competition.stage}
        />

        <Badge
          active
          icon={<Flag size={16} />}
          label={`Battle ${competition.currentBattle}/${competition.totalBattles}`}
        />

        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">

          <Clock3
            size={16}
            className="text-cyan-400"
          />

          <span className="font-semibold text-cyan-400">
            {time}
          </span>

        </div>

      </div>

    </header>
  );
}