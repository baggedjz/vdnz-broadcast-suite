import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import TopStatusBar from "./TopStatusBar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#070707] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Workspace */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Application Header */}
        <TopBar />

        {/* Live Connections */}
        <TopStatusBar />

        {/* Page Content */}
        <main className="flex-1 overflow-hidden bg-[#0b0b0b]">

          <div className="h-full overflow-auto">

            <div className="mx-auto max-w-[1900px] p-8">

              <Outlet />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}