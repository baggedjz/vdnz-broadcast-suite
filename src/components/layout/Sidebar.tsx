import { navigation } from "../../app/navigation/navigation";
import SidebarSection from "./SidebarSection";
import { useLayoutStore } from "../../store/layoutStore";

export default function Sidebar() {
  const { sidebarMode } = useLayoutStore();

  const width =
    sidebarMode === "expanded"
      ? "w-[280px]"
      : sidebarMode === "collapsed"
      ? "w-[72px]"
      : "w-0";

  return (
    <aside
      className={`
        ${width}
        overflow-hidden
        border-r
        border-zinc-800
        bg-[#090909]
        transition-all
        duration-300
        ease-in-out
      `}
    >
      <div className="border-b border-zinc-800 p-6">

        {sidebarMode === "expanded" ? (
          <>
            <h1 className="text-xl font-bold text-amber-500">
              VDNZ BBS
            </h1>

            <p className="text-xs text-zinc-500">
              Broadcast Suite
            </p>
          </>
        ) : (
          <h1 className="text-center text-xl font-bold text-amber-500">
            B
          </h1>
        )}

      </div>

      <nav className="space-y-4 p-3">

        {navigation.map((section) => (
          <SidebarSection
            key={section.title}
            {...section}
          />
        ))}

      </nav>

    </aside>
  );
}