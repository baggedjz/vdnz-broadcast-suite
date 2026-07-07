import { ScrollText } from "lucide-react";
import { useEventStore } from "../../store/eventLogStore";

export default function EventLogCard() {
  const { logs } = useEventStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-full">
      <div className="mb-4 flex items-center gap-2">
        <ScrollText className="text-cyan-400" />
        <h2 className="text-xl font-bold text-cyan-400">
          Event Log
        </h2>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-zinc-500">No events yet.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="rounded-lg bg-zinc-950 p-3"
            >
              <div className="text-xs text-zinc-500">
                {log.time}
              </div>

              <div className="text-sm">
                {log.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}