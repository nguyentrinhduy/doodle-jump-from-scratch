import { AnimationGameObject } from '../../game-engine/game-objects/AnimationGameObject'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Player } from '../player/Player'

export enum BuffType {
    None = 0,
    Propeller = 1,
    Jetpack = 2,
    Spring = 3,
}
export abstract class Buff extends AnimationGameObject {
    constructor(Scene: string[]) {
        super(Scene)
        this.scaleSize(2)
        this.requestSingleAnimation(0)
    }
    abstract clone(): Buff
    abstract onReceived(player: Player): void
}
