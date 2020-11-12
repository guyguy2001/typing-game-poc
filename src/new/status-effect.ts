import GameObject, { EventsDict } from './game-object';
import Enemy from './objects/enemy';

type T = {
  onStop: (() => void)[];
};
export default abstract class StatusEffect extends GameObject {
  abstract name: string;

  abstract start(enemy: Enemy): void;
  stop() {
    for(const f of this.eventHandlers['onStop']) {
      f(this);
    }
  };
}
