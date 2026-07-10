import { BBSCard, BBSBadge } from "../ui";
import { useBattleStore } from "../../store/battleStore";


export default function CurrentBattleCard() {

  const {
    leadDriver,
    chaseDriver,
  } = useBattleStore();


  return (

    <BBSCard title="🏁 Current Battle">

      {!leadDriver || !chaseDriver ? (

        <p className="text-zinc-500">
          No battle loaded.
        </p>

      ) : (

        <div className="space-y-6">


          <div className="grid grid-cols-3 items-center gap-4">


            <div className="rounded-xl bg-zinc-800 p-5">

              <p className="text-sm text-zinc-400">
                Lead
              </p>

              <h2 className="text-xl font-bold text-white">
                #{leadDriver.number} {leadDriver.firstName} {leadDriver.lastName}
              </h2>

              <p className="text-cyan-400">
                {leadDriver.car}
              </p>

              <BBSBadge variant="info">
                {leadDriver.team}
              </BBSBadge>

            </div>



            <div className="text-center text-3xl font-black text-amber-500">
              VS
            </div>



            <div className="rounded-xl bg-zinc-800 p-5">

              <p className="text-sm text-zinc-400">
                Chase
              </p>

              <h2 className="text-xl font-bold text-white">
                #{chaseDriver.number} {chaseDriver.firstName} {chaseDriver.lastName}
              </h2>

              <p className="text-cyan-400">
                {chaseDriver.car}
              </p>

              <BBSBadge variant="info">
                {chaseDriver.team}
              </BBSBadge>

            </div>


          </div>


        </div>

      )}

    </BBSCard>

  );

}