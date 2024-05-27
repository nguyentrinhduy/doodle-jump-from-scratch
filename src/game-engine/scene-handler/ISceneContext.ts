import { Scene } from './Scene'

export interface ISceneContext {
    transitionTo(newScene: Scene): void
}
