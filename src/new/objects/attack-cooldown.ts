import Attack from '../attack';

const FILL = 0x000000;
import { ICON_SIZE } from './attack-icon';
import { renderer } from '../main-view';

export default class AttackIconCooldown extends PIXI.Graphics {
  _fill: number = FILL;
  public renderTexture = PIXI.RenderTexture.create(
    ICON_SIZE,
    ICON_SIZE,
    PIXI.SCALE_MODES.LINEAR
  );

  constructor(private attack: Attack) {
    super();
    this.redraw();
    const N = 16;
  }

  redraw() {
    this.clear();
    const cooldownPart = this.attack.canAttack
      ? 0
      : (this.attack.cooldown -
          (new Date().getTime() - this.attack.lastAttackedTime!)) /
        this.attack.cooldown;

    const shape = AttackIconCooldown.generateShape(cooldownPart).map(
      p => new PIXI.Point((p.x + 0.5) * ICON_SIZE, (p.y + 0.5) * ICON_SIZE)
    );

    this.beginFill(FILL, 0.4);
    this.drawPolygon(shape);
    this.endFill();
    renderer.render(this, this.renderTexture);
  }

  static generateShape(cooldown: number) {
    if (cooldown === 0) {
      return [];
    }
    const result = [new PIXI.Point(0, -0.5), new PIXI.Point(0, 0)];
    const angle = Math.PI * 2.5 - Math.PI * 2 * cooldown;

    const side = this.getSideOfIntersection(angle);
    result.push(this.intersection(angle));

    const sides = ['up', 'left', 'down', 'right'];
    const sideNumber = sides.indexOf(side);
    if (Math.cos(angle) < 0 || sideNumber !== 0) {
      if (sideNumber === 0 && Math.cos(angle) < 0) {
        result.push(new PIXI.Point(-0.5, -0.5));
      }
      if (sideNumber <= 1) {
        result.push(new PIXI.Point(-0.5, 0.5));
      }
      if (sideNumber <= 2) {
        result.push(new PIXI.Point(0.5, 0.5));
      }
      if (sideNumber <= 3) {
        result.push(new PIXI.Point(0.5, -0.5));
      }
    }
    result.push(new PIXI.Point(0, -0.5));
    return result;
  }

  static intersection(angle: number) {
    // line: y = tan(angle)*x
    const tan = Math.tan(angle);
    const side = this.getSideOfIntersection(angle);
    // y = tan(angle) * x
    // y = tan(angle) * 0.5 (negated because of pixi)
    if (side === 'right') {
      return new PIXI.Point(0.5, -0.5 * tan);
    }
    if (side === 'up') {
      // y = tan(angle) * x
      // 0.5 = tan(angle) * x
      return new PIXI.Point(0.5 / tan, -0.5);
    }
    if (side === 'left') {
      return new PIXI.Point(-0.5, 0.5 * tan);
    }
    if (side === 'down') {
      return new PIXI.Point(-0.5 / tan, 0.5);
    }
    throw new Error('Intersection failed to return a value!');
  }

  static getSideOfIntersection(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // cos 45 degrees, i.e a diagonal hitting the corners
    const threshold = Math.cos(Math.PI / 4);
    // right
    if (cos >= threshold) {
      return 'right';
    }
    // left
    if (cos <= -threshold) {
      return 'left';
    }
    // right
    if (sin >= threshold) {
      return 'up';
    }
    // left
    if (sin <= -threshold) {
      return 'down';
    }
    throw new Error("getSideOfIntersection couldn't return any value!!!");
  }
}
