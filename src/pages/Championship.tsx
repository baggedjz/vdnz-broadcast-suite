import { BBSCard } from "../components/ui";
import { useDriverStore } from "../modules/drivers/store/driverStore";
import { useBattleHistoryStore } from "../store/battleHistoryStore";


export default function Championship() {


  const {
    drivers,
  } = useDriverStore();


  const {
    history,
  } = useBattleHistoryStore();




  const standings = drivers.map((driver) => {


    const wins =
      history.filter(
        (result) =>
          result.winner.id === driver.id
      ).length;



    const battles =
      history.filter(
        (result) =>
          result.battle.leadDriver.id === driver.id ||
          result.battle.chaseDriver.id === driver.id
      ).length;



    return {

      driver,

      wins,

      battles,

      points: wins * 100,

    };


  })
  .sort(
    (a, b) =>
      b.points - a.points
  );




  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          VDNZ Championship
        </h1>

        <p className="text-zinc-400">
          Season standings
        </p>

      </div>





      <BBSCard title="Leaderboard">


        <div className="space-y-3">


          {standings.map((entry, index) => (


            <div

              key={entry.driver.id}

              className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"

            >


              <div>

                <p className="text-xl font-bold text-white">

                  #{index + 1}

                  {" "}

                  {entry.driver.firstName}

                  {" "}

                  {entry.driver.lastName}

                </p>


                <p className="text-zinc-400">

                  Wins:
                  {" "}
                  {entry.wins}

                  {" | "}

                  Battles:
                  {" "}
                  {entry.battles}

                </p>


              </div>




              <div className="text-right">

                <p className="text-3xl font-bold text-amber-400">

                  {entry.points}

                </p>


                <p className="text-zinc-400">

                  Points

                </p>


              </div>


            </div>


          ))}


        </div>


      </BBSCard>


    </div>

  );

}