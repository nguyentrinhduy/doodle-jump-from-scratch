import { Animator } from './Animator'
import { Camera } from '../camera/Camera'
import { GameObject } from './GameObject'
import { TIME_DIFFERENCE_ANIMATION } from '../constant'
import { SpriteFactory } from '../resource-factory/SpriteFactory'

export class AnimationGameObject extends GameObject {
    private animator: Animator
    private spritesName: string[]
    constructor(spritesName: string[]) {
        super()
        this.spritesName = [...spritesName]
        this.animator = new Animator(SpriteFactory.getInstance().getAnimationSprite(spritesName))
        this.size = this.animator.getNaturalSize()
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
        this.size = this.animator.getNaturalSize()
    }
    requestMultipleAnimation(from: number, to: number) {
        this.animator.setCurrenAnimation(from)
        this.animator.setRangeAnimation([from, to])
        this.animator.setTimeDifference(TIME_DIFFERENCE_ANIMATION)
    }
    timePassed(deltaTime: number) {
        this.animator.timePassed(deltaTime)
    }
    display(cameraOffset: [number, number] = [0, 0]): void {
        if (!this.visible) return
        this.animator.display(
            [this.position[0] - cameraOffset[0], this.position[1] - cameraOffset[1]],
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
