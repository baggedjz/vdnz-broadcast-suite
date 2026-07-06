import DashboardCard from "../../../components/ui/cards/DashboardCard";

export default function EventStatusWidget() {
  return (
    <DashboardCard title="Event Status">
      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase text-zinc-500">Event</p>
          <p className="font-semibold text-lg">
            Winter Series Round 1
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">Venue</p>
          <p>Baypark</p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">Competition</p>
          <p>Top 32 Battles</p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">Current Battle</p>
          <p>5 / 16</p>
        </div>
      </div>
    </DashboardCard>
  );
}
