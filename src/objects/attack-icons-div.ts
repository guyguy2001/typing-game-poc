import Attack from '../game/attack';
import AttackIcon from './attack-icon';

export default class AttackIconsDiv extends PIXI.Graphics {
  icons: AttackIcon[] = [];
  public addAbilityIcon(attack: Attack) {
    const icon = new AttackIcon(attack);
    icon.position.set(icon._width * 1.25 * this.icons.length + 200, 0);
    this.addChild(icon);

    icon.redraw();

    this.icons.push(icon);
  }

  redraw() {
    this.icons.forEach(icon => icon.redraw());
  }
}
