import DashboardCard from "../../../components/ui/cards/DashboardCard";

export default function TournamentWidget() {
  return (
    <DashboardCard title="Tournament">
      <div className="space-y-2">
        <p>Top 32</p>
        <p>Battle 5 / 16</p>
      </div>
    </DashboardCard>
  );
}
