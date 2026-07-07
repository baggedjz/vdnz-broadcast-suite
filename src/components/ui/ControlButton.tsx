import type { ReactNode } from "react";

type ControlButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-cyan-500 hover:bg-cyan-400 text-black",
  secondary:
    "bg-zinc-800 hover:bg-zinc-700 text-white",
  success:
    "bg-green-600 hover:bg-green-500 text-white",
  danger:
    "bg-red-600 hover:bg-red-500 text-white",
};

export default function ControlButton({
  children,
  icon,
  onClick,
  variant = "primary",
  disabled = false,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all duration-200 ${
        variants[variant]
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {icon}
      {children}
    </button>
  );
}