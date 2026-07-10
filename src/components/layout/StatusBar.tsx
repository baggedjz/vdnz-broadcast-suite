export default function StatusBar() {
  return (
    <div className="flex h-12 items-center gap-6 border-b border-zinc-800 bg-zinc-950 px-6 text-sm">
      <span>🟢 OBS</span>
      <span>🟡 Assetto</span>
      <span>🟢 Database</span>
      <span>⚪ Discord</span>
    </div>
  );
}