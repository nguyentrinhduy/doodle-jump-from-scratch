import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { ISceneContext } from '../scene-handler/ISceneContext'
import { Scene } from '../scene-handler/Scene'

export class MainGame implements ISceneContext {
    private spriteFactory: SpriteFactory
    private lastTime: number
    private currentScene: Scene
    private lastDeltaTime: number
    transitionTo(newScene: Scene): void {
        this.currentScene = newScene
        this.currentScene.setContext(this)
        this.lastDeltaTime = Infinity
    }
    constructor() {
        this.spriteFactory = SpriteFactory.getInstance()
        this.spriteFactory.preloadSprites()
        this.loop = this.loop.bind(this)
    }
    run() {
        this.lastTime = window.performance.now()
        requestAnimationFrame(this.loop)
    }
    private loop() {
        let currentTime = window.performance.now()
        let deltaTime = currentTime - this.lastTime
        this.currentScene.processInput()
        while(this.lastDeltaTime > deltaTime){
            this.currentScene.update(deltaTime)
            this.lastDeltaTime -= deltaTime
        }
        this.currentScene.render()
        this.lastTime = currentTime
        requestAnimationFrame(this.loop)
    }
}
