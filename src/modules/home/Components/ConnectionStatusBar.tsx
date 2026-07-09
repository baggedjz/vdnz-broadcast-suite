import { Wifi, Database, Radio, Gamepad2 } from "lucide-react";
import { BBSBadge, BBSCard } from "@/components/ui";

export default function ConnectionStatusBar() {
  return (
    <BBSCard>
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <Wifi size={18} className="text-cyan-400" />
          <span className="text-white font-medium">OBS</span>
          <BBSBadge variant="success">Connected</BBSBadge>
        </div>

        <div className="flex items-center gap-3">
          <Gamepad2 size={18} className="text-zinc-400" />
          <span className="text-white font-medium">Assetto</span>
          <BBSBadge>Offline</BBSBadge>
        </div>

        <div className="flex items-center gap-3">
          <Database size={18} className="text-cyan-400" />
          <span className="text-white font-medium">Database</span>
          <BBSBadge variant="success">Ready</BBSBadge>
        </div>

        <div className="flex items-center gap-3">
          <Radio size={18} className="text-red-400" />
          <span className="text-white font-medium">Broadcast</span>
          <BBSBadge variant="warning">Idle</BBSBadge>
        </div>

      </div>
    </BBSCard>
  );
}