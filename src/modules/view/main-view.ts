/*
 * Created By Geani Pocroianu on 11/8/19 9:04 PM
 */

import View = puremvc.View;
import Container = PIXI.Container;
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;
import { Parameters } from '../static/parameters';
import { SpineAnimationMediator } from '../mediators/spine-animation-mediator';
import { SpineAnimationUiComponent } from '../ui-components/spine-animation-ui-component';
import { MediatorNames } from '../static/names';

import Player from './player';
import Enemy from './enemy';
import State from './state';
import KeyboardManager from './keyboard-manager';

export class MainView extends View {
  private _pixiStage!: Container;
  private _pixiRenderer!: WebGLRenderer | CanvasRenderer;

  private state: State;
  private keyboardManager: KeyboardManager;

  /**
   *
   * @param key
   */
  static getInstance(key: string): MainView {
    if (!View.instanceMap[key]) {
      View.instanceMap[key] = new MainView(key);
    }
    return View.instanceMap[key] as MainView;
  }

  /**
   * @inheritDoc
   */
  initializeView(): void {
    super.initializeView();
    this.createPixiApplication();
    this.registerMediators();
    this.initializeGame();
    this.spawnEnemy();
    this.spawnEnemy();
    this.spawnEnemy();
    this.startRendering();
  }

  protected registerMediators(): void {
    let spineAnimationUiComponent: Container = new SpineAnimationUiComponent();
    this.registerMediator(
      new SpineAnimationMediator(
        MediatorNames.SPINE_ANIMATION_MEDIATOR,
        spineAnimationUiComponent
      )
    );
    this.addUiComponent(spineAnimationUiComponent);
  }

  protected addUiComponent(uiComponent: Container): void {
    this._pixiStage.addChild(uiComponent);
  }

  private initializeGame() {
    this.state = new State();
    this.keyboardManager = new KeyboardManager(this.state);

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
        this.state.isSelecting = true;
        break;
      case 'start-select':
        this.state.isSelecting = true;
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
