import { BBSCard } from "../../../components/ui";
import { useDashboardStore } from "../dashboardStore";

export default function SystemHealthCard() {
  const { systems } = useDashboardStore();

  return (
    <BBSCard title="System Health">
      <div className="space-y-3">
        {systems.map((system) => (
          <div
            key={system.name}
            className="flex items-center justify-between"
          >
            <span>{system.name}</span>

            <div
              className={`h-3 w-3 rounded-full ${
                system.connected
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />
          </div>
        ))}
      </div>
    </BBSCard>
  );
}