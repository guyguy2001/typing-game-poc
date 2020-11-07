import Enemy from './objects/enemy';
import StatusEffect from './status-effect';

export default abstract class Attack {
  constructor(public key: string) {}
  public abstract damage: number;
  public abstract icon: string;
  public abstract cooldown: number = 3000;

  public canAttack = true;
  public lastAttackedTime?: number;

  public attack(enemy: Enemy) {
    enemy.damage(this.damage);
    this.canAttack = false;
    setTimeout(() => (this.canAttack = true), this.cooldown);
    this.lastAttackedTime = new Date().getTime();
  }
}

export class Firebolt extends Attack {
  icon = 'firebolt';
  cooldown = 3000;
  damage = 10;
}

export class Curse extends Attack {
  icon = 'death-coil';
  damage = 0;
  cooldown = 1000;

  public attack(enemy: Enemy) {
    super.attack(enemy);
    enemy.addStatusEffect(new CurseStatusEffect(enemy));
  }
}

class CurseStatusEffect extends StatusEffect {
  name = 'curse';
  interval?: NodeJS.Timeout;
  start(enemy: Enemy) {
    let ticks = 0;
    this.interval = setInterval(() => {
      if (ticks === 3 || enemy.isDead) {
        this.stop();
        return;
      }
      enemy.damage(5);
      ticks++;
    }, 1000);
  }
  stop() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
  }
  addGameListener() {}
}
