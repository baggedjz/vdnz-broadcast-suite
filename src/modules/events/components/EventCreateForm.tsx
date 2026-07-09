import { useState } from "react";
import { BBSButton, BBSCard, BBSInput } from "../../../components/ui";
import { useEventStore } from "../store/eventStore";

export default function EventCreateForm() {

  const { createEvent } = useEventStore();


  const [name, setName] = useState("");

  const [venue, setVenue] = useState("");

  const [organisation, setOrganisation] = useState("");



  const create = () => {

    createEvent({

      id: crypto.randomUUID(),

      name,

      venue,

      organisation,

      date: new Date().toISOString(),

      format: "Top 32",

      status: "draft",

      createdAt: new Date().toISOString(),

    });

  };


  return (

    <BBSCard title="Create Event">

      <div className="space-y-4">


        <BBSInput
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <BBSInput
          placeholder="Organisation"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
        />


        <BBSInput
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />


        <BBSButton onClick={create}>
          Create Event
        </BBSButton>


      </div>

    </BBSCard>

  );
}