import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopStatusBar from "./TopStatusBar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#070707] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Persistent Status Bar */}
        <TopStatusBar />

        {/* Workspace */}
        <main className="flex-1 overflow-hidden bg-[#0b0b0b]">

          <div className="h-full overflow-auto p-8">

            <div className="mx-auto h-full max-w-[1900px]">
              <Outlet />
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}