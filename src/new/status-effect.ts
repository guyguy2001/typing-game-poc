import Emitter from './event-emitter';
import Enemy from './objects/enemy';

type Events = {
  onStop: StatusEffect;
};

export default abstract class StatusEffect {
  abstract name: string;
  abstract icon: string;

  emitter = new Emitter<Events>();

  abstract timeout: number;
  public appliedTime?: number;

  timer?: NodeJS.Timeout;

  start(enemy: Enemy) {
    //TODO: create a system which allows to use this while synchronizing with the damage output
    // Don't forget the prospect of re-application
    // Maybe an OnTick?
    this.reapply();
  }

  reapply() {
    // I need to see how to force the derived classes to call this, while allowing stuff
    // like that survival hunter ability which adds stacks without refreshing the cooldown
    // If I go the haskell approach, perhaps 
    //  HunterSpecial = Attack(StacksNoReapply, ...)
    //  Curse = Attack(Reapply, ...)
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.stop(), this.timeout);
    this.appliedTime = new Date().getTime();
  }

  stop() {
    this.emitter.emit('onStop', this);
  }
}
