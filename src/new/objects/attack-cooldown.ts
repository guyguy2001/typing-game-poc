const FILL = 0x22000000;

const ICON_SIZE = 50;
// const TEXT_POSITION = ICON_SIZE / 8;

export default class AttackIcon extends PIXI.Graphics {
  _fill: number = FILL;

  constructor(public key: string) {
    super();
    this.redraw();
  }

  redraw() {
    this.clear();
    this.beginFill(this._fill);
    // this.drawShape();
    this.endFill();
  }

  static generateShape(cooldown: number) {
      const result = [
        new PIXI.Point(0, 0),
        new PIXI.Point(ICON_SIZE / 2, ICON_SIZE / 2),
      ]
      const angle = cooldown * Math.PI * 2;

      const side = this.getSideOfIntersection(angle);
      const intersectionPoint = this.intersection(angle);
      
      const sides = ['up', 'right', 'down', 'left'];
      const sideNumber = sides.indexOf(side);
      if (sideNumber === 0) {
          
      }

  }

  static intersection(angle: number) {
      // line: y = tan(angle)*x
      const tan = Math.tan(angle);
      const side = this.getSideOfIntersection(angle);
      if (side === "right") {
          return new PIXI.Point(0.5, -0.5 * tan);
      }
      if (side === "up") {
          return new PIXI.Point(0.5 * tan, -0.5);
      }
      if (side === "left") {
          return new PIXI.Point(-0.5, 0.5 * tan);
      }
      if (side === "down") {
          return new PIXI.Point(-0.5 * tan, -0.5);
      }
    throw new Error("Intersection failed to return a value!");
  }

  static getSideOfIntersection(angle: number) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // cos 45 degrees, i.e a diagonal hitting the corners
      const threshold = Math.cos(Math.PI / 4);
      // right
      if (cos >= threshold) {
        return "right";
      }
      // left
      if (cos <= -threshold) {
        return "left";
      }
      // right
      if (sin >= threshold) {
        return "up";
      }
      // left
      if (sin <= -threshold) {
        return "down";
      }
      throw new Error("getSideOfIntersection couldn't return any value!!!");
  }
}

