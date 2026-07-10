import { BBSCard } from "../components/ui";
import { useBattleHistoryStore } from "../store/battleHistoryStore";
import { useDriverStore } from "../modules/drivers/store/driverStore";
import { calculateDriverStats } from "../services/driverStats";


export default function DriverProfile() {


  const {
    drivers,
  } = useDriverStore();



  const {
    history,
  } = useBattleHistoryStore();



  const driver =
    drivers[0];



  if (!driver) {

    return (

      <p className="text-zinc-500">
        No driver selected.
      </p>

    );

  }



  const stats =
    calculateDriverStats(
      driver,
      history
    );



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Driver Profile
        </h1>

        <p className="text-zinc-400">
          Competition statistics
        </p>

      </div>




      <BBSCard title={`${driver.firstName} ${driver.lastName}`}>


        <div className="space-y-2 text-white">


          <p>
            Team:
            {" "}
            {driver.team}
          </p>


          <p>
            Car:
            {" "}
            {driver.car}
          </p>


          <p>
            Number:
            {" "}
            #{driver.number}
          </p>


        </div>


      </BBSCard>





      <BBSCard title="Statistics">


        <div className="grid grid-cols-4 gap-4">


          <div>
            <p className="text-zinc-400">
              Battles
            </p>

            <p className="text-3xl font-bold">
              {stats.battles}
            </p>

          </div>



          <div>
            <p className="text-zinc-400">
              Wins
            </p>

            <p className="text-3xl font-bold text-green-400">
              {stats.wins}
            </p>

          </div>



          <div>
            <p className="text-zinc-400">
              Losses
            </p>

            <p className="text-3xl font-bold">
              {stats.losses}
            </p>

          </div>



          <div>
            <p className="text-zinc-400">
              Win Rate
            </p>

            <p className="text-3xl font-bold text-amber-400">
              {stats.winRate}%
            </p>

          </div>


        </div>


      </BBSCard>


    </div>

  );

}