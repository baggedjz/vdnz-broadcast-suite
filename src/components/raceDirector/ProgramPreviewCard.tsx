import { Monitor } from "lucide-react";
import { useOBSStore } from "../../store/obsStore";

export default function ProgramPreviewCard() {
  const { currentScene } = useOBSStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        Program Output
      </h2>

      <div className="flex h-80 items-center justify-center rounded-xl bg-black">

        <div className="text-center">

          <Monitor
            className="mx-auto mb-4 text-cyan-400"
            size={70}
          />

          <p className="text-3xl font-bold">
            {currentScene || "No Scene"}
          </p>

          <p className="mt-2 text-zinc-500">
            Live OBS Output
          </p>

        </div>

      </div>

    </div>
  );
}