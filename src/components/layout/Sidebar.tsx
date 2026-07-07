import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/bbs-logo.png";

const menu = [
  { name: "Dashboard", path: "/", icon: "🏠" },
  { name: "Events", path: "/events", icon: "📅" },
  { name: "Drivers", path: "/drivers", icon: "👥" },
  { name: "Competition", path: "/competition", icon: "🏁" },
  { name: "Broadcast", path: "/broadcast", icon: "📺" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-black">

      <div className="border-b border-zinc-800 p-6">

        <img
          src={logo}
          alt="Broadcast Business Suite"
          className="mx-auto mb-4 w-66"
        />

        

      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-cyan-400"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <p className="text-center text-xs text-zinc-500">
          Version 0.2 Alpha
        </p>
      </div>

    </aside>
  );
}