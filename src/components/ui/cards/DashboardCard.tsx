import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function DashboardCard({
  title,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg ${className}`}
    >
      <div className="border-b border-zinc-800 px-5 py-3">
        <h2 className="text-lg font-bold text-amber-500">
          {title}
        </h2>
      </div>

      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
