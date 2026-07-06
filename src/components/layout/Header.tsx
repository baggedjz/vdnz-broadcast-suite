export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-white">
        Broadcast Business Suite Race Control
      </h2>

      <div className="flex gap-3">
        <span className="rounded-full bg-green-700 px-3 py-1 text-sm">
          OBS Connected
        </span>

        <span className="rounded-full bg-red-700 px-3 py-1 text-sm">
          Assetto Offline
        </span>
      </div>
    </header>
  );
}
