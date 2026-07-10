import { BBSCard, BBSButton } from "../components/ui";

import { useCompetitionStore } from "../store/competitionStore";
import { useOBSStore } from "../store/obsStore";
import { useSponsorBroadcastStore } from "../store/sponsorBroadcastStore";
import { useReplayStore } from "../store/replayStore";

export default function Dashboard() {
  const { event, competition } = useCompetitionStore();

  const {
    connected,
    recording,
    streaming,
  } = useOBSStore();

  const { activeSponsor } =
    useSponsorBroadcastStore();

  const { markers } =
    useReplayStore();

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-amber-500">
          Dashboard
        </h1>

        <p className="text-zinc-400">
          VDNZ Broadcast Suite Mission Control
        </p>

      </div>

      {/* Top Cards */}

      <div className="grid grid-cols-4 gap-6">

        <BBSCard title="Current Event">

          <p className="text-2xl font-bold">
            {event.name}
          </p>

          <p className="text-zinc-400">
            {competition.stage}
          </p>

        </BBSCard>

        <BBSCard title="OBS">

          <p>
            {connected ? "🟢 Connected" : "🔴 Offline"}
          </p>

          <p>
            {recording ? "🔴 Recording" : "Idle"}
          </p>

          <p>
            {streaming ? "🟢 Live" : "Offline"}
          </p>

        </BBSCard>

        <BBSCard title="Replay">

          <p className="text-3xl font-bold">
            {markers.length}
          </p>

          <p className="text-zinc-400">
            Replay Markers
          </p>

        </BBSCard>

        <BBSCard title="Sponsor">

          <p className="text-xl font-bold">
            {activeSponsor || "None"}
          </p>

        </BBSCard>

      </div>

      {/* Main Area */}

      <div className="grid grid-cols-3 gap-6">

        <BBSCard title="Current Battle">

          <div className="space-y-3">

            <p>Battle</p>

            <h2 className="text-2xl font-bold">
              {competition.currentBattle} / {competition.totalBattles}
            </h2>

            <p className="text-zinc-400">
              {competition.stage}
            </p>

          </div>

        </BBSCard>

        <BBSCard title="Quick Actions">

          <div className="space-y-3">

            <BBSButton>
              🏁 Race Director
            </BBSButton>

            <BBSButton>
              📺 Broadcast Director
            </BBSButton>

            <BBSButton>
              🎬 Replay Director
            </BBSButton>

            <BBSButton>
              🏆 Championship
            </BBSButton>

          </div>

        </BBSCard>

        <BBSCard title="System Status">

          <div className="space-y-2">

            <p>
              OBS:
              {" "}
              {connected ? "🟢" : "🔴"}
            </p>

            <p>
              Database:
              {" "}
              🟢
            </p>

            <p>
              Assetto:
              {" "}
              🟡
            </p>

            <p>
              Discord:
              {" "}
              ⚪
            </p>

          </div>

        </BBSCard>

      </div>

    </div>
  );
}