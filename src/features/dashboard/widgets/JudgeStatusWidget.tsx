import DashboardCard from "../../../components/ui/cards/DashboardCard";

export default function JudgeStatusWidget() {
  return (
    <DashboardCard title="Judges">
      <div className="space-y-2">
        <p>Judge 1 🟢</p>
        <p>Judge 2 🟢</p>
        <p>Judge 3 🟢</p>
      </div>
    </DashboardCard>
  );
}
