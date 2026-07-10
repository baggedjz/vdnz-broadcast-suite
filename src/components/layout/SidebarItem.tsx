import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { useLayoutStore } from "../../store/layoutStore";

interface SidebarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
}

export default function SidebarItem({
  label,
  path,
  icon: Icon,
}: SidebarItemProps) {
  const { sidebarMode } = useLayoutStore();

  const collapsed = sidebarMode !== "expanded";

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        transition-all
        duration-200
        ${
          isActive
            ? "bg-amber-500 text-black shadow-lg"
            : "text-zinc-300 hover:bg-zinc-800"
        }
        `
      }
    >
      <Icon size={20} className="shrink-0" />

      {!collapsed && (
        <span className="truncate">
          {label}
        </span>
      )}
    </NavLink>
  );
}