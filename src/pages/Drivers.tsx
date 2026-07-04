import { useMemo, useState } from "react";
import { drivers as initialDrivers } from "../store/drivers";

export default function Drivers() {
  const [search, setSearch] = useState("");

  const filteredDrivers = useMemo(() => {
    return initialDrivers.filter((driver) =>
      `${driver.firstName} ${driver.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-500">
            Driver Manager
          </h1>
          <p className="text-zinc-400">
            Manage drivers, teams and vehicles.
          </p>
        </div>

        <button className="rounded-lg bg-amber-600 px-4 py-2 font-semibold hover:bg-amber-500">
          + Add Driver
        </button>
      </div>

      <input
        type="text"
        placeholder="Search drivers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
      />

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Driver</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3 text-left">Car</th>
              <th className="p-3 text-left">#</th>
            </tr>
          </thead>

          <tbody>
            {filteredDrivers.map((driver) => (
              <tr
                key={driver.id}
                className="border-t border-zinc-800 hover:bg-zinc-900"
              >
                <td className="p-3">
                  {driver.firstName} {driver.lastName}
                </td>
                <td className="p-3">{driver.team}</td>
                <td className="p-3">{driver.car}</td>
                <td className="p-3">{driver.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}