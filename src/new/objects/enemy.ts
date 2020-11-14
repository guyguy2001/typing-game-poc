import Emitter from '../event-emitter';
import StatusEffect from '../status-effect';
import StatusEffectManager from '../status-effects-manager';
import Healthbar from './health-bar';

const REGULAR_FILL = 0x444444;
const SELECTED_FILL = 0x329e2e;

const ENEMY_SIZE = 50;
const ENEMY_MAX_HP = 100;

type Events = {
  onDeath: Enemy;
  onStatusEffectApplied: [StatusEffect, Enemy];
};

export default class Enemy extends PIXI.Graphics {
  textObject: PIXI.Text;
  healthBar: Healthbar;
  _fill: number = REGULAR_FILL;
  isDead = false;
  statusEffects = new StatusEffectManager();

  public emitter = new Emitter<Events>();
  private _hp: number = ENEMY_MAX_HP;

  get hp() {
    return this._hp;
  }
  set hp(value: number) {
    this._hp = value;
    this.healthBar.hp = value;
  }

  constructor(public selector: string) {
    super();
    this.textObject = new PIXI.Text(selector, { fill: 0xffffff });
    this.addChild(this.textObject);
    this.healthBar = new Healthbar(ENEMY_SIZE * 2, ENEMY_MAX_HP);
    this.healthBar.position.set(-ENEMY_SIZE, -ENEMY_SIZE * 1.5);
    this.addChild(this.healthBar);
    this.redraw();
  }

  redraw() {
    this.clear();
    // this.lineStyle
    this.beginFill(this._fill);
    this.drawCircle(0, 0, ENEMY_SIZE);
    this.endFill();

    this.textObject.anchor.x = 0.5;
    this.textObject.anchor.y = 0.5;
    this.textObject.position.set(0, 0); //this.width / 2, this.height / 2);
  }

  onSelected() {
    this._fill = SELECTED_FILL;
    this.redraw();
  }

  onDeselcted() {
    this._fill = REGULAR_FILL;
    this.redraw();
  }

  damage(damage: number) {
    this.hp = Math.max(this.hp - damage, 0);
    if (this.hp == 0) {
      this.onDeath();
    }
  }

  onDeath() {
    this.emitter.emit('onDeath', this);
    this.isDead = true;
  }

  addStatusEffect(statusEffect: StatusEffect) {
    this.statusEffects.addStatusEffect(statusEffect);
    statusEffect.start(this);
    this.emitter.emit('onStatusEffectApplied', [statusEffect, this]);
  }
}
