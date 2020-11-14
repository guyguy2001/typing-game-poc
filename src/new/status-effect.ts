import Emitter from './event-emitter';
import Enemy from './objects/enemy';

type Events = {
  onStop: StatusEffect;
};

export default abstract class StatusEffect {
  abstract name: string;

  emitter = new Emitter<Events>();

  abstract start(enemy: Enemy): void;

  stop() {
    this.emitter.emit('onStop', this);
  }
}
