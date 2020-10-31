/*
 * Created By Geani Pocroianu on 11/8/19 9:04 PM
 */

import Container = PIXI.Container;
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;

import { Parameters } from '../static/parameters';

import Player from './objects/player';
import Enemy from './enemy';
import State from './state';
import KeyboardManager from './keyboard-manager';

export class MainView {
  private _pixiStage!: Container;
  private _pixiRenderer!: WebGLRenderer | CanvasRenderer;

  private state: State;
  private keyboardManager: KeyboardManager;

  /**
   * @inheritDoc
   */
  constructor() {
    this.state = new State();
    this.keyboardManager = new KeyboardManager(this.state);

    this.createPixiApplication();
    this.initializeGame();
    this.spawnEnemy();
    this.spawnEnemy();
    this.spawnEnemy();
    this.startRendering();
  }

  private initializeGame() {
    const player = new Player();
    this.state.player = player;
    player.position.set(
      this._pixiRenderer.width / 2,
      this._pixiRenderer.height / 2
    );
    this._pixiStage.addChild(player);

    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  private spawnEnemy() {
    const selectors = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const enemy = new Enemy(
      selectors[Math.floor(Math.random() * selectors.length)]
    );
    enemy.position.set(
      Math.random() * this._pixiRenderer.width,
      Math.random() * this._pixiRenderer.height
    );
    this._pixiStage.addChild(enemy);
    console.log(this.state);
    this.state.enemyManager.addEnemy(enemy);
  }

  private onKeyDown(e: KeyboardEvent) {
    const action = this.keyboardManager.handleKey(e.key);
    switch (action.action) {
      case 'select-enemy':
        this.state.selectedEnemy?.onDeselcted();
        action.enemy.onSelected();
        this.state.selectedEnemy = action.enemy;
        this.state.isSelecting = false;
        break;
      case 'start-select':
        this.state.isSelecting = true;
        break;
      case 'pause':
        break;
    }
  }

  /**
   * Creates the PIXI Application
   */
  protected createPixiApplication(): void {
    this._pixiRenderer = PIXI.autoDetectRenderer(
      window.innerWidth,
      window.innerHeight,
      Parameters.PIXI_APPLICATION_SETTINGS
    );
    document.body.appendChild(this._pixiRenderer.view);

    // create the root of the scene graph
    this._pixiStage = new PIXI.Container();
  }

  /**
   * Starts the rendering process of the PIXI Application
   */
  protected startRendering(): void {
    let animate = () => {
      this._pixiRenderer.render(this._pixiStage);
      requestAnimationFrame(animate);
    };

    // run the render loop
    animate();
  }
}
