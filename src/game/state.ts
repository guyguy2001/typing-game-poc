import Enemy from '../objects/enemy';
import EnemyManager from './enemy-manager';
import AbilitiesManager from './abilities-manager';
import Player from '../objects/player';

export default class State {
  selectors = 'abcdefghijklmnopqrstuvwxyz'.split('');
  enemyManager = new EnemyManager(this);
  abilitiesManager = new AbilitiesManager(this);
  selectedEnemy?: Enemy;
  player!: Player;
}
