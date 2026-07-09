import { MonitorPlay } from "lucide-react";
import { BBSCard, BBSBadge } from "../ui";
import { useOBSStore } from "../../store/obsStore";

export default function OBSPreview() {
  const {
    connected,
    currentScene,
    preview,
    recording,
    streaming,
  } = useOBSStore();

  return (
    <BBSCard title="Program Output">

      <div className="space-y-4">

        <div className="aspect-video overflow-hidden rounded-xl bg-black">

          {preview ? (
            <img
              src={preview}
              alt="OBS Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-zinc-500">

              <MonitorPlay
                size={48}
                className="mb-4 text-cyan-400"
              />

              <p>
                {connected
                  ? "Waiting for Preview..."
                  : "OBS Offline"}
              </p>

            </div>
          )}

        </div>


        <div className="flex flex-wrap gap-3">

          <BBSBadge
            variant={connected ? "success" : "danger"}
          >
            {connected ? "OBS Connected" : "OBS Offline"}
          </BBSBadge>


          <BBSBadge
            variant={recording ? "danger" : "info"}
          >
            {recording ? "Recording" : "Not Recording"}
          </BBSBadge>


          <BBSBadge
            variant={streaming ? "success" : "info"}
          >
            {streaming ? "LIVE" : "Offline"}
          </BBSBadge>

        </div>


        <div className="text-sm text-zinc-400">
          Current Scene:

          <span className="ml-2 font-bold text-cyan-400">
            {currentScene || "None"}
          </span>
        </div>

      </div>

    </BBSCard>
  );
}