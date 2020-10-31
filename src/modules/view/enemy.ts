const ENEMY_SIZE = 50;
export class Enemy extends PIXI.Graphics {
  textObject: PIXI.Text;
  constructor(private selector: string) {
    super();
    this.textObject = new PIXI.Text(selector, {fill: 0xffffff});
    this.addChild(this.textObject);
    this.redraw();
  }

  redraw() {
    this.clear();
    // this.lineStyle
    this.beginFill(0x444444);
    this.drawCircle(0, 0, ENEMY_SIZE);
    this.endFill();

    this.textObject.anchor.x = 0.5;
    this.textObject.anchor.y = 0.5;
    this.textObject.position.set(0, 0); //this.width / 2, this.height / 2);
    console.log(this.textObject.getGlobalPosition());
    console.log(this.textObject.position);
  }
}
