import { BBSCard } from "../components/ui";
import {
  useEffect,
  useState,
} from "react";

import {
  onTelemetryUpdate,
  type TandemData,
} from "../services/telemetryService";


export default function Telemetry() {


  const [data, setData] =
    useState<TandemData | null>(null);



  useEffect(() => {


    const unsubscribe =
      onTelemetryUpdate(
        (telemetry) => {

          setData(
            telemetry
          );

        }
      );


    return unsubscribe;


  }, []);




  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Live Telemetry
        </h1>

        <p className="text-zinc-400">
          Assetto Corsa tandem monitoring
        </p>

      </div>




      {!data ? (

        <BBSCard title="Telemetry">

          <p className="text-zinc-500">
            Waiting for telemetry...
          </p>

        </BBSCard>


      ) : (


        <div className="grid grid-cols-2 gap-6">


          <BBSCard title="Lead Driver">

            <p>
              Speed:
              {" "}
              {data.lead.speed}
              km/h
            </p>


            <p>
              RPM:
              {" "}
              {data.lead.rpm}
            </p>


            <p>
              Angle:
              {" "}
              {data.lead.angle}°
            </p>


          </BBSCard>





          <BBSCard title="Chase Driver">


            <p>
              Speed:
              {" "}
              {data.chase.speed}
              km/h
            </p>


            <p>
              RPM:
              {" "}
              {data.chase.rpm}
            </p>


            <p>
              Angle:
              {" "}
              {data.chase.angle}°
            </p>


          </BBSCard>





          <BBSCard title="Tandem">


            <p>
              Gap:
              {" "}
              {data.gap}m
            </p>


            <p>
              Angle Difference:
              {" "}
              {data.angleDifference}°
            </p>


            <p className="text-amber-400">

              Pressure:
              {" "}
              {
                data.pressure > 80
                  ? "HIGH"
                  : "NORMAL"
              }

            </p>


          </BBSCard>


        </div>

      )}


    </div>

  );

}