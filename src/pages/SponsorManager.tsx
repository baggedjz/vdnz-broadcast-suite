import { BBSCard, BBSButton } from "../components/ui";

import {
  useSponsorStore,
} from "../store/sponsorStore";


export default function SponsorManager() {


  const {
    sponsors,
    removeSponsor,
  } = useSponsorStore();



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Sponsor Manager
        </h1>


        <p className="text-zinc-400">
          Commercial partners and broadcast sponsors
        </p>

      </div>





      <BBSCard title="Sponsors">


        {
          sponsors.length === 0 ? (

            <p className="text-zinc-500">
              No sponsors added.
            </p>


          ) : (


            <div className="space-y-3">


              {sponsors.map((sponsor) => (


                <div

                  key={sponsor.id}

                  className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"

                >

                  <div>


                    <p className="text-xl font-bold text-white">

                      {sponsor.name}

                    </p>



                    <p className="text-zinc-400">

                      Package:
                      {" "}
                      {sponsor.package}

                    </p>


                  </div>





                  <BBSButton

                    variant="secondary"

                    onClick={() =>
                      removeSponsor(
                        sponsor.id
                      )
                    }

                  >

                    Remove

                  </BBSButton>


                </div>


              ))}


            </div>


          )
        }


      </BBSCard>


    </div>

  );

}