type Variant = "success" | "warning" | "danger" | "info";

interface Props {
  variant?: Variant;
  children: React.ReactNode;
}

export default function BBSBadge({
  variant = "info",
  children,
}: Props) {
  const colours = {
    info: "bg-cyan-500/20 text-cyan-400",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-amber-500/20 text-amber-400",
    danger: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colours[variant]}`}
    >
      {children}
    </span>
  );
}