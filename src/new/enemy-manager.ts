import Enemy from './objects/enemy'

export default class EnemyManager {
  enemies: Enemy[] = [];
  enemiesBySelector: { [selector: string]: Enemy } = {}
  //selectors: string[]
  
  addEnemy(enemy: Enemy) {
    enemy.addGameListener('onDeath', enemy => this.removeEnemy(enemy));
    this.enemies.push(enemy);
    this.enemiesBySelector[enemy.selector] = enemy;
  }
  removeEnemy(enemy: Enemy) {
    this.enemies.splice(this.enemies.indexOf(enemy));
    delete this.enemiesBySelector[enemy.selector];
    enemy.parent.removeChild(enemy);
  }
}