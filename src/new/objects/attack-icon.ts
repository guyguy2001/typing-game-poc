import Attack from '../attack';
import textureManager from '../texture-manager';
import AttackIconCooldown from './attack-cooldown';

export const ICON_SIZE = 60;
// const TEXT_POSITION = ICON_SIZE / 8;
import { renderer } from '../main-view';

function p<T>(t: T) {
  console.log(t);
  return t;
}
export default class AttackIcon extends PIXI.Sprite {
  textObject: PIXI.Text;
  cooldownObject: AttackIconCooldown;
  public _width = ICON_SIZE;

  constructor(public attack: Attack) {
    super(p(textureManager.getTexture(attack.icon)));
    console.log(this.texture);
    this.textObject = new PIXI.Text(attack.key, { fill: 0xffffff });
    this.textObject.position.set(ICON_SIZE / 8, 0);
    this.addChild(this.textObject);

    this.cooldownObject = new AttackIconCooldown(attack);
    // this.cooldownObject.position.set(this.position.x, this.position.y);
    this.cooldownObject.redraw();
    this.addChild(this.cooldownObject);

    this.width = ICON_SIZE;
    this.height = ICON_SIZE;

    // setTimeout(() => {
    //   this.parent.addChild(mask as PIXI.Sprite);
    // }, 1000);
    this.redraw();
  }

  redraw() {
    this.cooldownObject.redraw();
    // (this.mask as PIXI.Sprite).texture =
  }
}
