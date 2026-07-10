import { BBSButton, BBSCard } from "../ui";

import {
  rotateSponsor,
  clearSponsorRotation,
} from "../../services/sponsorRotation";

import {
  useSponsorBroadcastStore,
} from "../../store/sponsorBroadcastStore";


export default function SponsorControlCard() {


  const {
    activeSponsor,
  } = useSponsorBroadcastStore();



  return (

    <BBSCard title="Sponsor Control">


      <div className="space-y-5">


        <div className="flex justify-between">

          <span className="text-zinc-400">
            Current Sponsor
          </span>


          <span className="font-bold text-amber-400">
            {activeSponsor || "None"}
          </span>


        </div>



        <div className="grid grid-cols-2 gap-3">


          <BBSButton
            onClick={rotateSponsor}
          >
            🔄 Next Sponsor
          </BBSButton>



          <BBSButton
            variant="secondary"
            onClick={clearSponsorRotation}
          >
            ❌ Hide Sponsor
          </BBSButton>


        </div>


      </div>


    </BBSCard>

  );

}