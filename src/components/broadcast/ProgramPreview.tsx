import { Monitor } from "lucide-react";
import { useOBSStore } from "../../store/obsStore";

export default function ProgramPreview() {
  const { currentScene } = useOBSStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-cyan-400">
        Program Output
      </h2>

      <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-black">

        <div className="text-center">

          <Monitor
            size={72}
            className="mx-auto mb-5 text-cyan-400"
          />

          <p className="text-3xl font-bold text-white">
            {currentScene || "No Scene"}
          </p>

          <p className="mt-3 text-zinc-500">
            Live OBS Program
          </p>

        </div>

      </div>

    </div>
  );
}