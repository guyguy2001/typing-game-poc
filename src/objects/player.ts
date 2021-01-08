const PLAYER_SIZE = 50;

export default class Player extends PIXI.Graphics {
  constructor() {
    super();
    this.redraw();
  }

  redraw() {
    this.clear();
    // this.lineStyle

    this.beginFill(0xdd0000);
    this.drawRect(0, 0, PLAYER_SIZE, PLAYER_SIZE);
    this.endFill();
  }
}
