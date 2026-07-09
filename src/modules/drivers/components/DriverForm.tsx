import { useState } from "react";

import {
  BBSButton,
  BBSCard,
  BBSInput,
} from "../../../components/ui";

import { useDriverStore } from "../store/driverStore";


export default function DriverForm() {

  const { addDriver } = useDriverStore();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [team, setTeam] = useState("");
  const [car, setCar] = useState("");



  const saveDriver = () => {

    addDriver({

      id: crypto.randomUUID(),

      number,

      firstName,

      lastName,

      team,

      car,

      country: "New Zealand",

      sponsors: [],

      stats: {
        wins: 0,
        podiums: 0,
        battles: 0,
      },

    });


    setFirstName("");
    setLastName("");
    setNumber("");
    setTeam("");
    setCar("");

  };



  return (

    <BBSCard title="Add Driver">

      <div className="space-y-4">


        <BBSInput
          placeholder="Driver Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />


        <BBSInput
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />


        <BBSInput
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />


        <BBSInput
          placeholder="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />


        <BBSInput
          placeholder="Car"
          value={car}
          onChange={(e) => setCar(e.target.value)}
        />


        <BBSButton
          onClick={saveDriver}
        >
          Save Driver
        </BBSButton>


      </div>

    </BBSCard>

  );
}