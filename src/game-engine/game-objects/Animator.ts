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
        return this.sprites[0].getNaturalSize()
    }
    display(position: [number, number], velocity: [number, number]) {
        this.sprites[this.currentAnimation].display(position, velocity)
    }
}
