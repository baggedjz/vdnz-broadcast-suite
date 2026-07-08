import { useEffect } from "react";
import Panel from "../ui/Panel";
import { useBattleTimerStore } from "../../store/battleTimerStore";

export default function BattleTimerCard() {
  const {
    seconds,
    running,
    tick,
  } = useBattleTimerStore();

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [running, tick]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <Panel title="⏱ Live Battle">

      <div className="flex flex-col items-center justify-center py-10">

        <p className="mb-2 text-zinc-500">
          Battle Timer
        </p>

        <h1 className="font-mono text-6xl font-black text-cyan-400">
          {mins}:{secs}
        </h1>

      </div>

    </Panel>
  );
}