import { KeyboardInput } from '../input-handler/KeyboardInput'
import { MouseInput } from '../input-handler/MouseInput'
import { ISceneContext } from './ISceneContext'

export abstract class Scene {
    protected context: ISceneContext
    protected mouseInput: MouseInput
    protected keyboardInput: KeyboardInput

    constructor() {
        this.mouseInput = new MouseInput()
        this.keyboardInput = new KeyboardInput()
    }
    setContext(context: ISceneContext) {
        this.context = context
    }
    
    abstract update(deltaTime: number): void

    abstract render(): void

    abstract processInput(): void
    
}
