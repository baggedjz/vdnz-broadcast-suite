import WizardLayout from "../components/WizardLayout";
import WizardProgress from "../components/WizardProgress";
import WizardFooter from "../components/WizardFooter";

type Props = {
  onNext: () => void;
};

export default function Welcome({ onNext }: Props) {
  return (
    <WizardLayout
      title="Welcome to Broadcast Business Suite"
      subtitle="Let's configure your organisation before your first event."
    >
      <WizardProgress
        currentStep={1}
        totalSteps={6}
      />

      <div className="py-12 text-center">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Build your own race control platform
        </h2>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
          This setup only takes a few minutes. We'll configure your
          organisation, branding, OBS integration and competition rules.
        </p>
      </div>

      <WizardFooter
        onNext={onNext}
        nextLabel="Get Started"
      />
    </WizardLayout>
  );
}