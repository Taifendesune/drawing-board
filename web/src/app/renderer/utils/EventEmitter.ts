export interface Events {
  'canvas:mousedown': { e: MouseEvent; x: number; y: number };

  testevent: number;
}

class EventEmitter {
  handlers: Map<keyof Events, Function[]> = new Map();

  on(eventName: keyof Events, handler: (e: Events[typeof eventName]) => void) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  off(eventName: keyof Events, handler: (e: Events[typeof eventName]) => void) {
    const handlerArray = this.handlers.get(eventName);
    if (!handlerArray) return;
    this.handlers.set(
      eventName,
      handlerArray.filter((h) => h !== handler)
    );
  }

  emit(eventName: keyof Events, e: Events[typeof eventName]) {
    const handlerArray = this.handlers.get(eventName);
    if (!handlerArray) return;
    handlerArray.forEach((handler) => handler(e));
  }

  clear(eventName: keyof Events) {
    this.handlers.delete(eventName);
  }
}

export default EventEmitter;
