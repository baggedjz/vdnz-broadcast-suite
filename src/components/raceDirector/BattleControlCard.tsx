import { Play, Square, RotateCcw } from "lucide-react";

import Panel from "../ui/Panel";
import ControlButton from "../ui/ControlButton";

import {
  startBattle,
  finishBattle,
  loadNextBattle,
} from "../../services/eventEngine";

export default function BattleControlCard() {
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
          onClick={loadNextBattle}
        />

      </div>
    </Panel>
  );
}