import type { ReactNode } from "react";

type WizardLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function WizardLayout({
  title,
  subtitle,
  children,
}: WizardLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-8">
      <div className="w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="border-b border-zinc-800 p-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            {title}
          </h1>

          <p className="mt-2 text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}