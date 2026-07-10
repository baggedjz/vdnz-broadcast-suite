import {
  Bell,
  Menu,
  Settings,
  UserCircle2,
} from "lucide-react";

import { useLocation } from "react-router-dom";
import { useLayoutStore } from "../../store/layoutStore";
import { useCompetitionStore } from "../../store/competitionStore";

export default function TopBar() {
  const { toggleSidebar } = useLayoutStore();

  const { event } = useCompetitionStore();

  const location = useLocation();

  const page =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname
          .replace("/", "")
          .replaceAll("-", " ");

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-[#111111] px-6">

      <div className="flex items-center gap-5">

        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 transition hover:bg-zinc-800"
        >
          <Menu size={22} />
        </button>

        <div>

          <h2 className="text-xl font-bold capitalize">
            {page}
          </h2>

          <p className="text-xs text-zinc-500">
            {event.name}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-6">

        <button className="rounded-lg p-2 transition hover:bg-zinc-800">
          <Bell size={20} />
        </button>

        <button className="rounded-lg p-2 transition hover:bg-zinc-800">
          <Settings size={20} />
        </button>

        <div className="flex items-center gap-2">

          <UserCircle2
            size={30}
            className="text-amber-500"
          />

          <div>

            <p className="text-sm font-semibold">
              Dylan
            </p>

            <p className="text-xs text-zinc-500">
              Race Director
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}