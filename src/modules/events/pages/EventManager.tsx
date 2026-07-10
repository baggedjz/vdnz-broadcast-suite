import { BBSCard, BBSButton } from "../../../components/ui";

import { useEventStore } from "../store/eventStore";
import EventWizard from "../components/EventWizard";

import { useDriverStore } from "../../drivers/store/driverStore";

import { createTop32Bracket } from "../../../services/bracketWorkflow";


export default function EventManager() {


  const {
    events,
  } = useEventStore();



  const {
    drivers,
  } = useDriverStore();




  const generateBracket = () => {

    const created =
      createTop32Bracket(
        drivers
      );


    console.log(
      `${created} battles created`
    );

  };





  return (

    <div className="space-y-6">


      <EventWizard />



      <BBSCard title="Tournament Setup">


        <div className="space-y-4">


          <p className="text-zinc-400">

            Drivers Loaded:
            {" "}
            {drivers.length}

          </p>



          <BBSButton

            onClick={generateBracket}

            disabled={drivers.length < 2}

          >

            🏆 Generate Top 32 Bracket

          </BBSButton>


        </div>


      </BBSCard>





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