type EventCallback<T = unknown> = (payload: T) => void;

class EventBus {
  private listeners = new Map<string, EventCallback[]>();

  on<T>(event: string, callback: EventCallback<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push(callback as EventCallback);
  }

  off<T>(event: string, callback: EventCallback<T>) {
    const callbacks = this.listeners.get(event);

    if (!callbacks) return;

    this.listeners.set(
      event,
      callbacks.filter((cb) => cb !== callback)
    );
  }

  emit<T>(event: string, payload: T) {
    const callbacks = this.listeners.get(event);

    if (!callbacks) return;

    callbacks.forEach((callback) => callback(payload));
  }
}

export const eventBus = new EventBus();