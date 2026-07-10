import { Wifi } from "lucide-react";
import { useLayoutStore } from "../../store/layoutStore";
import { useOBSStore } from "../../store/obsStore";

export default function SidebarFooter() {
  const { sidebarMode } = useLayoutStore();
  const { connected } = useOBSStore();

  if (sidebarMode !== "expanded") {
    return null;
  }

  return (
    <div className="border-t border-zinc-800 p-4">

      <div className="flex items-center gap-2">

        <Wifi
          size={16}
          className={
            connected
              ? "text-green-400"
              : "text-red-400"
          }
        />

        <span className="text-sm">
          {connected
            ? "OBS Connected"
            : "OBS Offline"}
        </span>

      </div>

    </div>
  );
}