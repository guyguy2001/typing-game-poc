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
import Attack from './attack';
import AttackIconsDiv from './objects/attack-icons-div';
import { Curse } from './attack';
import textureManager from './texture-manager';

export const renderer = PIXI.autoDetectRenderer(
  window.innerWidth,
  window.innerHeight,
  Parameters.PIXI_APPLICATION_SETTINGS
);

export class MainView {
  private _pixiStage: Container;
  private _pixiRenderer: WebGLRenderer | CanvasRenderer;

  private state: State;
  private keyboardManager: KeyboardManager;
  private iconDiv: AttackIconsDiv;
  private textureManager = textureManager;

  consumers: InputConsumer[];
  /**
   * @inheritDoc
   */
  constructor() {
    this.state = new State();
    this.keyboardManager = new KeyboardManager(this.state);

    this._pixiRenderer = renderer;
    document.body.appendChild(this._pixiRenderer.view);
    this._pixiStage = new PIXI.Container();

    this.iconDiv = new AttackIconsDiv();
    this.iconDiv.position.set(
      this._pixiRenderer.width / 5,
      this._pixiRenderer.height * 0.8
    );
    this._pixiStage.addChild(this.iconDiv);
    this.state.abilitiesManager.addGameListener('onAttackAdded', attack =>
      this.iconDiv.addAbilityIcon(attack)
    );
    this.consumers = [
      new EnemySelector(this.state),
      this.state.abilitiesManager,
    ];

    this.textureManager.loadTexture('firebolt', 'assets/FireBolt.png');
    this.textureManager.loadTexture('death-coil', 'assets/DeathCoil.png');

    this.state.abilitiesManager.addAbility(new Attack('j'));
    this.state.abilitiesManager.addAbility(new Curse('k'));

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
    const selectorIndex = Math.floor(
      Math.random() * this.state.selectors.length
    );
    const enemy = new Enemy(this.state.selectors[selectorIndex]);
    this.state.selectors.splice(selectorIndex, 1);
    enemy.position.set(
      Math.random() * this._pixiRenderer.width,
      Math.random() * this._pixiRenderer.height
    );
    this._pixiStage.addChild(enemy);
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
  protected createPixiApplication(): void {}

  /**
   * Starts the rendering process of the PIXI Application
   */
  protected startRendering(): void {
    let animate = () => {
      this._pixiRenderer.render(this._pixiStage);
      this.iconDiv.redraw();
      requestAnimationFrame(animate);
    };

    // run the render loop
    animate();
  }
}
