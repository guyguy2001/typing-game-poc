import Icons from './icons';
import Enemy from './objects/enemy';
import StatusEffect from './status-effect';

export default abstract class Attack {
  constructor(public key: string) { }
  public abstract damage: number;
  public abstract icon: string;
  public abstract cooldown: number;

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
  icon = Icons.Firebolt
  cooldown = 3000;
  damage = 10;
}

export class Curse extends Attack {
  icon = Icons.DeathCoil;
  damage = 0;
  cooldown = 1000;

  public attack(enemy: Enemy) {
    super.attack(enemy);
    enemy.addStatusEffect(new CurseStatusEffect());
  }
}

class CurseStatusEffect extends StatusEffect {
  name = 'curse';
  icon = Icons.DeathCoil;
  interval?: NodeJS.Timeout;
  timeout = 3000;
  start(enemy: Enemy) {
    super.start(enemy);
    let ticks = 0;
    if (this.interval === undefined) {
      this.interval = setInterval(() => {
        if (enemy.isDead) {
          this.stop();
          return;
        }
        enemy.damage(5);
        ticks++;
      }, 1000);
    }
  }
  stop() {
    super.stop();
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
  }
  addGameListener() { }
}
