import Enemy from './enemy';
import EnemyManager from './enemy-manager';
import KeyboardManager from './keyboard-manager';
import Player from './player';

export default class State {
  enemyManager = new EnemyManager();
  isSelecting = false;
  selectedEnemy?: Enemy;
  player!: Player;
}
