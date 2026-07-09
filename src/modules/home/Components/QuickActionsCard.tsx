import {
  CalendarPlus,
  FolderOpen,
  Users,
  MonitorPlay,
  Settings,
} from "lucide-react";

import {
  BBSButton,
  BBSCard,
} from "../../../components/ui";

export default function QuickActionsCard() {
  return (
    <BBSCard title="Quick Actions">
      <div className="space-y-3">

        <BBSButton fullWidth icon={<FolderOpen size={18} />}>
          Continue Event
        </BBSButton>

        <BBSButton fullWidth icon={<CalendarPlus size={18} />}>
          New Event
        </BBSButton>

        <BBSButton
          fullWidth
          variant="secondary"
          icon={<Users size={18} />}
        >
          Drivers
        </BBSButton>

        <BBSButton
          fullWidth
          variant="secondary"
          icon={<MonitorPlay size={18} />}
        >
          Broadcast
        </BBSButton>

        <BBSButton
          fullWidth
          variant="secondary"
          icon={<Settings size={18} />}
        >
          Settings
        </BBSButton>

      </div>
    </BBSCard>
  );
}