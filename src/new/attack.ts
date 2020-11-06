import Enemy from './objects/enemy';
import StatusEffect from './status-effect';

export default class Attack {
  constructor(public key: string) {}
  public damage: number = 10;
  public icon: string = 'firebolt';

  public cooldown: number = 3000;
  public canAttack = true;
  public lastAttackedTime?: number;

  public attack(enemy: Enemy) {
    console.log(`Attacked ${enemy.selector}`);
    enemy.damage(this.damage);
    this.canAttack = false;
    setTimeout(() => (this.canAttack = true), this.cooldown);
    this.lastAttackedTime = new Date().getTime();
  }
}

export class Frostbolt extends Attack {}

export class Curse extends Attack {
  public icon: string = 'death-coil';
  damage = 0;
  cooldown = 1000;
  public attack(enemy: Enemy) {
    super.attack(enemy);
    new CurseStatusEffect(enemy);
  }
}

class CurseStatusEffect extends StatusEffect {
  constructor(enemy: Enemy) {
    super(enemy);
    let ticks = 0;
    const interval = setInterval(() => {
      if (ticks < 3) {
        enemy.damage(5);
      }
      ticks++;
    }, 1000);
  }
}
