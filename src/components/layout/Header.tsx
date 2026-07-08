import {
  Wifi,
  Radio,
  CircleDot,
  Clock3,
  Flag,
} from "lucide-react";

import { useOBSStore } from "../../store/obsStore";
import { useCompetitionStore } from "../../store/competitionStore";
import { useEffect, useState } from "react";

function Status({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
        active
          ? "bg-green-500/10 text-green-400"
          : "bg-zinc-900 text-zinc-500"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

export default function Header() {
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
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-[#090909] px-8">

      <div>

        <h1 className="text-2xl font-bold text-white">
          🏁 Race Director
        </h1>

        <p className="text-sm text-zinc-500">
          Broadcast Business Suite
        </p>

      </div>

      <div className="flex items-center gap-3">

        <Status
          icon={<Wifi size={16} />}
          label="OBS"
          active={connected}
        />

        <Status
          icon={<Radio size={16} />}
          label="REC"
          active={false}
        />

        <Status
          icon={<CircleDot size={16} />}
          label={competition.stage}
          active
        />

        <Status
          icon={<Flag size={16} />}
          label={`Battle ${competition.currentBattle}/${competition.totalBattles}`}
          active
        />

        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-cyan-400">

          <Clock3 size={16} />

          <span className="font-semibold">
            {time}
          </span>

        </div>

      </div>

    </header>
  );
}