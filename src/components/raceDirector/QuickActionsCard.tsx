import {
  MonitorPlay,
  Trophy,
  RotateCcw,
  Users,
  Radio,
  Square,
  SkipForward,
} from "lucide-react";

import Panel from "../ui/Panel";
import ControlButton from "../ui/ControlButton";
import { useEventLogStore } from "../../store/eventLogStore";


import {
  showVS,
  showWinner,
  showReplay,
  showCommentary,
  beginRecording,
  endRecording,
} from "../../services/eventEngine";

import { useCompetitionStore } from "../../store/competitionStore";
import { useBattleTimerStore } from "../../store/battleTimerStore";

export default function QuickActionsCard() {
  const { nextBattle } = useCompetitionStore();
  const { addEvent } = useEventLogStore();
const { start } = useBattleTimerStore();

  return (
    <Panel title="🎬 Broadcast Control">

      <div className="space-y-6">

        <div>

          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Program
          </p>

          <div className="space-y-3">

            <ControlButton
              icon={<Users size={20} />}
              label="Driver Intro / VS Overlay"
              shortcut="F1"
              colour="cyan"
              onClick={async () => {
  await showVS();
  addEvent("Broadcast", "Driver Intro / VS Overlay");
}}
            />

            <ControlButton
              icon={<Trophy size={20} />}
              label="Winner"
              shortcut="F2"
              colour="green"
              onClick={async () => {
  await showWinner();
  addEvent("Broadcast", "Winner scene activated");
}}
            />

            <ControlButton
              icon={<RotateCcw size={20} />}
              label="Replay"
              shortcut="F3"
              colour="purple"
              onClick={async () => {
  await showReplay();
  addEvent("Replay", "Replay activated");
}}
            />

            <ControlButton
              icon={<MonitorPlay size={20} />}
              label="Commentary"
              shortcut="F4"
              colour="orange"
              onClick={async () => {
  await showCommentary();
  addEvent("Broadcast", "Commentary scene activated");
}}
            />

          </div>

        </div>

        <div className="border-t border-zinc-800 pt-6">

          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Output
          </p>

          <div className="space-y-3">

            <ControlButton
              icon={<Radio size={20} />}
              label="Start Recording"
              shortcut="F5"
              colour="red"
              onClick={async () => {
  await beginRecording();
  addEvent("Broadcast", "Recording started");
}}
            />

            <ControlButton
              icon={<Square size={20} />}
              label="Stop Recording"
              colour="zinc"
              onClick={async () => {
  await endRecording();
  addEvent("Broadcast", "Recording stopped");
}}
            />

          </div>

        </div>

        <div className="border-t border-zinc-800 pt-6">

          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Event
          </p>

          <ControlButton
            icon={<SkipForward size={20} />}
            label="Next Battle"
            shortcut="SPACE"
            colour="cyan"
            onClick={() => {
           nextBattle();
           start();
           addEvent("Competition", "Battle Started");
          }}
        
          />

        </div>

      </div>

    </Panel>
  );
}