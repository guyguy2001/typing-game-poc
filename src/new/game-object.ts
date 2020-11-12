export type EventsDict = {
  [eventName: string]: Function[];
};
// export type ED<E, F> {
//   [K: keyof E]: F<K>
// }
export default class GameObject {
  eventHandlers: EventsDict = {} as EventsDict;
  addGameListener(event: string, cb: Function) {
    if (this.eventHandlers[event] === undefined) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(cb);
  }
}
