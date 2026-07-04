type BattleCardProps = {
  lead: string;
  chase: string;
};

export default function BattleCard({
  lead,
  chase,
}: BattleCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-amber-500">
        Current Battle
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-zinc-400">Lead Driver</p>
          <p className="text-2xl font-bold">{lead || "Not Selected"}</p>
        </div>

        <div className="text-center text-3xl font-bold text-amber-500">
          VS
        </div>

        <div>
          <p className="text-sm text-zinc-400">Chase Driver</p>
          <p className="text-2xl font-bold">{chase || "Not Selected"}</p>
        </div>
      </div>
    </div>
  );
}