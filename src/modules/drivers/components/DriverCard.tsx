import type { Driver } from "../types/Driver";
import { BBSBadge, BBSCard } from "../../../components/ui";


interface Props {
  driver: Driver;
}


export default function DriverCard({
  driver,
}: Props) {


  return (

    <BBSCard>


      <div className="space-y-4">


        <div className="flex items-center gap-4">


          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-800 text-2xl font-bold text-cyan-400">

            #{driver.number}

          </div>


          <div>

            <h2 className="text-xl font-bold text-white">

              {driver.firstName} {driver.lastName}

            </h2>


            <p className="text-zinc-400">

              {driver.team}

            </p>

          </div>


        </div>



        <div>

          <p className="text-sm text-zinc-500">
            Vehicle
          </p>

          <p className="font-semibold text-white">
            {driver.car}
          </p>

        </div>



        <div className="flex flex-wrap gap-2">

          {driver.sponsors.map((sponsor) => (

            <BBSBadge
              key={sponsor}
              variant="info"
            >
              {sponsor}
            </BBSBadge>

          ))}

        </div>



      </div>


    </BBSCard>

  );
}