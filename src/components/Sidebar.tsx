export default function Sidebar() {
  const menu = [
    "Dashboard",
    "Drivers",
    "Battles",
    "Brackets",
    "Standings",
    "Sponsors",
    "Settings",
  ];

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6">
      <h1 className="text-3xl font-bold text-amber-500 mb-8">
        VDNZ
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <button
            key={item}
            className="w-full text-left rounded-lg px-4 py-3 hover:bg-zinc-800 transition"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}