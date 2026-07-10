import type { TandemData } from "./telemetryService";


export type TelemetryEvent =
  | "TANDEM_LOCKED"
  | "HIGH_PRESSURE"
  | "REPLAY_TRIGGER"
  | "NORMAL";



export function analyseTelemetry(
  data: TandemData
): TelemetryEvent {


  if (
    data.gap < 0.5 &&
    data.angleDifference < 5
  ) {

    return "TANDEM_LOCKED";

  }



  if (
    data.gap < 1
  ) {

    return "HIGH_PRESSURE";

  }



  if (
    data.angleDifference > 20
  ) {

    return "REPLAY_TRIGGER";

  }



  return "NORMAL";

}