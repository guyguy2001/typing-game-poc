import State from './state';
import InputConsumer from '../infrastructure/input-consumer';
import Attack from './attack';
import Emitter from '../infrastructure/event-emitter';
import wordSelector from '../game/word-selector';

type Events = {
  onAttackAdded: Attack
};

export default class AbilityManager implements InputConsumer {
  abilities: Attack[] = [];
  abilitiesByKey: { [key: string]: Attack } = {};
  public emitter = new Emitter<Events>();

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
    // TODO Refactor
    wordSelector.emitter.on("finished", word => {
      if (word === ability.key) {
        if (ability.canAttack && this.state.selectedEnemy !== undefined) {
          ability.attack(this.state.selectedEnemy);
        }
      }
    })
    this.emitter.emit("onAttackAdded", ability);
  }
}
