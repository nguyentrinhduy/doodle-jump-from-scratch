import { Sprite } from '../resource-factory/Sprite'

export class Animator {
    private currentAnimation: number
    private sprites: Sprite[]
    private timeDifference: number
    private animationTimeLeft: number
    private timeDisplay: number
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

    setTimeDisplay(time: number) {
        this.timeDisplay = time
    }
    setRangeAnimation(range: [number, number] | null) {
        this.range = range
    }
    setCurrenAnimation(currentAnimation: number) {
        this.currentAnimation = currentAnimation
    }
    timePassed(time: number) {
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
    display(position: [number, number], size: [number, number]) {
        this.sprites[this.currentAnimation].display(position, size)
    }
    clone() {
        let newAnimator = new Animator(this.sprites)
        newAnimator.currentAnimation = this.currentAnimation
        newAnimator.timeDifference = this.timeDifference
        newAnimator.animationTimeLeft = this.animationTimeLeft
        newAnimator.timeDisplay = this.timeDisplay
        if (this.range) {
            newAnimator.range = [...this.range]
        } else {
            newAnimator.range = null
        }
        return newAnimator
    }
}
