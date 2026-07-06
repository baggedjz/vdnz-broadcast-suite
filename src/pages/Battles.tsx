import { drivers } from "../store/drivers";
import { useBattleStore } from "../store/battleStore";

export default function Battles() {
  const {
    leadDriver,
    chaseDriver,
    setLeadDriver,
    setChaseDriver,
  } = useBattleStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-amber-500">
            Battle Manager
          </h1>
          <p className="text-zinc-400">
            Select the current battle for broadcast.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">

        {/* Lead Driver */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Lead Driver</h2>

          <select
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            value={leadDriver}
            onChange={(e) => setLeadDriver(e.target.value)}
          >
            <option value="">Select Lead Driver</option>

            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                #{driver.number} • {driver.firstName} {driver.lastName}
              </option>
            ))}
          </select>

          {leadDriver && (
            <div className="mt-6 rounded-lg bg-zinc-800 p-4">
              {(() => {
                const driver = drivers.find((d) => d.id === leadDriver);
                if (!driver) return null;

                return (
                  <>
                    <h3 className="text-2xl font-bold">
                      {driver.firstName} {driver.lastName}
                    </h3>

                    <p>{driver.team}</p>
                    <p>{driver.car}</p>
                    <p>#{driver.number}</p>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Chase Driver */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-bold">Chase Driver</h2>

          <select
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            value={chaseDriver}
            onChange={(e) => setChaseDriver(e.target.value)}
          >
            <option value="">Select Chase Driver</option>

            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                #{driver.number} • {driver.firstName} {driver.lastName}
              </option>
            ))}
          </select>

          {chaseDriver && (
            <div className="mt-6 rounded-lg bg-zinc-800 p-4">
              {(() => {
                const driver = drivers.find((d) => d.id === chaseDriver);
                if (!driver) return null;

                return (
                  <>
                    <h3 className="text-2xl font-bold">
                      {driver.firstName} {driver.lastName}
                    </h3>

                    <p>{driver.team}</p>
                    <p>{driver.car}</p>
                    <p>#{driver.number}</p>
                  </>
                );
              })()}
            </div>
          )}
        </div>

      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-bold text-amber-500">
          Broadcast Controls
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <button className="rounded-lg bg-amber-600 p-4 font-bold hover:bg-amber-500">
            🎬 Show VS
          </button>

          <button className="rounded-lg bg-green-700 p-4 font-bold hover:bg-green-600">
            🏆 Winner
          </button>

          <button className="rounded-lg bg-blue-700 p-4 font-bold hover:bg-blue-600">
            📊 Scores
          </button>

          <button className="rounded-lg bg-red-700 p-4 font-bold hover:bg-red-600">
            ❌ Hide
          </button>
        </div>
      </div>
    </div>
  );
}
