import { BBSCard } from "../components/ui";
import { useBattleHistoryStore } from "../store/battleHistoryStore";


export default function Results() {


  const {
    history,
  } = useBattleHistoryStore();



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Event Results
        </h1>


        <p className="text-zinc-400">
          Completed battles and winners
        </p>


      </div>




      <BBSCard title="Battle History">


        {
          history.length === 0 ? (

            <p className="text-zinc-500">
              No completed battles.
            </p>


          ) : (


            <div className="space-y-4">


              {history.map((result) => (


                <div

                  key={result.id}

                  className="rounded-xl bg-zinc-800 p-5"

                >


                  <p className="text-sm text-zinc-400">
                    {result.battle.round}
                  </p>



                  <h2 className="text-xl font-bold text-white">


                    #{result.battle.leadDriver.number}
                    {" "}
                    {result.battle.leadDriver.firstName}
                    {" VS "}
                    #{result.battle.chaseDriver.number}
                    {" "}
                    {result.battle.chaseDriver.firstName}


                  </h2>




                  <p className="mt-3 text-green-400">

                    Winner:
                    {" "}
                    #{result.winner.number}
                    {" "}
                    {result.winner.firstName}
                    {" "}
                    {result.winner.lastName}

                  </p>



                  <p className="text-zinc-500">

                    Completed:
                    {" "}
                    {result.completedAt}

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