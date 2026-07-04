import { NavLink } from "react-router-dom";

const menu = [
  { name: "🏠 Dashboard", path: "/" },
  { name: "👥 Drivers", path: "/drivers" },
  { name: "🏁 Battles", path: "/battles" },
  { name: "🌳 Brackets", path: "/brackets" },
  { name: "🎥 Broadcast", path: "/broadcast" },
  { name: "⚙️ Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6">
      <h1 className="mb-8 text-3xl font-bold text-amber-500">
        VDNZ
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
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}