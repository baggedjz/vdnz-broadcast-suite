import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg ${className}`}
    >
      {title && (
        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-bold text-cyan-400">
            {title}
          </h2>
        </div>
      )}

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}