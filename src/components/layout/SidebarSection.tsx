import SidebarItem from "./SidebarItem";
import { useLayoutStore } from "../../store/layoutStore";

interface Item {
  label: string;
  path: string;
  icon: any;
}

interface Props {
  title: string;
  items: Item[];
}

export default function SidebarSection({
  title,
  items,
}: Props) {
  const { sidebarMode } = useLayoutStore();

  return (
    <div className="space-y-2">

      {sidebarMode === "expanded" && (
        <p className="px-3 pt-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
          {title}
        </p>
      )}

      {items.map((item) => (
        <SidebarItem
          key={item.path}
          {...item}
        />
      ))}

    </div>
  );
}