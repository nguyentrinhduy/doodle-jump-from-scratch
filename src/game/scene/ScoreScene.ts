import { ISceneContext } from '../../game-engine/scene-handler/ISceneContext'
import { Scene } from '../../game-engine/scene-handler/Scene'

export class ScoreScene extends Scene {
    protected context: ISceneContext
    render(): void {}

    update(deltaTime: number): void {}

    processInput(): void {}
}
