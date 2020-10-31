import Enemy from './enemy'

export default class EnemyManager {
  enemies: Enemy[] = [];
  enemiesBySelector: { [selector: string]: Enemy } = {}
  //selectors: string[]
  
  addEnemy(enemy: Enemy) {
    this.enemies.push(enemy);
    this.enemiesBySelector[enemy.selector] = enemy;
  }
}