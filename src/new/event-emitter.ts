import { EventEmitter } from 'events';

type EventMap = Record<string | symbol, any>;

type EventKey<T extends EventMap> = (string | symbol) & keyof T;
type EventReceiver<T> = (params: T) => void;

interface EmitterInterface<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

export default class Emitter<T extends EventMap>
  implements EmitterInterface<T> {
  private emitter = new EventEmitter();
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
    this.emitter.on(eventName, fn);
  }

  once<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
    this.emitter.once(eventName, fn);
  }

  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
    this.emitter.off(eventName, fn);
  }

  emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
    this.emitter.emit(eventName, params);
  }
}
