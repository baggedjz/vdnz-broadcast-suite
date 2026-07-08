import type { ReactNode } from "react";

type Variant = "success" | "danger" | "warning" | "info" | "neutral";

const colours = {
  success:
    "border-green-500/30 bg-green-500/10 text-green-400",

  danger:
    "border-red-500/30 bg-red-500/10 text-red-400",

  warning:
    "border-orange-500/30 bg-orange-500/10 text-orange-400",

  info:
    "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",

  neutral:
    "border-zinc-700 bg-zinc-900 text-zinc-400",
};

type Props = {
  icon?: ReactNode;
  label: string;
  variant?: Variant;
};

export default function StatusBadge({
  icon,
  label,
  variant = "neutral",
}: Props) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium ${colours[variant]}`}
    >
      {icon}

      <span>{label}</span>
    </div>
  );
}