import OBSStatusCard from "../components/broadcast/OBSStatusCard";
import ProgramPreview from "../components/broadcast/ProgramPreview";
import SceneGrid from "../components/broadcast/SceneGrid";

export default function Broadcast() {
  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-cyan-400">
        Broadcast Control
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <OBSStatusCard />

        <div className="col-span-2">
          <ProgramPreview />
        </div>

      </div>

      <SceneGrid />

    </div>
  );
}