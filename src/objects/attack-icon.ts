import Attack from '../attack';
import textureManager from '../texture-manager';
import Cooldown from './cooldown';

export const ICON_SIZE = 60;

export default class AttackIcon extends PIXI.Sprite {
  textObject: PIXI.Text;
  cooldownObject: Cooldown;
  public _width = ICON_SIZE;

  constructor(public attack: Attack) {
    super(textureManager.getTexture(attack.icon));

    this.textObject = new PIXI.Text(attack.key, { fill: 0xffffff });
    this.textObject.position.set(ICON_SIZE / 8, 0);
    this.addChild(this.textObject);

    this.cooldownObject = new Cooldown(ICON_SIZE);
    this.addChild(this.cooldownObject);

    this.width = ICON_SIZE;
    this.height = ICON_SIZE;

    this.redraw();
  }

  redraw() {
    const cooldownPart = this.attack.canAttack
      ? 0
      : (this.attack.cooldown -
          (new Date().getTime() - this.attack.lastAttackedTime!)) /
        this.attack.cooldown;
    this.cooldownObject.redraw(cooldownPart);
  }
}
