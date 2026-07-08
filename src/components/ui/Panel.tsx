import type { ReactNode } from "react";

type PanelProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  rightContent?: ReactNode;
};

export default function Panel({
  title,
  children,
  className = "",
  rightContent,
}: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-zinc-800 bg-[#101010] shadow-xl shadow-black/30 ${className}`}
    >
      {title && (
        <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-semibold tracking-wide text-white">
            {title}
          </h2>

          {rightContent}
        </header>
      )}

      <div className="p-6">{children}</div>
    </section>
  );
}