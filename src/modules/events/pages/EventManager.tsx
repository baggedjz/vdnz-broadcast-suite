import { BBSCard } from "../../../components/ui";
import { useEventStore } from "../store/eventStore";
import EventWizard from "../components/EventWizard";


export default function EventManager() {

  const {
    events,
  } = useEventStore();


  return (

    <div className="space-y-6">

      <EventWizard />


      <BBSCard title="Events">

        {
          events.length === 0 ? (

            <p className="text-zinc-500">
              No events created.
            </p>

          ) : (

            <div className="space-y-3">

              {events.map((event) => (

                <div
                  key={event.id}
                  className="rounded-xl bg-zinc-800 p-4"
                >

                  <p className="font-bold text-white">
                    {event.name}
                  </p>

                  <p className="text-zinc-400">
                    {event.organisation}
                  </p>

                  <p className="text-zinc-500">
                    {event.venue}
                  </p>

                </div>

              ))}

            </div>

          )
        }

      </BBSCard>

    </div>

  );
}