import { Sprite } from '../resource-factory/Sprite'
import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { Camera } from '../camera/Camera'
import { GameObject } from './GameObject'

export class ImageGameObject extends GameObject {
    protected sprite: Sprite
    constructor(spriteName: string[]) {
        super()
        this.sprite = SpriteFactory.getInstance().getSprite(spriteName)
        this.size = this.sprite.getNaturalSize()
    }
    protected setSprite(spriteName: string[]) {
        this.sprite = SpriteFactory.getInstance().getSprite(spriteName)
    }
    render(cameraOffset: [number, number] = [0, 0]) {
        if (!this.visible) return
        this.sprite.render(
            [this.position[0] - cameraOffset[0], this.position[1] - cameraOffset[1]],
            this.size
        )
    }
}
