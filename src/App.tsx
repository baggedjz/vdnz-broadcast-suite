import "./index.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-xl font-bold text-amber-500">
                Live Preview
              </h2>

              <div className="mt-4 flex h-80 items-center justify-center rounded-lg border border-dashed border-zinc-700">
                OBS Preview Coming Soon
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-xl font-bold text-amber-500">
                Broadcast Controls
              </h2>

              <div className="mt-6 flex flex-col gap-4">
                <button className="rounded-lg bg-amber-600 py-3 font-bold hover:bg-amber-500">
                  🎬 Show VS
                </button>

                <button className="rounded-lg bg-amber-600 py-3 font-bold hover:bg-amber-500">
                  🏆 Show Winner
                </button>

                <button className="rounded-lg bg-amber-600 py-3 font-bold hover:bg-amber-500">
                  📊 Show Scores
                </button>

                <button className="rounded-lg bg-red-700 py-3 font-bold hover:bg-red-600">
                  Hide Graphics
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}