import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import RaceDirector from "./pages/RaceDirector";
import BroadcastDirector from "./pages/BroadcastDirector";
import ReplayDirector from "./pages/ReplayDirector";
import Drivers from "./pages/Drivers";
import Battles from "./pages/Battles";
import Brackets from "./pages/Brackets";
import Broadcast from "./pages/Broadcast";
import Settings from "./pages/Settings";
import Events from "./pages/Events";
import Competition from "./pages/Competition";
import Tournament from "./pages/Tournament";
import Telemetry from "./pages/Telemetry";
import SponsorManager from "./pages/SponsorManager";
import GraphicsOverlay from "./pages/GraphicsOverlay";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
  <Route path="/" element={<RaceDirector />} />

  <Route path="/broadcast-director" element={<BroadcastDirector />} />
  <Route path="/replay-director" element={<ReplayDirector />} />

        <Route path="/drivers" element={<Drivers />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/brackets" element={<Brackets />} />
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/events" element={<Events />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/telemetry" element={<Telemetry />} />
        <Route path="/sponsors" element={<SponsorManager />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* OBS Browser Source */}
      <Route path="/graphics" element={<GraphicsOverlay />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}