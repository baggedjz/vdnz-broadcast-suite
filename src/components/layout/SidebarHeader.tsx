import { useLayoutStore } from "../../store/layoutStore";

export default function SidebarHeader() {
  const { sidebarMode } = useLayoutStore();

  const collapsed = sidebarMode !== "expanded";

  return (
    <div className="border-b border-zinc-800 p-5">

      {collapsed ? (

        <div className="flex justify-center">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-lg font-black text-black">
            B
          </div>

        </div>

      ) : (

        <>
          <h1 className="text-2xl font-black tracking-wide text-amber-500">
            VDNZ BBS
          </h1>

          <p className="mt-1 text-xs text-zinc-500">
            Broadcast & Battle Suite
          </p>

          <div className="mt-4 rounded-lg bg-zinc-900 p-3">

            <p className="text-xs text-zinc-500">
              Version
            </p>

            <p className="font-semibold text-white">
              v0.8 Alpha
            </p>

          </div>

        </>

      )}

    </div>
  );
}