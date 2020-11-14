import StatusEffect from '../status-effect';
import textureManager from '../texture-manager';
import Cooldown from './cooldown';

export const ICON_SIZE = 60;

export default class AttackIcon extends PIXI.Sprite {
  textObject: PIXI.Text;
  cooldownObject: Cooldown;
  public _width = ICON_SIZE;

  constructor(public statusEffect: StatusEffect) {
    super(textureManager.getTexture(statusEffect.icon));

    this.textObject = new PIXI.Text(statusEffect.key, { fill: 0xffffff });
    this.textObject.position.set(ICON_SIZE / 8, 0);
    this.addChild(this.textObject);

    this.cooldownObject = new Cooldown(ICON_SIZE);
    this.addChild(this.cooldownObject);

    this.width = ICON_SIZE;
    this.height = ICON_SIZE;

    this.redraw();
  }

  redraw() {
    const cooldownPart =
      (this.statusEffect.cooldown -
        (new Date().getTime() - this.statusEffect.lastAttackedTime!)) /
      this.statusEffect.cooldown;
    this.cooldownObject.redraw(cooldownPart);
  }
}
