export interface TelemetryData {

  driverId: string;

  speed: number;

  rpm: number;

  gear: number;

  position: number;

  angle: number;

  distance: number;

}



export interface TandemData {

  lead: TelemetryData;

  chase: TelemetryData;

  gap: number;

  angleDifference: number;

  pressure: number;

}



type TelemetryListener =
  (data: TandemData) => void;



let listeners:
  TelemetryListener[] = [];



let connected = false;



export function connectTelemetry() {

  connected = true;

  console.log(
    "🏎️ Telemetry connected"
  );

}



export function disconnectTelemetry() {

  connected = false;

  listeners = [];

  console.log(
    "Telemetry disconnected"
  );

}



export function isTelemetryConnected() {

  return connected;

}



export function onTelemetryUpdate(
  callback: TelemetryListener
) {

  listeners.push(callback);


  return () => {

    listeners =
      listeners.filter(
        (listener) =>
          listener !== callback
      );

  };

}



export function processTelemetry(
  data: TandemData
) {


  listeners.forEach(
    (listener) =>
      listener(data)
  );


}