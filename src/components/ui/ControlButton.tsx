import type { ReactNode } from "react";

type Colour =
  | "cyan"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "zinc";

const colours = {
  cyan:
    "bg-cyan-600 hover:bg-cyan-500",

  green:
    "bg-green-600 hover:bg-green-500",

  purple:
    "bg-purple-600 hover:bg-purple-500",

  orange:
    "bg-orange-600 hover:bg-orange-500",

  red:
    "bg-red-600 hover:bg-red-500",

  zinc:
    "bg-zinc-700 hover:bg-zinc-600",
};

type Props = {
  icon: ReactNode;
  label: string;
  shortcut?: string;
  colour?: Colour;
  onClick?: () => void;
};

export default function ControlButton({
  icon,
  label,
  shortcut,
  colour = "cyan",
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-xl px-5 py-4 font-semibold transition-all duration-200 ${colours[colour]}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>

      {shortcut && (
        <span className="rounded bg-black/20 px-2 py-1 text-xs">
          {shortcut}
        </span>
      )}
    </button>
  );
}