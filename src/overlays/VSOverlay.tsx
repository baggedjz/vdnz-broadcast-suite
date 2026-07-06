type VSOverlayProps = {
  leadDriver: string;
  chaseDriver: string;
};

export default function VSOverlay({
  leadDriver,
  chaseDriver,
}: VSOverlayProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-transparent">
      <div className="rounded-2xl border border-amber-500 bg-black/90 px-16 py-10 shadow-2xl">
        <div className="text-center">
          <div className="text-5xl font-bold text-white">
            {leadDriver}
          </div>

          <div className="my-6 text-3xl font-bold text-amber-500">
            VS
          </div>

          <div className="text-5xl font-bold text-white">
            {chaseDriver}
          </div>
        </div>
      </div>
    </div>
  );
}
