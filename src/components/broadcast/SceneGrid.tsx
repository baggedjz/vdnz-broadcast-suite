import { Monitor } from "lucide-react";
import { useOBSStore } from "../../store/obsStore";

export default function SceneGrid() {
  const {
    scenes,
    currentScene,
    changeScene,
  } = useOBSStore();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-cyan-400">
          OBS Scenes
        </h2>

        <span className="text-zinc-500">
          {scenes.length} Scenes
        </span>

      </div>

      <div className="grid grid-cols-4 gap-4">

        {scenes.map((scene) => (

          <button
            key={scene.sceneUuid}
            onClick={() => changeScene(scene.sceneName)}
            className={`rounded-xl border p-5 transition-all duration-200 ${
              currentScene === scene.sceneName
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-zinc-700 bg-zinc-950 hover:border-cyan-400 hover:bg-zinc-800"
            }`}
          >
            <Monitor
              className="mx-auto mb-3 text-cyan-400"
              size={30}
            />

            <p className="font-semibold">
              {scene.sceneName}
            </p>

          </button>

        ))}

      </div>

    </div>
  );
}