export default function Tournament() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-amber-500">
        Tournament
      </h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-zinc-400">
          Tournament generator coming soon...
        </p>

        <button
          className="mt-6 rounded bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400"
        >
          Generate Tournament
        </button>
      </div>
    </div>
  );
}