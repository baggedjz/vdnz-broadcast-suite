import { MonitorPlay } from "lucide-react";

import {
  BBSCard,
  BBSBadge,
} from "../../../components/ui";

import { useOBSStore } from "../../../store/obsStore";


export default function OBSPreviewMonitor() {

  const {
    connected,
    currentScene,
    preview,
    recording,
    streaming,
    updatePreview,
  } = useOBSStore();


  return (
    <BBSCard title="Program Output">

      <div className="space-y-5">

        <div className="aspect-video overflow-hidden rounded-xl bg-black">

          {preview ? (

            <img
              src={preview}
              alt="OBS Program Output"
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
                  ? "No Preview Available"
                  : "OBS Offline"}
              </p>

            </div>

          )}

        </div>


        <div className="flex flex-wrap gap-3">

          <BBSBadge variant={connected ? "success" : "danger"}>
            {connected ? "OBS Connected" : "OBS Offline"}
          </BBSBadge>


          <BBSBadge variant={recording ? "danger" : "info"}>
            {recording ? "Recording" : "Idle"}
          </BBSBadge>


          <BBSBadge variant={streaming ? "success" : "info"}>
            {streaming ? "LIVE" : "Offline"}
          </BBSBadge>

        </div>


        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Current Scene
            </p>

            <p className="text-lg font-bold text-cyan-400">
              {currentScene || "None"}
            </p>
          </div>


          <button
            onClick={updatePreview}
            className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black hover:bg-cyan-400"
          >
            Refresh Preview
          </button>

        </div>


      </div>

    </BBSCard>
  );
}