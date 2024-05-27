import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { ISceneContext } from '../scene-handler/ISceneContext'
import { Scene } from '../scene-handler/Scene'

export class MainGame implements ISceneContext {
    private spriteFactory: SpriteFactory
    private lastTime: number
    private currentScene: Scene
    transitionTo(newScene: Scene): void {
        this.currentScene = newScene
        this.currentScene.setContext(this)
    }
    constructor() {
        this.spriteFactory = SpriteFactory.getInstance()
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
        this.currentScene.update(deltaTime)
        this.currentScene.render()
        this.lastTime = currentTime
        requestAnimationFrame(this.loop)
    }
}
