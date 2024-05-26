import { AnimationGameObject } from '../../game-engine/game-objects/AnimationGameObject'
import { Player } from '../player/Player'
import { ILand } from './ILand'

export class DustLand extends AnimationGameObject implements ILand {
    private velocity: [number, number]
    constructor() {
        super(['Land', 'Dust'])
        this.velocity = [0, 0]
    }
    onJumped(player: Player): void {
        this.requestMultipleAnimation(1, 5)
    }
    randomizeBuff(): void {}
    move(deltaTime: number): void {
        this.position[0] += this.velocity[0] * deltaTime
        this.position[1] += this.velocity[1] * deltaTime
    }
}
