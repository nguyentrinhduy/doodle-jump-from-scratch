import { AnimationGameObject } from '../../game-engine/game-objects/AnimationGameObject'
import { DUST_LAND_CRASHED_INDEX, DUST_LAND_FALL_VELOCITY, DUST_LAND_TOTAL_ANIMATION } from '../constants/Land'
import { DustLandSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { ILand } from './ILand'

export class DustLand extends AnimationGameObject implements ILand {
    private velocity: [number, number]
    constructor() {
        super(DustLandSprite)
        this.velocity = [0, 0]
        this.scaleSize(2)
    }
    onJumped(player: Player): void {
        this.requestMultipleAnimation(DUST_LAND_CRASHED_INDEX, DUST_LAND_TOTAL_ANIMATION - 1)
        this.velocity = [...DUST_LAND_FALL_VELOCITY]
    }
    randomizeBuff(): void {}
    move(deltaTime: number): void {
        this.position[0] += this.velocity[0] * deltaTime
        this.position[1] += this.velocity[1] * deltaTime
    }
}
