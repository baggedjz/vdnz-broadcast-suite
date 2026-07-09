import type { Driver } from "../types/Driver";

import {
  BBSBadge,
  BBSCard,
} from "../../../components/ui";


interface Props {
  driver: Driver;
}


export default function DriverProfile({
  driver,
}: Props) {

  return (

    <BBSCard title="Driver Profile">

      <div className="space-y-5">


        <div>

          <h2 className="text-3xl font-bold text-white">
            #{driver.number} {driver.firstName} {driver.lastName}
          </h2>

          <p className="text-zinc-400">
            {driver.team}
          </p>

        </div>



        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-zinc-500">
              Vehicle
            </p>

            <p className="font-bold text-white">
              {driver.car}
            </p>
          </div>


          <div>
            <p className="text-sm text-zinc-500">
              Country
            </p>

            <p className="font-bold text-white">
              {driver.country}
            </p>
          </div>

        </div>



        <div>

          <p className="mb-2 text-sm text-zinc-500">
            Sponsors
          </p>


          <div className="flex gap-2 flex-wrap">

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



        <div>

          <p className="mb-2 text-sm text-zinc-500">
            Statistics
          </p>


          <div className="grid grid-cols-3 gap-3">

            <BBSBadge variant="info">
              Battles {driver.stats.battles}
            </BBSBadge>


            <BBSBadge variant="success">
              Wins {driver.stats.wins}
            </BBSBadge>


            <BBSBadge variant="info">
              Podiums {driver.stats.podiums}
            </BBSBadge>

          </div>

        </div>


      </div>

    </BBSCard>

  );
}