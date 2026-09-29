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

import {
  hideBattleStage,
  showBattleStage,
  type BattleStage,
} from "../../services/obs";
import { useCompetitionStore } from "../../store/competitionStore";
import { useBattleTimerStore } from "../../store/battleTimerStore";
import { useEventStore } from "../../store/eventStore";

const stageButtons: Array<{ stage: BattleStage; label: string }> = [
  { stage: "top32", label: "TOP 32" },
  { stage: "top16", label: "TOP 16" },
  { stage: "great8", label: "GREAT 8" },
  { stage: "final4", label: "FINAL 4" },
  { stage: "final", label: "FINAL" },
];

export default function QuickActionsCard() {
  const { nextBattle } = useCompetitionStore();
  const { addEvent } = useEventLogStore();
  const { start } = useBattleTimerStore();
  const { currentEvent } = useEventStore();

  const triggerBattleStage = async (stage: BattleStage, label: string) => {
    const ok = await showBattleStage(stage, {
      round: currentEvent.round || 2,
      eventName:
        currentEvent.name || currentEvent.venue || "ESDA Barbagallo 2025",
      seriesName: currentEvent.series || "VDNZ PRO DEVELOPMENT",
      durationMs: 5000,
    });

    addEvent(
      "Broadcast",
      ok
        ? `${label} stage overlay shown`
        : `${label} stage overlay failed - OBS not connected`
    );
  };

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
            Battle Stage Overlay
          </p>

          <div className="grid grid-cols-2 gap-2">
            {stageButtons.map(({ stage, label }) => (
              <button
                key={stage}
                onClick={() => void triggerBattleStage(stage, label)}
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-3 text-sm font-black tracking-wide text-amber-300 transition hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-200"
              >
                {label}
              </button>
            ))}

            <button
              onClick={async () => {
                const hidden = await hideBattleStage();
                addEvent(
                  "Broadcast",
                  hidden
                    ? "Battle stage overlay hidden"
                    : "Battle stage overlay was not active"
                );
              }}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-3 text-sm font-black tracking-wide text-zinc-300 transition hover:bg-zinc-700"
            >
              HIDE
            </button>
          </div>

          <p className="mt-2 text-xs text-zinc-600">
            Stage cards display for 5 seconds and then hide automatically.
          </p>
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
