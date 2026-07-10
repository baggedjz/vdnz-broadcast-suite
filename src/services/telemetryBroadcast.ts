import type { TelemetryEvent } from "./telemetryAutomation";


export function handleTelemetryEvent(
  event: TelemetryEvent
) {


  switch (event) {


    case "TANDEM_LOCKED":

      console.log(
        "🔥 Tandem Locked"
      );

      break;



    case "HIGH_PRESSURE":

      console.log(
        "⚠ High Pressure Battle"
      );

      break;



    case "REPLAY_TRIGGER":

      console.log(
        "🎬 Replay Trigger"
      );

      break;



    case "NORMAL":

      break;


  }

}