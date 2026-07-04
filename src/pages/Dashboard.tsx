export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-amber-500">
        VDNZ Race Control
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Current Battle</h2>

          <div className="space-y-3">
            <p>
              <span className="text-zinc-400">Lead:</span> Not Selected
            </p>

            <p className="text-center text-2xl font-bold text-amber-500">
              VS
            </p>

            <p>
              <span className="text-zinc-400">Chase:</span> Not Selected
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Broadcast Status</h2>

          <div className="space-y-3">
            <p>🟢 OBS Connected</p>
            <p>🔴 Assetto Offline</p>
            <p>🟡 Overlay Idle</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Tournament</h2>

          <p>Round: Top 32</p>
          <p>Battle: Waiting</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>

          <div className="space-y-3">
            <button className="w-full rounded-lg bg-amber-600 p-3 font-bold hover:bg-amber-500">
              🎬 Show VS
            </button>

            <button className="w-full rounded-lg bg-green-700 p-3 font-bold hover:bg-green-600">
              🏆 Show Winner
            </button>

            <button className="w-full rounded-lg bg-red-700 p-3 font-bold hover:bg-red-600">
              ❌ Hide Graphics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}