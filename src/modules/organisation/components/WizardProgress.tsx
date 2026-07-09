type WizardProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function WizardProgress({
  currentStep,
  totalSteps,
}: WizardProgressProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-cyan-400">
          Step {currentStep} of {totalSteps}
        </span>

        <span className="text-sm text-zinc-500">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}