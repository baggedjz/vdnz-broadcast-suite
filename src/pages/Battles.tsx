import { useDriverStore } from "../modules/drivers/store/driverStore";
import { useBattleStore } from "../store/battleStore";


export default function Battles() {

  const {
    drivers,
  } = useDriverStore();


  const {
    leadDriver,
    chaseDriver,
    setLeadDriver,
    setChaseDriver,
  } = useBattleStore();



  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-amber-500">
          Battle Manager
        </h1>

        <p className="text-zinc-400">
          Select the current battle for broadcast.
        </p>
      </div>



      <div className="grid grid-cols-2 gap-8">


        {/* Lead Driver */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Lead Driver
          </h2>


          <select

            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"

            value={leadDriver?.id ?? ""}

            onChange={(e) => {

              const driver = drivers.find(
                (d) => d.id === e.target.value
              );

              if(driver) {
                setLeadDriver(driver);
              }

            }}

          >

            <option value="">
              Select Lead Driver
            </option>


            {drivers.map((driver) => (

              <option
                key={driver.id}
                value={driver.id}
              >

                #{driver.number} • {driver.firstName} {driver.lastName}

              </option>

            ))}


          </select>



          {leadDriver && (

            <div className="mt-6 rounded-lg bg-zinc-800 p-4">

              <h3 className="text-2xl font-bold">
                {leadDriver.firstName} {leadDriver.lastName}
              </h3>


              <p>
                {leadDriver.team}
              </p>


              <p>
                {leadDriver.car}
              </p>


              <p>
                #{leadDriver.number}
              </p>

            </div>

          )}


        </div>




        {/* Chase Driver */}


        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">


          <h2 className="mb-4 text-xl font-bold">
            Chase Driver
          </h2>



          <select

            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"

            value={chaseDriver?.id ?? ""}

            onChange={(e) => {

              const driver = drivers.find(
                (d) => d.id === e.target.value
              );


              if(driver) {
                setChaseDriver(driver);
              }

            }}

          >

            <option value="">
              Select Chase Driver
            </option>


            {drivers.map((driver) => (

              <option
                key={driver.id}
                value={driver.id}
              >

                #{driver.number} • {driver.firstName} {driver.lastName}

              </option>

            ))}


          </select>



          {chaseDriver && (

            <div className="mt-6 rounded-lg bg-zinc-800 p-4">

              <h3 className="text-2xl font-bold">
                {chaseDriver.firstName} {chaseDriver.lastName}
              </h3>


              <p>
                {chaseDriver.team}
              </p>


              <p>
                {chaseDriver.car}
              </p>


              <p>
                #{chaseDriver.number}
              </p>

            </div>

          )}


        </div>


      </div>

    </div>
  );
}