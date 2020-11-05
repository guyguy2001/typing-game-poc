
const REGULAR_FILL = 0x444444;

const ICON_SIZE = 50;
// const TEXT_POSITION = ICON_SIZE / 8;

export default class AttackIcon extends PIXI.Graphics {
  textObject: PIXI.Text;
  _fill: number = REGULAR_FILL;

  constructor(public key: string) {
    super();
    this.textObject = new PIXI.Text(key, { fill: 0xffffff });
    this.textObject.position.set(ICON_SIZE / 8, 0)
    this.addChild(this.textObject);
    this.redraw();
  }

  redraw() {
    this.clear();
    this.beginFill(this._fill);
    this.drawRect(0, 0, ICON_SIZE, ICON_SIZE);
    this.endFill();

    // this.textObject.anchor.x = 0.5;
    // this.textObject.anchor.y = 0.5;
    this.textObject.position.set(0, 0); //this.width / 2, this.height / 2);
  }
}
