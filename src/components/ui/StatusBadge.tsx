type Status = "success" | "warning" | "danger" | "info";

type StatusBadgeProps = {
  status: Status;
  text: string;
};

const colours = {
  success: "bg-green-500/20 text-green-400",
  warning: "bg-amber-500/20 text-amber-400",
  danger: "bg-red-500/20 text-red-400",
  info: "bg-cyan-500/20 text-cyan-400",
};

export default function StatusBadge({
  status,
  text,
}: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${colours[status]}`}
    >
      {text}
    </span>
  );
}