import { Wifi, Radio, CircleDot } from "lucide-react";
import { useOBSStore } from "../../store/obsStore";

export default function OBSStatusCard() {
  const { connected, currentScene } = useOBSStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        OBS Status
      </h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Wifi size={18} />
            Connection
          </span>

          <span
            className={
              connected
                ? "font-bold text-green-400"
                : "font-bold text-red-400"
            }
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CircleDot size={18} />
            Current Scene
          </span>

          <span className="font-bold text-cyan-400">
            {currentScene || "-"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Radio size={18} />
            Recording
          </span>

          <span className="text-zinc-400">
            Coming Soon
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Streaming</span>

          <span className="text-zinc-400">
            Coming Soon
          </span>
        </div>

      </div>

    </div>
  );
}