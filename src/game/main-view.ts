/*
 * Created By Geani Pocroianu on 11/8/19 9:04 PM
 */

import Container = PIXI.Container;
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;

import { Parameters } from '../static/parameters';

import Player from '../objects/player';
import Enemy from '../objects/enemy';
import State from './state';

import CharacterEnemySelector from './character-enemy-selector';
import InputConsumer from '../infrastructure/input-consumer';
// import Attack, { Firebolt } from './attack';
import AttackIconsDiv from '../objects/attack-icons-div';
import { Curse, Firebolt } from './attack';
import textureManager from '../objects/texture-manager';  
import wordSelector from './word-selector';
import { getRandomWord } from '../utils/random-words';
import { WORD_SELECTION } from './config';

export const renderer = PIXI.autoDetectRenderer(
  window.innerWidth,
  window.innerHeight,
  Parameters.PIXI_APPLICATION_SETTINGS
);

export class MainView {
  private _pixiStage: Container;
  private _pixiRenderer: WebGLRenderer | CanvasRenderer;

  private state: State;
  private iconDiv: AttackIconsDiv;
  private textureManager = textureManager;

  consumers: InputConsumer[];
  /**
   * @inheritDoc
   */
  constructor() {
    this.state = new State();

    this._pixiRenderer = renderer;
    document.body.appendChild(this._pixiRenderer.view);
    this._pixiStage = new PIXI.Container();

    this.iconDiv = new AttackIconsDiv();
    this.iconDiv.position.set(
      this._pixiRenderer.width / 5,
      this._pixiRenderer.height * 0.8
    );
    this._pixiStage.addChild(this.iconDiv);
    this.state.abilitiesManager.emitter.on('onAttackAdded', attack => this.iconDiv.addAbilityIcon(attack));
    if (WORD_SELECTION) {
      this.consumers = [
        wordSelector,
      ];
    }
    else {
      this.consumers = [
        new CharacterEnemySelector(this.state),
        this.state.abilitiesManager,
      ];
    }

    this.textureManager.loadTexture('firebolt', 'assets/FireBolt.png');
    this.textureManager.loadTexture('death-coil', 'assets/DeathCoil.png');

    // TODO: Don't allow duplicate words
    this.state.abilitiesManager.addAbility(new Firebolt(WORD_SELECTION ?  getRandomWord() : "j"));
    this.state.abilitiesManager.addAbility(new Curse(WORD_SELECTION ? getRandomWord() : "k" ));
    
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
    // TODO: Don't allow duplicate words; probably refactor this into a class that you request a name from
    const selector = WORD_SELECTION ? getRandomWord() : this.state.selectors[selectorIndex];
    const enemy = new Enemy(selector);
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
      this.state.enemyManager.enemies.forEach(enemy => enemy.redraw());
      requestAnimationFrame(animate);
    };

    // run the render loop
    animate();
  }
}
