import Attack from '../game/attack';
import { WORD_SELECTION } from '../game/config';
import textureManager from '../objects/texture-manager';
import Cooldown from './cooldown';
import WordSelectorText from './word-selector-text';

export const ICON_SIZE = 60;

export default class AttackIcon extends PIXI.Sprite {
  textObject: PIXI.Text | WordSelectorText;
  cooldownObject: Cooldown;
  public _width = ICON_SIZE;

  constructor(public attack: Attack) {
    super(textureManager.getTexture(attack.icon));

    if (WORD_SELECTION) {
      this.textObject = new WordSelectorText(attack.key);
    } else {
      this.textObject = new PIXI.Text(attack.key, { fill: 0xffffff });
    }

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
