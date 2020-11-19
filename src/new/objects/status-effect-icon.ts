import StatusEffect from '../status-effect';
import textureManager from '../texture-manager';
import Cooldown from './cooldown';

export const STATUS_EFFECT_ICON_SIZE = 30;

export default class StatusEffectIcon extends PIXI.Sprite { // textObject: PIXI.Text;
   cooldownObject: Cooldown;
  public _width = STATUS_EFFECT_ICON_SIZE;

  constructor(public statusEffect: StatusEffect) {
    super(textureManager.getTexture(statusEffect.icon));

    // TODO: Stack numbers
    // this.textObject = new PIXI.Text(statusEffect.key, { fill: 0xffffff });
    // this.textObject.position.set(ICON_SIZE / 8, 0);
    // this.addChild(this.textObject);

    this.cooldownObject = new Cooldown(STATUS_EFFECT_ICON_SIZE);
    this.addChild(this.cooldownObject);

    this.width = STATUS_EFFECT_ICON_SIZE;
    this.height =STATUS_EFFECT_ICON_SIZE;

    this.redraw();
  }

  redraw() {
    const cooldownPart =
      this.statusEffect.appliedTime ? //TODO: Remove the ?: in a type safe manner
        Math.max(0, (this.statusEffect.timeout -
          (new Date().getTime() - this.statusEffect.appliedTime))) /
        this.statusEffect.timeout : 0;
    this.cooldownObject.redraw(cooldownPart);
  }
}
