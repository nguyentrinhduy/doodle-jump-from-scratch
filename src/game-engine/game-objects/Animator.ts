import { Sprite } from '../resource-factory/Sprite'
import { Position } from './Position'
import { Size } from './Size'

export class Animator {
    private currentAnimation: number
    private sprites: Sprite[]
    private timeDifference: number
    private animationTimeLeft: number
    private range: [number, number] | null
    constructor(sprites: Sprite[]) {
        this.range = null
        this.sprites = sprites
        this.currentAnimation = 0
        this.timeDifference = 0
        this.animationTimeLeft = 0
    }
    setTimeDifference(time: number) {
        this.timeDifference = time
    }
    setRangeAnimation(range: [number, number] | null) {
        this.range = range
    }
    setCurrenAnimation(currentAnimation: number) {
        this.currentAnimation = currentAnimation
    }
    update(time: number) {
        if (this.range && this.currentAnimation == this.range[1]) return
        if (this.timeDifference == 0) return
        this.animationTimeLeft -= time
        if (this.animationTimeLeft <= 0) {
            this.animationTimeLeft = this.timeDifference
            this.currentAnimation++
            if (this.currentAnimation >= this.sprites.length) {
                this.currentAnimation = 0
            }
        }
    }
    getNaturalSize() {
        return this.sprites[this.currentAnimation].getNaturalSize()
    }
    render(position: Position, size: Size) {
        this.sprites[this.currentAnimation].render(position, size)
    }
    clone() {
        let newAnimator = new Animator(this.sprites)
        newAnimator.currentAnimation = this.currentAnimation
        newAnimator.timeDifference = this.timeDifference
        newAnimator.animationTimeLeft = this.animationTimeLeft
        if (this.range) {
            newAnimator.range = [...this.range]
        } else {
            newAnimator.range = null
        }
        return newAnimator
    }
}
