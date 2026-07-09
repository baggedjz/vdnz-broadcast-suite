import ConnectionStatusBar from "../components/ConnectionStatusBar";
import QuickActionsCard from "../components/QuickActionsCard";
import ActiveEventCard from "../components/ActiveEventCard";
import SystemHealthCard from "../components/SystemHealthCard";
import RecentEventsCard from "../components/RecentEventsCard";

export default function HomeDashboard() {
  return (
    <div className="space-y-6">
      <ConnectionStatusBar />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <QuickActionsCard />
        </div>

        <div className="col-span-5">
          <ActiveEventCard />
        </div>

        <div className="col-span-3">
          <SystemHealthCard />
        </div>
      </div>

      <RecentEventsCard />
    </div>
  );
}