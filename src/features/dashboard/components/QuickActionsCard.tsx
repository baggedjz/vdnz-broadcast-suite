export default function QuickActionsCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-amber-500">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-lg bg-amber-500 p-3 font-semibold text-black">
          Start Event
        </button>

        <button className="rounded-lg bg-zinc-800 p-3">
          Next Battle
        </button>

        <button className="rounded-lg bg-zinc-800 p-3">
          Replay
        </button>

        <button className="rounded-lg bg-zinc-800 p-3">
          Broadcast
        </button>
      </div>
    </div>
  );
}