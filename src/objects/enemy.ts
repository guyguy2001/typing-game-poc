import Emitter from '../infrastructure/event-emitter';
import StatusEffect from '../game/status-effects';
import StatusEffectManager from '../game/status-effects-manager';
import { STATUS_EFFECT_ICON_SIZE } from './status-effect-icon';
import Healthbar from './health-bar';
import StatusEffectsBar from './status-effects-bar';

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
  statusEffectsBar: StatusEffectsBar;
  _fill: number = REGULAR_FILL;
  isDead = false;
  statusEffects = new StatusEffectManager(this);

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

    this.statusEffectsBar = new StatusEffectsBar(this.statusEffects);
    this.statusEffectsBar.position.set(this.healthBar.position.x, this.healthBar.position.y - STATUS_EFFECT_ICON_SIZE * 1.25);
    this.addChild(this.statusEffectsBar);
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

    this.statusEffectsBar.redraw();
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
  }
}
