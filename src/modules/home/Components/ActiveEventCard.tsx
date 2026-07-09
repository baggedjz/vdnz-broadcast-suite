import { Flag, Users, Trophy } from "lucide-react";
import { BBSCard, BBSBadge } from "@/components/ui";

export default function ActiveEventCard() {
  return (
    <BBSCard title="Active Event">
      <div className="space-y-6">

        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Event
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Winter Drift Series
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-zinc-800 p-4">
            <Flag className="mb-2 text-cyan-400" size={22} />
            <p className="text-xs text-zinc-500">Stage</p>
            <p className="font-bold text-white">Top 32</p>
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            <Users className="mb-2 text-cyan-400" size={22} />
            <p className="text-xs text-zinc-500">Battle</p>
            <p className="font-bold text-white">12</p>
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            <Trophy className="mb-2 text-cyan-400" size={22} />
            <p className="text-xs text-zinc-500">Status</p>

            <BBSBadge variant="success">
              LIVE
            </BBSBadge>

          </div>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

          <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">
            Current Battle
          </p>

          <div className="flex items-center justify-between">

            <div className="text-center">
              <p className="text-xl font-bold text-white">
                Dylan Whareaitu
              </p>
              <p className="text-zinc-500">
                Trendsetters
              </p>
            </div>

            <div className="text-3xl font-black text-cyan-400">
              VS
            </div>

            <div className="text-center">
              <p className="text-xl font-bold text-white">
                Matt Howell
              </p>
              <p className="text-zinc-500">
                Trendsetters
              </p>
            </div>

          </div>

        </div>

      </div>
    </BBSCard>
  );
}