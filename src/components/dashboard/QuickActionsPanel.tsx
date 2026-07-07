import {
  Clapperboard,
  Gavel,
  Trophy,
  Play,
  RotateCcw,
  Monitor,
  RefreshCw,
  Settings,
} from "lucide-react";

const actions = [
  {
    title: "Broadcast",
    buttons: [
      { icon: Clapperboard, label: "Show VS" },
      { icon: Monitor, label: "Overlay" },
    ],
  },
  {
    title: "Judging",
    buttons: [
      { icon: Gavel, label: "Open" },
      { icon: Trophy, label: "Winner" },
    ],
  },
  {
    title: "Competition",
    buttons: [
      { icon: Play, label: "Next" },
      { icon: RefreshCw, label: "Reset" },
    ],
  },
  {
    title: "Utilities",
    buttons: [
      { icon: RotateCcw, label: "Replay" },
      { icon: Settings, label: "More" },
    ],
  },
];

export default function QuickActionsPanel() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        Live Control Console
      </h2>

      <div className="space-y-6">

        {actions.map((group) => (
          <div key={group.title}>

            <h3 className="mb-3 text-xs uppercase tracking-widest text-zinc-500">
              {group.title}
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {group.buttons.map((button) => {
                const Icon = button.icon;

                return (
                  <button
                    key={button.label}
                    className="group rounded-xl border border-zinc-700 bg-zinc-950 p-4 transition-all duration-200 hover:border-cyan-400 hover:bg-zinc-800 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <Icon
                      size={30}
                      className="mx-auto mb-3 text-cyan-400 transition-transform duration-200 group-hover:scale-110"
                    />

                    <p className="text-sm font-semibold text-white">
                      {button.label}
                    </p>
                  </button>
                );
              })}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}