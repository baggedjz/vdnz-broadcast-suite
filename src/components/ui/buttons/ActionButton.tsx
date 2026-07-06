import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export default function ActionButton({
  children,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-amber-600 px-4 py-3 font-bold transition hover:bg-amber-500 active:scale-95"
    >
      {children}
    </button>
  );
}
