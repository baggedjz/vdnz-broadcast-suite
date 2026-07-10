import { BBSCard, BBSButton } from "../components/ui";

import {
  useReplayStore,
} from "../store/replayStore";

import {
  showReplayHighlight,
  returnLive,
} from "../services/replayOBS";



export default function ReplayDirector() {


  const {
    markers,
    clearMarkers,
  } = useReplayStore();



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Replay Director
        </h1>


        <p className="text-zinc-400">
          Highlight and replay control
        </p>

      </div>





      <BBSCard title="Replay Markers">


        {
          markers.length === 0 ? (

            <p className="text-zinc-500">
              No replay markers.
            </p>


          ) : (


            <div className="space-y-3">


              {markers.map((marker) => (


                <div

                  key={marker.id}

                  className="rounded-xl bg-zinc-800 p-4"

                >


                  <p className="font-bold text-white">

                    {marker.type}

                  </p>



                  <p className="text-zinc-400">

                    {marker.description}

                  </p>



                  <p className="text-zinc-500">

                    {marker.timestamp}

                  </p>





                  <BBSButton

                    onClick={() =>
                      showReplayHighlight(
                        marker.description
                      )
                    }

                  >

                    🎬 Play Replay

                  </BBSButton>



                </div>


              ))}


            </div>


          )
        }


      </BBSCard>





      <BBSButton

        variant="secondary"

        onClick={returnLive}

      >

        🏁 Return Live

      </BBSButton>





      <BBSButton

        variant="secondary"

        onClick={clearMarkers}

      >

        🗑 Clear Markers

      </BBSButton>



    </div>

  );

}