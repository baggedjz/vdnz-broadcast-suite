import {
  Wifi,
  Radio,
  Trophy,
  Monitor,
  Clock3,
  Database,
  Gamepad2,
  MessageSquare,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useOBSStore } from "../../store/obsStore";
import { useCompetitionStore } from "../../store/competitionStore";
import { useAppStore } from "../../store/appStore";

export default function TopStatusBar() {
  const {
    connected,
    recording,
    streaming,
    currentScene,
  } = useOBSStore();

  const { competition } = useCompetitionStore();

  const {
    databaseStatus,
    assettoStatus,
    discordStatus,
  } = useAppStore();

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const statusColour = (
    status: "CONNECTED" | "CONNECTING" | "DISCONNECTED"
  ) => {
    switch (status) {
      case "CONNECTED":
        return "text-green-400";

      case "CONNECTING":
        return "text-yellow-400";

      default:
        return "text-red-400";
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-[#090909] px-6">

      {/* Left */}

      <div className="flex items-center gap-6">

        <h1 className="text-lg font-bold tracking-wide text-amber-500">
          VDNZ BBS
        </h1>

        <div className="h-6 w-px bg-zinc-700" />

        <div className="flex items-center gap-2">
          <Wifi
            size={16}
            className={
              connected
                ? "text-green-400"
                : "text-red-400"
            }
          />
          <span className="text-sm">
            OBS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Database
            size={16}
            className={statusColour(databaseStatus)}
          />
          <span className="text-sm">
            Database
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Gamepad2
            size={16}
            className={statusColour(assettoStatus)}
          />
          <span className="text-sm">
            Assetto
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare
            size={16}
            className={statusColour(discordStatus)}
          />
          <span className="text-sm">
            Discord
          </span>
        </div>

      </div>

      {/* Centre */}

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">
          <Radio
            size={16}
            className={
              recording
                ? "text-red-500"
                : "text-zinc-600"
            }
          />

          <span className="text-sm">
            {recording ? "REC" : "Idle"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Radio
            size={16}
            className={
              streaming
                ? "text-green-400"
                : "text-zinc-600"
            }
          />

          <span className="text-sm">
            {streaming ? "LIVE" : "Offline"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Monitor
            size={16}
            className="text-cyan-400"
          />

          <span className="text-sm">
            {currentScene || "No Scene"}
          </span>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">

          <Trophy
            size={16}
            className="text-yellow-400"
          />

          <span className="text-sm">
            {competition.stage}
          </span>

        </div>

        <span className="text-sm text-zinc-300">
          Battle {competition.currentBattle} / {competition.totalBattles}
        </span>

        <div className="flex items-center gap-2">

          <Clock3
            size={16}
            className="text-cyan-400"
          />

          <span className="font-mono text-sm">
            {time}
          </span>

        </div>

      </div>

    </header>
  );
}