import Emitter from './event-emitter';
import Enemy from './objects/enemy';
import StatusEffect from './status-effect';

type Events = {
  onEffectEnded: StatusEffect;
};

export default class StatusEffectManager {
  statusEffectsStack: StatusEffect[] = [];
  statusEffectsByName: { [name: string]: StatusEffect } = {};
  emitter = new Emitter<Events>();

  constructor(private enemy: Enemy) {}
  
  addStatusEffect(statusEffect: StatusEffect) {
    if (this.statusEffectsByName[statusEffect.name] === undefined) {
      console.log('if');
      this.statusEffectsStack.push(statusEffect);
      this.statusEffectsByName[statusEffect.name] = statusEffect;
      statusEffect.emitter.on('onStop', (status: StatusEffect) =>
        this.removeStatusEffect(status)
      );
      statusEffect.start(this.enemy);
      console.log('START');
    }
    else {
      console.log('else');
      const existingStatusEffect = this.statusEffectsByName[statusEffect.name];
      existingStatusEffect.reapply();
    }
  }

  cureStatusEffect(statusEffect: StatusEffect) {
    statusEffect.stop();
  }

  private removeStatusEffect(statusEffect: StatusEffect) {
    this.statusEffectsStack.splice(
      this.statusEffectsStack.indexOf(statusEffect),
      1
    ); //TODO: Make it function like a stack?
    delete this.statusEffectsByName[statusEffect.name];
    this.emitter.emit('onEffectEnded', statusEffect);
  }
}
