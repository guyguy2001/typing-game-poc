import Icons from '../static/icons';
import Enemy from '../objects/enemy';
import { CurseStatusEffect } from './status-effects';


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
  icon = Icons.Firebolt;
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
