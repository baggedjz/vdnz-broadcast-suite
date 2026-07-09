import { BBSCard, BBSButton } from "../../../components/ui";
import { useDriverStore } from "../store/driverStore";
import DriverCard from "../components/DriverCard";
import DriverForm from "../components/DriverForm";


export default function DriverManager() {

  const {
    drivers,
  } = useDriverStore();


  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Driver Manager
          </h1>

          <p className="text-zinc-400">
            Manage drivers, teams and vehicles
          </p>
        </div>


        <BBSButton>
          + Add Driver
        </BBSButton>

      </div>



      <BBSCard title="Drivers">


        <div className="grid gap-4 md:grid-cols-2">


          {drivers.map((driver) => (
              <><DriverForm /><DriverCard
                  key={driver.id}
                  driver={driver} /></>

          ))}


        </div>


      </BBSCard>


    </div>

  );
}