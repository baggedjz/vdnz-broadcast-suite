import { useState } from "react";
import { BBSCard, BBSButton, BBSInput } from "../../../components/ui";

export default function EventWizard() {
  const [step, setStep] = useState(0);

  return (
    <BBSCard title="Create Event">
      <div className="space-y-6">

        <div className="flex justify-between text-sm text-zinc-400">
          <span>Step {step + 1} of 5</span>
          <span>{Math.round(((step + 1) / 5) * 100)}%</span>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <BBSInput placeholder="Event Name" />
            <BBSInput placeholder="Organisation" />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <BBSInput placeholder="Venue" />
            <BBSInput placeholder="Date" />
          </div>
        )}

        {step === 2 && (
          <div className="text-zinc-300">
            Competition format (Top 32 / Top 16 / Top 8) coming next.
          </div>
        )}

        {step === 3 && (
          <div className="text-zinc-300">
            Driver import coming next.
          </div>
        )}

        {step === 4 && (
          <div className="text-zinc-300">
            Review & Create Event.
          </div>
        )}

        <div className="flex justify-between">
          <BBSButton
            variant="secondary"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </BBSButton>

          {step < 4 ? (
            <BBSButton onClick={() => setStep((s) => s + 1)}>
              Next
            </BBSButton>
          ) : (
            <BBSButton variant="success">
              Create Event
            </BBSButton>
          )}
        </div>

      </div>
    </BBSCard>
  );
}