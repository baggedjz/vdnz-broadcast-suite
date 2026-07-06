import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Battles from "./pages/Battles";
import Brackets from "./pages/Brackets";
import Broadcast from "./pages/Broadcast";
import Settings from "./pages/Settings";
import Events from "./pages/Events";
import Competition from "./pages/Competition";
import Tournament from "./pages/Tournament";

export default function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/brackets" element={<Brackets />} />
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/tournament" element={<Tournament />} />
        
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
