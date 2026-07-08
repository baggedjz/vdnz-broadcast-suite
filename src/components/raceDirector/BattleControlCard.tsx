import { Play, Square, RotateCcw } from "lucide-react";

import Panel from "../ui/Panel";
import ControlButton from "../ui/ControlButton";

import { useBattleTimerStore } from "../../store/battleTimerStore";
import { useCompetitionStore } from "../../store/competitionStore";
import { useEventLogStore } from "../../store/eventLogStore";

export default function BattleControlCard() {
  const { start, stop, reset } = useBattleTimerStore();
  const { nextBattle } = useCompetitionStore();
  const { addEvent } = useEventLogStore();

  const startBattle = () => {
    start();
    addEvent("Competition", "Battle Started");
  };

  const finishBattle = () => {
    stop();
    addEvent("Competition", "Battle Finished");
  };

  const next = () => {
    reset();
    nextBattle();
    addEvent("Competition", "Loaded Next Battle");
  };

  return (
    <Panel title="🏁 Battle Control">
      <div className="space-y-3">

        <ControlButton
          icon={<Play size={20} />}
          label="Start Battle"
          colour="green"
          shortcut="SPACE"
          onClick={startBattle}
        />

        <ControlButton
          icon={<Square size={20} />}
          label="Finish Battle"
          colour="red"
          onClick={finishBattle}
        />

        <ControlButton
          icon={<RotateCcw size={20} />}
          label="Load Next Battle"
          colour="cyan"
          onClick={next}
        />

      </div>
    </Panel>
  );
}