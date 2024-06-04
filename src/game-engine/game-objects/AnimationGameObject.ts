import { Animator } from './Animator'
import { Camera } from '../camera/Camera'
import { GameObject } from './GameObject'
import { TIME_DIFFERENCE_ANIMATION } from '../constant'
import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { Position } from './Position'

export class AnimationGameObject extends GameObject {
    private animator: Animator
    constructor(spritesName: string[]) {
        super()
        this.animator = new Animator(SpriteFactory.getInstance().getAnimationSprite(spritesName))
        this.size.set(this.animator.getNaturalSize())
    }
    requestLoopAnimation() {
        this.animator.setRangeAnimation(null)
        this.animator.setCurrenAnimation(0)
        this.animator.setTimeDifference(TIME_DIFFERENCE_ANIMATION)
    }
    requestSingleAnimation(target: number) {
        this.animator.setTimeDifference(0)
        this.animator.setCurrenAnimation(target)
        this.animator.setRangeAnimation(null)
        this.size.set(this.animator.getNaturalSize())
    }
    requestMultipleAnimation(from: number, to: number) {
        this.animator.setCurrenAnimation(from)
        this.animator.setRangeAnimation([from, to])
        this.size.set(this.animator.getNaturalSize())
    }
    update(deltaTime: number) {
        this.animator.update(deltaTime)
    }
    render(camera: Camera = new Camera()): void {
        if (!this.visible) return
        this.animator.render(
            new Position(
                this.getPositionX() - camera.getOffsetX(),
                this.getPositionY() - camera.getOffsetY()
            ),
            this.size
        )
    }
    cloneAnimator() {
        return this.animator.clone()
    }
    setAnimator(animator: Animator) {
        this.animator = animator
    }
}
