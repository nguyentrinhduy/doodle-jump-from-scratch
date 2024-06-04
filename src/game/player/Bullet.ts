import { BulletSprite } from '../constants/ResourcePath'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Sprite } from '../../game-engine/resource-factory/Sprite'
import { Position } from '../../game-engine/game-objects/Position'
import { BULLET_DEPTH } from '../constants/Depths'

export class Bullet extends ImageGameObject {
    private velocity: Position
    constructor(position: Position, velocity: Position) {
        super(BulletSprite)
        this.setPosition(position)
        this.velocity = new Position(0, 0)
        this.velocity.set(velocity)
        this.depth = BULLET_DEPTH
    }
    move(deltaTime: number) {
        this.setPositionX(this.velocity.getX() * deltaTime)
        this.setPositionY(this.velocity.getY() * deltaTime)
    }
}
