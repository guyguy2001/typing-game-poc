import State from './state';
import InputConsumer from './input-consumer'
import Attack from './attack';

export default class AbilityManager implements InputConsumer {
  abilities: Attack[] = [];
  abilitiesByKey: {[key: string]: Attack} = {}

  constructor(private state: State) {}

  onInput(key: string) {
    if (this.state.selectedEnemy && key in this.abilitiesByKey) {
      this.abilitiesByKey[key].attack(this.state.selectedEnemy);
      return true;
    }
    return false;
  }  

  addAbility(ability: Attack) {
    this.abilities.push(ability);
    this.abilitiesByKey[ability.key] = ability;
  }
}
