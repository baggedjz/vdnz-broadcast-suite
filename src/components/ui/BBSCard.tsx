import type { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function BBSCard({
  title,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg ${className}`}
    >
      {title && (
        <h2 className="mb-6 text-xl font-bold text-cyan-400">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}