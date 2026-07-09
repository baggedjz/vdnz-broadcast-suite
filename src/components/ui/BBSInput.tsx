import type { InputHTMLAttributes } from "react";

export default function BBSInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-cyan-500"
    />
  );
}