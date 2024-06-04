import { Camera } from '../camera/Camera'
import { KeyboardInput } from '../input-handler/KeyboardInput'
import { MouseInput } from '../input-handler/MouseInput'
import { ISceneContext } from './ISceneContext'

export abstract class Scene {
    protected context: ISceneContext
    protected mouseInput: MouseInput
    protected keyboardInput: KeyboardInput
    protected camera: Camera
    public constructor() {
        this.mouseInput = new MouseInput()
        this.keyboardInput = new KeyboardInput()
        this.camera = new Camera()
    }
    public setContext(context: ISceneContext) {
        this.context = context
    }

    public abstract update(deltaTime: number): void

    public abstract render(): void

    public abstract processInput(): void
}
