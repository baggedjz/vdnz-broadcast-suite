import { Play, Square, RotateCcw } from "lucide-react";

import Panel from "../ui/Panel";
import ControlButton from "../ui/ControlButton";

import {
  startBattleWorkflow,
  finishBattleWorkflow,
} from "../../services/battleWorkflow";

import { useBattleTimerStore } from "../../store/battleTimerStore";
import { useCompetitionStore } from "../../store/competitionStore";


export default function BattleControlCard() {

  const { reset } = useBattleTimerStore();

  const { nextBattle } = useCompetitionStore();


  const loadNextBattle = () => {
    reset();
    nextBattle();
  };


  return (
    <Panel title="🏁 Battle Control">

      <div className="space-y-3">

        <ControlButton
          icon={<Play size={20} />}
          label="Start Battle"
          colour="green"
          shortcut="SPACE"
          onClick={startBattleWorkflow}
        />


        <ControlButton
          icon={<Square size={20} />}
          label="Finish Battle"
          colour="red"
          onClick={finishBattleWorkflow}
        />


        <ControlButton
          icon={<RotateCcw size={20} />}
          label="Load Next Battle"
          colour="cyan"
          onClick={loadNextBattle}
        />

      </div>

    </Panel>
  );
}