import { useState } from "react";
import { drivers } from "../store/drivers";

export default function Battles() {
  const [lead, setLead] = useState("");
  const [chase, setChase] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-amber-500">
        Battle Manager
      </h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
        <div>
          <label className="mb-2 block font-semibold">
            Lead Driver
          </label>

          <select
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            value={lead}
            onChange={(e) => setLead(e.target.value)}
          >
            <option value="">Select Driver</option>

            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.firstName} {driver.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Chase Driver
          </label>

          <select
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
            value={chase}
            onChange={(e) => setChase(e.target.value)}
          >
            <option value="">Select Driver</option>

            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.firstName} {driver.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <button className="rounded-lg bg-amber-600 p-3 font-bold hover:bg-amber-500">
            🎬 Show VS
          </button>

          <button className="rounded-lg bg-green-700 p-3 font-bold hover:bg-green-600">
            🏆 Show Winner
          </button>

          <button className="rounded-lg bg-red-700 p-3 font-bold hover:bg-red-600">
            ❌ Hide Graphics
          </button>
        </div>
      </div>
    </div>
  );
}