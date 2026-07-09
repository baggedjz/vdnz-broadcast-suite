type WizardFooterProps = {
  canGoBack?: boolean;
  nextLabel?: string;
  onBack?: () => void;
  onNext: () => void;
};

export default function WizardFooter({
  canGoBack = false,
  nextLabel = "Next",
  onBack,
  onNext,
}: WizardFooterProps) {
  return (
    <div className="mt-10 flex justify-between border-t border-zinc-800 pt-6">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className="rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>

      <button
        onClick={onNext}
        className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black transition hover:bg-cyan-400"
      >
        {nextLabel}
      </button>
    </div>
  );
}