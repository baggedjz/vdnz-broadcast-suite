import { useEffect } from "react";

const STAGES = {
  top32: "TOP 32",
  top16: "TOP 16",
  great8: "GREAT 8",
  final4: "FINAL 4",
  final: "FINAL",
} as const;

type BattleStage = keyof typeof STAGES;

export default function BattleStageOverlay() {
  const params = new URLSearchParams(window.location.search);
  const requestedStage = params.get("stage") as BattleStage | null;
  const stage = requestedStage && requestedStage in STAGES ? requestedStage : "top32";

  const round = params.get("round") || "2";
  const eventName = params.get("event") || "ESDA Barbagallo 2025";
  const seriesName = params.get("series") || "VDNZ PRO DEVELOPMENT";

  useEffect(() => {
    const previousBodyBackground = document.body.style.background;
    const previousHtmlBackground = document.documentElement.style.background;

    document.body.style.background = "transparent";
    document.documentElement.style.background = "transparent";

    return () => {
      document.body.style.background = previousBodyBackground;
      document.documentElement.style.background = previousHtmlBackground;
    };
  }, []);

  return (
    <main className="fixed inset-0 flex items-center justify-center overflow-hidden bg-transparent text-white">
      <style>{`
        @keyframes vdnz-stage-in-out {
          0% { opacity: 0; transform: translateY(54px) scale(.94); filter: blur(8px); }
          10% { opacity: 1; transform: translateY(-7px) scale(1.015); filter: blur(0); }
          16% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          91% { opacity: 1; transform: translateY(-4px) scale(1.01); filter: blur(0); }
          100% { opacity: 0; transform: translateY(-48px) scale(.96); filter: blur(7px); }
        }

        @keyframes vdnz-stage-sweep {
          0% { transform: translateX(-155%) skewX(-18deg); opacity: 0; }
          15% { opacity: .85; }
          45% { opacity: .15; }
          100% { transform: translateX(245%) skewX(-18deg); opacity: 0; }
        }

        @keyframes vdnz-stage-glow {
          0%, 100% { opacity: .35; }
          50% { opacity: .8; }
        }

        .vdnz-stage-card {
          animation: vdnz-stage-in-out 4.8s cubic-bezier(.2,.8,.2,1) forwards;
        }

        .vdnz-stage-sweep {
          animation: vdnz-stage-sweep 2.2s .18s cubic-bezier(.2,.7,.2,1) both;
        }

        .vdnz-stage-glow {
          animation: vdnz-stage-glow 1.6s ease-in-out infinite;
        }
      `}</style>

      <section className="vdnz-stage-card relative w-[1420px] max-w-[86vw]">
        <div
          className="absolute -inset-x-5 inset-y-0 bg-black/90 shadow-[0_30px_90px_rgba(0,0,0,.8)]"
          style={{
            clipPath:
              "polygon(4% 0, 96% 0, 100% 24%, 96% 100%, 4% 100%, 0 76%, 0 24%)",
          }}
        />

        <div
          className="absolute -inset-x-2 inset-y-3 border-y-2 border-amber-400/80 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10"
          style={{
            clipPath:
              "polygon(4% 0, 96% 0, 100% 25%, 96% 100%, 4% 100%, 0 75%, 0 25%)",
          }}
        />

        <div className="vdnz-stage-glow absolute left-10 top-1/2 h-36 w-2 -translate-y-1/2 bg-amber-400 shadow-[0_0_34px_rgba(251,191,36,.9)]" />
        <div className="vdnz-stage-glow absolute right-10 top-1/2 h-36 w-2 -translate-y-1/2 bg-amber-400 shadow-[0_0_34px_rgba(251,191,36,.9)]" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="vdnz-stage-sweep absolute -top-20 h-[430px] w-56 bg-gradient-to-r from-transparent via-amber-300/45 to-transparent" />
        </div>

        <div className="relative flex min-h-[340px] flex-col items-center justify-center px-24 py-11 text-center">
          <div className="mb-2 flex items-center gap-4 text-[21px] font-black uppercase tracking-[0.26em] text-zinc-300">
            <span>{seriesName}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,.9)]" />
            <span className="text-amber-300">THRILL SUPPLY COMPANY</span>
          </div>

          <div className="h-px w-[82%] bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

          <h1
            className="mt-1 text-[clamp(116px,11.5vw,215px)] font-black italic leading-[.92] tracking-[-0.075em] text-white drop-shadow-[0_8px_0_rgba(0,0,0,.35)]"
            style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
          >
            {STAGES[stage]}
          </h1>

          <div className="mt-1 flex items-center gap-5 text-[27px] font-black uppercase tracking-[0.12em] text-zinc-200">
            <span>ROUND {round}</span>
            <span className="text-amber-400">•</span>
            <span>{eventName}</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-[9%] right-[9%] h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </section>
    </main>
  );
}
