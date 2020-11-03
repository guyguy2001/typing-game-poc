const REGULAR_HEALTHY_FILL = 0x880000;
const REGULAR_BACKGROUND_FILL = 0x444444;
const SELECTED_FILL = 0x329e2e;

const HEALTHBAR_HEIGHT = 10;

export default class HealthBar extends PIXI.Graphics {
  foregroundFill: number = REGULAR_HEALTHY_FILL;
  backgroundFill: number = REGULAR_BACKGROUND_FILL;
  private _hp: number;

  public set hp(value: number) {
      this._hp = value;
      this.redraw();
  }

  public get hp() {
      return this._hp;
  }

  constructor(private _width: number, private maxHp: number) {
    super();
    this._hp = this.maxHp;
    this.redraw();
  }

  redraw() {
    this.clear();
    this.beginFill(this.backgroundFill);
    console.log({width: this._width})
    this.drawRect(0, 0, this._width, HEALTHBAR_HEIGHT);
    this.beginFill(this.foregroundFill);
    this.drawRect(0, 0, this._width * this.hp / this.maxHp, HEALTHBAR_HEIGHT);
    this.endFill();
  }

//   onSelected() {
//     this._fill = SELECTED_FILL;
//     this.redraw();
//   }

//   onDeselcted() {
//     console.log("onDeselected")
//     this._fill = REGULAR_FILL;
//     this.redraw();
//   }
}
