import { BulletSprite } from '../constants/ResourcePath'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Sprite } from '../../game-engine/resource-factory/Sprite'

export class Bullet extends ImageGameObject {
    private velocity: [number, number]
    constructor(position: [number, number], velocity: [number, number]) {
        super(BulletSprite)
        this.position = position
        this.velocity = velocity
    }
}
