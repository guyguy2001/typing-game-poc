import State from './state';
import InputConsumer from '@/objects/enemy';
import Attack from './attack';

type CallbackType = 'onAttackAdded';

export default class AbilityManager implements InputConsumer {
  abilities: Attack[] = [];
  abilitiesByKey: { [key: string]: Attack } = {};

  constructor(private state: State) {}

  onInput(key: string) {
    if (this.state.selectedEnemy && key in this.abilitiesByKey) {
      const attack = this.abilitiesByKey[key];
      if (attack.canAttack) {
        attack.attack(this.state.selectedEnemy);
      }
      return true;
    }
    return false;
  }

  addAbility(ability: Attack) {
    this.abilities.push(ability);
    this.abilitiesByKey[ability.key] = ability;
    this.callbacks.get('onAttackAdded')?.forEach(cb => {
      cb(ability);
    });
  }

  callbacks: Map<CallbackType, ((enemy: Attack) => void)[]> = new Map();
  addGameListener(type: CallbackType, cb: (attack: Attack) => void) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, []);
    }
    this.callbacks.get(type)!.push(cb);
  }
}
