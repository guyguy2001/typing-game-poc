import GameObject, { EventsDict } from './game-object';
import Enemy from './objects/enemy';

type T = {
  onStop: (() => void)[];
};
export default abstract class StatusEffect extends GameObject<T> {
  abstract name: string;

  abstract start(enemy: Enemy): void;
  abstract stop(): void;
  addGameListener(event: 'onStop', cb: () => void): void;
}
