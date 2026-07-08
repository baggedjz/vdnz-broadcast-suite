import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/bbs-logo.png";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Trophy,
  Radio,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";

const raceMenu = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Events", path: "/events", icon: CalendarDays },
  { name: "Drivers", path: "/drivers", icon: Users },
  { name: "Competition", path: "/competition", icon: Trophy },
];

const broadcastMenu = [
  { name: "Broadcast", path: "/broadcast", icon: Radio },
];

const systemMenu = [
  { name: "Statistics", path: "/statistics", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

type MenuItem = {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

function MenuSection({
  title,
  items,
}: {
  title: string;
  items: MenuItem[];
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {title}
      </p>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </div>

              <ChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-900 bg-[#090909]">

      <div className="border-b border-zinc-800 p-8">

        <img
          src={logo}
          alt="BBS"
          className="mx-auto w-65"
        />

        <p className="mt-4 text-center text-xs uppercase tracking-[0.35em] text-cyan-400">
          
        </p>

      </div>

      <div className="flex-1 overflow-y-auto p-5">

        <MenuSection
          title="Race"
          items={raceMenu}
        />

        <MenuSection
          title="Broadcast"
          items={broadcastMenu}
        />

        <MenuSection
          title="System"
          items={systemMenu}
        />

      </div>

      <div className="border-t border-zinc-800 p-5">

        <div className="rounded-xl bg-zinc-900 p-4">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Build
          </p>

          <h3 className="mt-1 font-semibold text-cyan-400">
            v0.2 Alpha
          </h3>

          <p className="mt-2 text-xs text-zinc-500">
            Virtual Drift New Zealand
          </p>

        </div>

      </div>

    </aside>
  );
}