import DriverCard from "../components/drivers/DriverCard";
import { drivers } from "../store/drivers";

export default function Drivers() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold text-amber-500">
          Driver Manager
        </h1>

        <button className="rounded-lg bg-amber-600 px-5 py-3 font-bold hover:bg-amber-500">
          + Add Driver
        </button>

      </div>

      <input
        placeholder="Search Drivers..."
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4"
      />

      <div className="grid gap-4">

        {drivers.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
          />
        ))}

      </div>

    </div>
  );
}
