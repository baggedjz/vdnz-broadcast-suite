export default function Broadcast() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-amber-500">
        Broadcast Control
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">
            Live Preview
          </h2>

          <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-black">
            <p className="text-zinc-500">
              OBS Program Output
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Overlay Controls
          </h2>

          <div className="space-y-4">

            <button className="w-full rounded-lg bg-amber-600 p-3 font-bold hover:bg-amber-500">
              🎬 Show VS
            </button>

            <button className="w-full rounded-lg bg-blue-600 p-3 font-bold hover:bg-blue-500">
              📊 Show Scores
            </button>

            <button className="w-full rounded-lg bg-green-700 p-3 font-bold hover:bg-green-600">
              🏆 Winner
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