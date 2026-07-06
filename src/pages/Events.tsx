import { useEventStore } from "../store/eventStore";

export default function Events() {
  const { currentEvent, updateEvent } = useEventStore();

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-amber-500">
        Event Manager
      </h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label>Event Name</label>

            <input
              className="mt-2 w-full rounded bg-zinc-800 p-3"
              value={currentEvent.name}
              onChange={(e) =>
                updateEvent({
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Series</label>

            <input
              className="mt-2 w-full rounded bg-zinc-800 p-3"
              value={currentEvent.series}
              onChange={(e) =>
                updateEvent({
                  series: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Venue</label>

            <input
              className="mt-2 w-full rounded bg-zinc-800 p-3"
              value={currentEvent.venue}
              onChange={(e) =>
                updateEvent({
                  venue: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Round</label>

            <input
              type="number"
              className="mt-2 w-full rounded bg-zinc-800 p-3"
              value={currentEvent.round}
              onChange={(e) =>
                updateEvent({
                  round: Number(e.target.value),
                })
              }
            />
          </div>

        </div>

      </div>

    </div>
  );
}