import { useBroadcastStore } from "../store/broadcastStore";
import { useTelemetryBroadcastStore } from "../store/telemetryBroadcastStore";
import { useSponsorBroadcastStore } from "../store/sponsorBroadcastStore";


export default function GraphicsOverlay() {


  const {
    activeGraphic,
    driverOne,
    driverTwo,
    winner,
  } = useBroadcastStore();



  const {
    activeSponsor,
  } = useSponsorBroadcastStore();



  const {
    alert,
  } = useTelemetryBroadcastStore();




  return (

    <div className="relative h-screen w-screen overflow-hidden bg-transparent">



      {/* Telemetry Alerts */}


      {alert === "TANDEM_LOCKED" && (

        <div className="absolute left-1/2 top-20 -translate-x-1/2">

          <div className="rounded-xl bg-black/80 px-12 py-6">

            <h1 className="text-5xl font-black text-orange-400">

              🔥 TANDEM LOCKED

            </h1>

          </div>

        </div>

      )}




      {alert === "HIGH_PRESSURE" && (

        <div className="absolute left-1/2 top-20 -translate-x-1/2">

          <div className="rounded-xl bg-black/80 px-12 py-6">

            <h1 className="text-5xl font-black text-red-400">

              ⚠ HIGH PRESSURE

            </h1>

          </div>

        </div>

      )}




      {alert === "REPLAY" && (

        <div className="absolute left-1/2 top-20 -translate-x-1/2">

          <div className="rounded-xl bg-black/80 px-12 py-6">

            <h1 className="text-5xl font-black text-blue-400">

              🎬 REPLAY

            </h1>

          </div>

        </div>

      )}




      {/* VS Graphic */}


      {activeGraphic === "VS" && (

        <div className="flex h-full items-center justify-center">


          <div className="rounded-2xl border border-amber-500 bg-black/80 px-24 py-12 text-center">


            <h1 className="text-7xl font-black text-white">

              {driverOne}

            </h1>



            <p className="my-6 text-5xl font-bold text-amber-400">

              VS

            </p>



            <h1 className="text-7xl font-black text-white">

              {driverTwo}

            </h1>


          </div>


        </div>

      )}






      {/* Winner Graphic */}


      {activeGraphic === "WINNER" && (

        <div className="flex h-full items-center justify-center">


          <div className="rounded-2xl border border-green-500 bg-black/80 px-24 py-12 text-center">


            <p className="text-5xl font-bold text-green-400">

              🏆 WINNER

            </p>



            <h1 className="mt-8 text-8xl font-black text-white">

              {winner}

            </h1>


          </div>


        </div>

      )}






      {/* Driver Lower Third */}


      {activeGraphic === "LOWER_THIRD" && (

        <div className="absolute bottom-20 left-20">


          <div className="rounded-xl bg-black/80 px-10 py-5">


            <h1 className="text-5xl font-black text-white">

              {driverOne}

            </h1>


          </div>


        </div>

      )}






      {/* Standings Graphic */}


      {activeGraphic === "STANDINGS" && (

        <div className="flex h-full items-center justify-center">


          <div className="rounded-xl bg-black/80 p-12 text-center">


            <h1 className="text-6xl font-black text-amber-400">

              VDNZ CHAMPIONSHIP

            </h1>



            <p className="mt-8 text-4xl text-white">

              LIVE STANDINGS

            </p>


          </div>


        </div>

      )}
{activeSponsor && (

  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">

    <div className="rounded-xl bg-black/80 px-10 py-4">

      <p className="text-3xl font-bold text-white">

        Supported by {activeSponsor}

      </p>

    </div>

  </div>

)}



    </div>

  );

}