import { useBattleStore } from "../../../store/battleStore";

export default function CurrentBattleWidget() {
  const { leadDriver, chaseDriver } = useBattleStore();

 const lead = leadDriver;
const chase = chaseDriver;

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg">
      <h2 className="text-lg font-bold text-amber-500 mb-4">
        Current Battle
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg bg-zinc-800 p-4">
          <p className="text-xs uppercase text-zinc-400">Lead Driver</p>
          <h3 className="text-xl font-bold">
            {lead
              ? `${lead.firstName} ${lead.lastName}`
              : "Waiting..."}
          </h3>
          <p className="text-sm text-zinc-400">
            {lead?.car}
          </p>
        </div>

        <div className="text-center text-4xl font-black text-amber-500">
          VS
        </div>

        <div className="rounded-lg bg-zinc-800 p-4">
          <p className="text-xs uppercase text-zinc-400">Chase Driver</p>
          <h3 className="text-xl font-bold">
            {chase
              ? `${chase.firstName} ${chase.lastName}`
              : "Waiting..."}
          </h3>
          <p className="text-sm text-zinc-400">
            {chase?.car}
          </p>
        </div>
      </div>
    </div>
  );
}
