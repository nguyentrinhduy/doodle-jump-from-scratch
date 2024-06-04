import { AnimationGameObject } from '../../game-engine/game-objects/AnimationGameObject'
import { Position } from '../../game-engine/game-objects/Position'
import { Buff } from '../buff/Buff'
import { DUST_LAND_DEPTH } from '../constants/Depths'
import {
    DUST_LAND_CRASHED_INDEX,
    DUST_LAND_FALL_VELOCITY,
    DUST_LAND_TOTAL_ANIMATION,
} from '../constants/Land'
import { DustLandSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { ILand } from './ILand'

export class DustLand extends AnimationGameObject implements ILand {
    private velocity: Position
    private buff: Buff | null
    constructor() {
        super(DustLandSprite)
        this.velocity = new Position(0, 0)
        this.scaleSize(2)
        this.buff = null
        this.depth = DUST_LAND_DEPTH
    }
    public onJumped(player: Player): void {
        this.requestMultipleAnimation(DUST_LAND_CRASHED_INDEX, DUST_LAND_TOTAL_ANIMATION - 1)
        this.velocity.set(DUST_LAND_FALL_VELOCITY)
        this.scaleSize(2)
    }
    public randomizeBuff(): Buff | null {
        return this.buff
    }

    public move(deltaTime: number): void {
        this.position.setX(this.position.getX() + this.velocity.getX() * deltaTime)
        this.position.setY(this.position.getY() + this.velocity.getY() * deltaTime)
        this.update(deltaTime)
    }
}
