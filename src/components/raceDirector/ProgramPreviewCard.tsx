import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import { getProgramScreenshot } from "../../services/obs";
import OBSPreviewMonitor from "../../modules/broadcast/components/OBSPreviewMonitor";

export default function ProgramPreviewCard() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const updatePreview = async () => {
      const screenshot = await getProgramScreenshot();
      if (screenshot) {
        setImage(screenshot);
      }
    };

    updatePreview();

    const timer = setInterval(updatePreview, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-cyan-400">
          Program Output
        </h2>

        <span className="rounded bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400">
          LIVE
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black">
        {image ? (
          <img
            src={image}
            alt="OBS Program"
            className="aspect-video w-full object-contain bg-black"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center">
            <div className="text-center">
              <Monitor className="mx-auto mb-3 text-cyan-400" size={64} />
              <OBSPreviewMonitor />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}