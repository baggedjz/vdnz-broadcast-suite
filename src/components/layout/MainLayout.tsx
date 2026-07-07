import Sidebar from "./Sidebar";
import TopStatusBar from "./TopStatusBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <TopStatusBar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}