import { Sprite } from '../resource-factory/Sprite'
import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { Camera } from '../camera/Camera'
import { GameObject } from './GameObject'
import { Position } from './Position'

export class ImageGameObject extends GameObject {
    protected sprite: Sprite
    constructor(spriteName: string[]) {
        super()
        this.sprite = SpriteFactory.getInstance().getSprite(spriteName)
        this.size.set(this.sprite.getNaturalSize())
    }
    protected setSprite(spriteName: string[]) {
        this.sprite = SpriteFactory.getInstance().getSprite(spriteName)
    }
    render(camera: Camera = new Camera()) {
        if (!this.visible) return
        this.sprite.render(
            new Position(this.getPositionX() - camera.getOffsetX(), this.getPositionY() - camera.getOffsetY()),
            this.size
        )
    }
}
