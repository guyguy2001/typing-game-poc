/*
 * Created By Geani Pocroianu on 11/8/19 9:04 PM
 */

import Container = PIXI.Container;
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;

import { Parameters } from '../static/parameters';

import Player from './objects/player';
import Enemy from './objects/enemy';
import State from './state';
import KeyboardManager from './keyboard-manager';

import EnemySelector from './enemy-selector';
import InputConsumer from './input-consumer';
import AbilityManager from './abilities-manager';
import Attack from './attack';

export class MainView {
  private _pixiStage!: Container;
  private _pixiRenderer!: WebGLRenderer | CanvasRenderer;

  private state: State;
  private keyboardManager: KeyboardManager;

  consumers: InputConsumer[];
  /**
   * @inheritDoc
   */
  constructor() {
    this.state = new State();
    this.keyboardManager = new KeyboardManager(this.state);
    this.consumers = [
      new EnemySelector(this.state),
      this.state.abilitiesManager
    ]
    this.state.abilitiesManager.addAbility(new Attack("j"))

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

    document.addEventListener('keydown', e => this.onKeyDown(e));
  }
  
  private spawnEnemy() {
    console.log(this.state);
    const selectorIndex = Math.floor(Math.random() * this.state.selectors.length);
    const enemy = new Enemy(this.state.selectors[selectorIndex]);
    this.state.selectors.splice(selectorIndex, 1);
    enemy.position.set(
      Math.random() * this._pixiRenderer.width,
      Math.random() * this._pixiRenderer.height
    );
    this._pixiStage.addChild(enemy);
    console.log(this.state);
    this.state.enemyManager.addEnemy(enemy);
  }

  private onKeyDown(e: KeyboardEvent) {
    for (const consumer of this.consumers) {
      if (consumer.onInput(e.key)) {
        break;
      }
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
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
