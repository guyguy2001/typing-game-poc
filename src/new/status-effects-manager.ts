import { stat } from 'fs';
import StatusEffect from './status-effect';

export default class StatusEffectManager {
  statusEffectsStack: StatusEffect[] = [];
  statusEffectsByName: { [name: string]: StatusEffect } = {};

  addStatusEffect(statusEffect: StatusEffect) {
    this.statusEffectsStack.push(statusEffect);
    this.statusEffectsByName[statusEffect.name] = statusEffect;
  }

  removeStatusEffect(statusEffect: StatusEffect) {
    this.statusEffectsStack.splice(
      this.statusEffectsStack.indexOf(statusEffect),
      1
    ); //TODO: Make it function like a stack?
    delete this.statusEffectsByName[statusEffect.name];
    statusEffect.onDestroyed();
  }
}
