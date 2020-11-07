export type EventsDict = {
  [eventName: string]: Function[];
};
export type ED<E, F> {
  [K: keyof E]: F<K>
}
export default class GameObject<E extends EventsDict> {
  eventHandlers: E = {} as E;
  addGameListener(event: keyof E, cb: E[typeof event][0]) {
    if (!(event in this.eventHandlers)) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event]?.push(cb);
  }
}


class Test {
  a: any;
}

class B extends Test {
  a: string;
}
