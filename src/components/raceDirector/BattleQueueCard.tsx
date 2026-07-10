import { BBSButton, BBSCard } from "../ui";
import { useBattleQueueStore } from "../../store/battleQueueStore";
import { loadNextBattle } from "../../services/battleQueueWorkflow";


export default function BattleQueueCard() {


  const {
    battles,
    currentBattle,
  } = useBattleQueueStore();



  return (

    <BBSCard title="Battle Queue">


      <div className="space-y-6">


        {currentBattle ? (

          <div className="rounded-xl bg-zinc-800 p-4">

            <p className="text-sm text-zinc-400">
              Current Battle
            </p>


            <h2 className="text-xl font-bold text-white">

              #{currentBattle.leadDriver.number}
              {" "}
              {currentBattle.leadDriver.firstName}

              {" VS "}

              #{currentBattle.chaseDriver.number}
              {" "}
              {currentBattle.chaseDriver.firstName}

            </h2>


            <p className="text-amber-400">
              {currentBattle.status}
            </p>


          </div>


        ) : (

          <p className="text-zinc-500">
            No active battle.
          </p>

        )}




        <div>

          <h3 className="mb-3 font-bold text-white">
            Upcoming Battles
          </h3>


          <div className="space-y-2">


            {battles.map((battle) => (

              <div
                key={battle.id}
                className="rounded-lg bg-zinc-800 p-3"
              >

                #{battle.leadDriver.number}
                {" "}
                {battle.leadDriver.firstName}

                {" VS "}

                #{battle.chaseDriver.number}
                {" "}
                {battle.chaseDriver.firstName}


              </div>

            ))}


          </div>


        </div>




        <BBSButton
          onClick={() => loadNextBattle()}
        >
          Load Next Battle
        </BBSButton>


      </div>


    </BBSCard>

  );

}