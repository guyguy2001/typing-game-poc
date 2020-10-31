const REGULAR_FILL = 0x444444;
const SELECTED_FILL = 0x329e2e;

const ENEMY_SIZE = 50;
export default class Enemy extends PIXI.Graphics {
  textObject: PIXI.Text;
  _fill: number = REGULAR_FILL;

  constructor(public selector: string) {
    super();
    this.textObject = new PIXI.Text(selector, { fill: 0xffffff });
    this.addChild(this.textObject);
    this.redraw();
  }

  redraw() {
    this.clear();
    // this.lineStyle
    this.beginFill(this._fill);
    this.drawCircle(0, 0, ENEMY_SIZE);
    this.endFill();

    this.textObject.anchor.x = 0.5;
    this.textObject.anchor.y = 0.5;
    this.textObject.position.set(0, 0); //this.width / 2, this.height / 2);
    console.log(this.textObject.getGlobalPosition());
    console.log(this.textObject.position);
  }

  onSelected() {
    this._fill = SELECTED_FILL;
    this.redraw();
  }

  onDeselcted() {
    this._fill = REGULAR_FILL;
    this.redraw();
  }
}
