import { Cpu, HardDrive, Activity } from "lucide-react";
import { BBSBadge, BBSCard } from "@/components/ui";

export default function SystemHealthCard() {
  return (
    <BBSCard title="System Health">

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu size={18} className="text-cyan-400" />
            <span className="text-white">Application</span>
          </div>

          <BBSBadge variant="success">
            Healthy
          </BBSBadge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardDrive size={18} className="text-cyan-400" />
            <span className="text-white">Database</span>
          </div>

          <BBSBadge variant="success">
            Ready
          </BBSBadge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-cyan-400" />
            <span className="text-white">OBS</span>
          </div>

          <BBSBadge>
            Connected
          </BBSBadge>
        </div>

      </div>

    </BBSCard>
  );
}