import { Coord, PaperEvent } from '../types';

export interface NativeEventsMap {
  pointerdown: PointerEvent;
  pointermove: PointerEvent;
  pointerup: PointerEvent;
}

export interface PaperEventsMap {
  'paper:pointerdown': PaperEvent;
  'paper:pointermove': PaperEvent;
  'paper:pointerup': PaperEvent;
}

export interface Events extends NativeEventsMap, PaperEventsMap {}

class EventEmitter {
  handlers: Map<keyof Events, Function[]> = new Map();

  on<T extends keyof Events>(eventName: T, handler: (e: Events[T]) => void) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  off<T extends keyof Events>(eventName: T, handler: (e: Events[T]) => void) {
    const handlerArray = this.handlers.get(eventName);
    if (!handlerArray) return;
    this.handlers.set(
      eventName,
      handlerArray.filter((h) => h !== handler)
    );
  }

  emit<T extends keyof Events>(eventName: T, e: Events[T]) {
    const handlerArray = this.handlers.get(eventName);
    if (!handlerArray) return;
    handlerArray.forEach((handler) => handler(e));
  }

  clear(eventName: keyof Events) {
    this.handlers.delete(eventName);
  }
}

export default EventEmitter;
