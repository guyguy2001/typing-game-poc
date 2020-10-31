/*
 * Created By Geani Pocroianu on 11/8/19 9:04 PM
 */

import View = puremvc.View;
import Container = PIXI.Container;
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;
import {Parameters} from "../static/parameters";
import {SpineAnimationMediator} from "../mediators/spine-animation-mediator";
import {SpineAnimationUiComponent} from "../ui-components/spine-animation-ui-component";
import {MediatorNames} from "../static/names";
import {Player} from "./player";
import { Enemy } from "./enemy";

export class MainView extends View {

    private _pixiStage: Container;
    private _pixiRenderer: WebGLRenderer | CanvasRenderer;

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
        this.initializePlayer();
        this.spawnEnemy();
        this.startRendering();
    }

    protected registerMediators(): void {
        let spineAnimationUiComponent: Container = new SpineAnimationUiComponent();
        this.registerMediator(new SpineAnimationMediator(MediatorNames.SPINE_ANIMATION_MEDIATOR, spineAnimationUiComponent));
        this.addUiComponent(spineAnimationUiComponent);
    }

    protected addUiComponent(uiComponent: Container): void {
        this._pixiStage.addChild(uiComponent);
    }
    
    private initializePlayer() {
        const player = new Player();
        player.position.set(this._pixiRenderer.width / 2, this._pixiRenderer.height / 2);
        this._pixiStage.addChild(player);
    }
    
    private spawnEnemy() {
        const selectors = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const enemy = new Enemy(selectors[Math.floor(Math.random() * selectors.length)]);
        enemy.position.set(Math.random() * this._pixiRenderer.width, Math.random() * this._pixiRenderer.height);
        this._pixiStage.addChild(enemy);
    }

    /**
     * Creates the PIXI Application
     */
    protected createPixiApplication(): void {
        this._pixiRenderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, Parameters.PIXI_APPLICATION_SETTINGS);
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