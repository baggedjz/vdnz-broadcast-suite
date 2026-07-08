import Panel from "../ui/Panel";
import { useEventLogStore } from "../../store/eventLogStore";

export default function EventLogCard() {
  const { events } = useEventLogStore();

  return (
    <Panel title="📝 Event Timeline" className="h-full">
      <div className="space-y-3 overflow-y-auto">

        {events.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-zinc-800 text-zinc-500">
            No events yet
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-start justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {event.message}
                </p>

                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {event.type}
                </p>
              </div>

              <span className="text-xs font-medium text-cyan-400">
                {event.time}
              </span>
            </div>
          ))
        )}

      </div>
    </Panel>
  );
}