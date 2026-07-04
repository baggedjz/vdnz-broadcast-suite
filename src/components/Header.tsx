import { useState } from "react";
import { connectOBS } from "../services/obs";

export default function Header() {
  const [connected, setConnected] = useState(false);

  async function handleConnect() {
    const password = prompt("Enter your OBS WebSocket password:");

    if (password === null) return;

    const success = await connectOBS(password);

    if (success) {
      setConnected(true);
    } else {
      alert("Failed to connect to OBS.\n\nCheck:\n• OBS is running\n• WebSocket is enabled\n• Port is 4455\n• Password is correct");
    }
  }

  return (
    <header className="flex justify-between items-center border-b border-zinc-800 p-6">
      <div>
        <h2 className="text-3xl font-bold text-amber-500">
          VDNZ Broadcast Suite
        </h2>

        <p className="text-zinc-400">
          Virtual Drift New Zealand
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleConnect}
          className="rounded-lg bg-amber-600 px-5 py-3 font-bold hover:bg-amber-500"
        >
          Connect OBS
        </button>

        <div
          className={`rounded-full px-4 py-2 font-bold ${
            connected ? "bg-green-700" : "bg-red-700"
          }`}
        >
          {connected ? "🟢 OBS Connected" : "🔴 OBS Offline"}
        </div>
      </div>
    </header>
  );
}