import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "success" | "danger";

interface BBSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function BBSButton({
  variant = "primary",
  icon,
  fullWidth = false,
  className,
  children,
  ...props
}: BBSButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-cyan-500 text-black hover:bg-cyan-400": variant === "primary",
          "bg-zinc-800 text-white hover:bg-zinc-700": variant === "secondary",
          "bg-green-500 text-white hover:bg-green-400": variant === "success",
          "bg-red-500 text-white hover:bg-red-400": variant === "danger",
          "w-full": fullWidth,
        },
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}