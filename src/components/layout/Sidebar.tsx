import { NavLink } from "react-router-dom";


  const menu = [
  { name: "Dashboard", path: "/", icon: "🏠" },
  { name: "Events", path: "/events", icon: "📅" },
  { name: "Drivers", path: "/drivers", icon: "👥" },
  { name: "Qualifying", path: "/qualifying", icon: "📊" },
  { name: "Battles", path: "/battles", icon: "🏁" },
  { name: "Competition", path: "/competition", icon: "🏆" },
  { name: "Tournament", path: "/tournament", icon: "🌳" },
  { name: "Broadcast", path: "/broadcast", icon: "📺" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];


export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6">
      <h1 className="mb-8 text-3xl font-bold text-amber-500">
        Broadcast Business Suite
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "hover:bg-zinc-800"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
{item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
