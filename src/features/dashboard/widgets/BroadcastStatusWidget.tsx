import DashboardCard from "../../../components/ui/cards/DashboardCard";

export default function BroadcastStatusWidget() {
  return (
    <DashboardCard title="Broadcast Status">
      <div className="space-y-2">
        <p>🟢 OBS Connected</p>
        <p>🟢 Overlay Ready</p>
        <p>🔴 Stream Offline</p>
      </div>
    </DashboardCard>
  );
}
