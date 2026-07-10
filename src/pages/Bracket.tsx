import { BBSCard } from "../components/ui";
import { useBattleQueueStore } from "../store/battleQueueStore";


export default function Bracket() {


  const {
    battles,
    currentBattle,
  } = useBattleQueueStore();



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Tournament Bracket
        </h1>

        <p className="text-zinc-400">
          Live VDNZ competition bracket
        </p>

      </div>




      <BBSCard title="TOP 32">


        {
          battles.length === 0 ? (

            <p className="text-zinc-500">
              No bracket generated.
            </p>


          ) : (


            <div className="grid gap-4 md:grid-cols-2">


              {battles.map((battle) => (


                <div

                  key={battle.id}

                  className={

                    currentBattle?.id === battle.id

                    ? "rounded-xl border border-amber-500 bg-zinc-800 p-4"

                    : "rounded-xl bg-zinc-800 p-4"

                  }

                >


                  <p className="text-sm text-zinc-400">
                    {battle.round}
                  </p>



                  <p className="font-bold text-white">

                    #{battle.leadDriver.number}
                    {" "}
                    {battle.leadDriver.firstName}
                    {" VS "}
                    #{battle.chaseDriver.number}
                    {" "}
                    {battle.chaseDriver.firstName}

                  </p>



                  <p className="mt-2 text-amber-400">
                    {battle.status}
                  </p>



                  {
                    battle.winner && (

                      <p className="text-green-400">

                        Winner:
                        {" "}
                        {battle.winner.firstName}

                      </p>

                    )
                  }


                </div>


              ))}


            </div>


          )
        }


      </BBSCard>



      <div className="grid grid-cols-3 gap-4">


        <BBSCard title="TOP 16">

          <p className="text-zinc-500">
            Waiting for qualification.
          </p>

        </BBSCard>



        <BBSCard title="SEMIFINALS">

          <p className="text-zinc-500">
            Locked.
          </p>

        </BBSCard>



        <BBSCard title="FINAL">

          <p className="text-zinc-500">
            Locked.
          </p>

        </BBSCard>


      </div>


    </div>

  );

}