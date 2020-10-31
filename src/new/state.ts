import Enemy from './enemy';
import EnemyManager from './enemy-manager';
import AbilitiesManager from './abilities-manager';
import Player from './objects/player';

export default class State {
  enemyManager = new EnemyManager();
  abilitiesManager = new AbilitiesManager();
  isSelecting = false;
  selectedEnemy?: Enemy;
  player!: Player;
}
