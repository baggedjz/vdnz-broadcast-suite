import { Wifi, WifiOff, CircleDot } from "lucide-react";
import { useOBSStore } from "../../store/obsStore";

export default function OBSStatusCard() {
  const {
    connected,
    currentScene,
    connect,
    disconnect,
  } = useOBSStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-cyan-400">
          OBS Status
        </h2>

        {connected ? (
          <button
            onClick={disconnect}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
          >
            <WifiOff size={18} />
            Disconnect
          </button>
        ) : (
          <button
            onClick={connect}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400"
          >
            <Wifi size={18} />
            Connect OBS
          </button>
        )}

      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
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
          <span className="text-zinc-400">
            Current Scene
          </span>

          <span className="flex items-center gap-2 font-bold text-cyan-400">
            <CircleDot size={16} />
            {currentScene || "-"}
          </span>
        </div>

      </div>

    </div>
  );
}