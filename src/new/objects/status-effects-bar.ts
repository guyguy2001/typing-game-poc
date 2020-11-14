import Attack from 'new/attack';
import AttackIcon from './attack-icon';

export default class StatusEffectsBar extends PIXI.Graphics {
  icons: StatusEffectIcon[] = [];
  public addAbilityIcon(attack: Attack) {
    const icon = new AttackIcon(attack);
    console.log(this.icons);
    console.log(icon._width * 1.25 * this.icons.length + 200);
    icon.position.set(icon._width * 1.25 * this.icons.length + 200, 0);
    this.addChild(icon);

    icon.redraw();

    this.icons.push(icon);
  }

  redraw() {
    this.icons.forEach(icon => icon.redraw());
  }
}
