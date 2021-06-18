import Enemy from '../objects/enemy';
import State from './state';
import wordSelector from '../game/word-selector';

export default class EnemyManager {
  enemies: Enemy[] = [];
  enemiesBySelector: { [selector: string]: Enemy } = {};
  //selectors: string[]
  constructor(private state: State) {}

  addEnemy(enemy: Enemy) {
    enemy.emitter.on('onDeath', enemy => this.removeEnemy(enemy));
    this.enemies.push(enemy);
    this.enemiesBySelector[enemy.selector] = enemy;
    // TODO Refactor
    wordSelector.emitter.on("finished", word => {
      console.log("test");
      if (word === enemy.selector) {
          this.state.selectedEnemy?.onDeselcted();
          this.state.selectedEnemy = enemy;
          this.state.selectedEnemy.onSelected();
      }
    })
  }
  removeEnemy(enemy: Enemy) {
    this.enemies.splice(this.enemies.indexOf(enemy));
    delete this.enemiesBySelector[enemy.selector];
    enemy.parent.removeChild(enemy);
    if (this.state.selectedEnemy === enemy) {
      this.state.selectedEnemy = undefined;
    }
  }
}
