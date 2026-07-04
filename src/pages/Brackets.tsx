export default function Brackets() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-amber-500">
        Tournament Control
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Current Battle</h2>

          <p>Lead Driver</p>
          <h3 className="text-2xl font-bold">Not Selected</h3>

          <div className="py-6 text-center text-4xl font-bold text-amber-500">
            VS
          </div>

          <p>Chase Driver</p>
          <h3 className="text-2xl font-bold">Not Selected</h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Battle Queue</h2>

          <ul className="space-y-3">
            <li>1. Waiting...</li>
            <li>2. Waiting...</li>
            <li>3. Waiting...</li>
            <li>4. Waiting...</li>
          </ul>
        </div>

      </div>
    </div>
  );
}