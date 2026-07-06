import DashboardCard from "../../../components/ui/cards/DashboardCard";

export default function CommunicationsWidget() {
  return (
    <DashboardCard title="Communications">
      <div className="space-y-2">
        <p>Discord Connected</p>
        <p>No new messages</p>
      </div>
    </DashboardCard>
  );
}
