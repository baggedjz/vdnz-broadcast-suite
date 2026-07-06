import type { Driver } from "../../types/Driver";

type Props = {
  driver: Driver;
};

export default function DriverCard({ driver }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-amber-500 transition">

      <div className="flex items-center gap-4">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-700 text-3xl">
          📷
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-bold">
            {driver.firstName} {driver.lastName}
          </h2>

          <p className="text-zinc-400">
            {driver.team}
          </p>

          <p className="text-sm text-zinc-500">
            {driver.car}
          </p>

        </div>

        <div className="text-right">

          <div className="text-3xl font-black text-amber-500">
            #{driver.number}
          </div>

          <p className="text-xs text-zinc-500">
            {driver.country}
          </p>

        </div>

      </div>

    </div>
  );
}
