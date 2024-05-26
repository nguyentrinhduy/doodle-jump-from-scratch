import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../game/constants/WindowBounds'
import { GameObject } from '../game-objects/GameObject'

export class Camera {
    private offset: [number, number] // locate at the left top
    private size: [number, number]
    private focusedObject: GameObject | null

    // bounds for when the focused object exceeds the bound, the camera itself will follow
    private topBound: number
    private bottomBound: number
    private leftBound: number
    private rightBound: number
    constructor() {
        this.offset = [0, 0]
        this.size = [WINDOW_WIDTH, WINDOW_HEIGHT]
        this.focusedObject = null
        this.topBound = -Infinity
        this.bottomBound = Infinity
        this.leftBound = -Infinity
        this.rightBound = Infinity
    }

    isOutOfRange(object: GameObject) {
        return (
            this.isOutOfTopRange(object) &&
            this.isOutOfBottomRange(object) &&
            this.isOutOfLeftRange(object) &&
            this.isOutOfRightRange(object)
        )
    }

    isOutOfTopRange(object: GameObject) {
        let objectPosition = object.getPosition()
        let objectSize = object.getSize()
        return objectPosition[1] + objectSize[1] < this.offset[1]
    }

    isOutOfBottomRange(object: GameObject) {
        let objectPosition = object.getPosition()
        return objectPosition[1] > this.offset[1] + this.size[1]
    }

    isOutOfLeftRange(object: GameObject) {
        let objectPosition = object.getPosition()
        let objectSize = object.getSize()
        return objectPosition[0] + objectSize[0] < this.offset[0]
    }

    isOutOfRightRange(object: GameObject) {
        let objectPosition = object.getPosition()
        return objectPosition[0] > this.offset[0] + this.size[0]
    }

    update() {
        if (!this.focusedObject) return

        // handle for topBound
        if (this.focusedObject.getPositionY() <= this.offset[1] + this.topBound) {
            this.offset[1] = this.focusedObject.getPositionY() - this.topBound
        }

        // handle for bottomBound
        if (this.focusedObject.getPositionY() >= this.offset[1] + this.bottomBound) {
            this.offset[1] = this.focusedObject.getPositionY() - this.bottomBound
        }

        // handle for leftBound
        if (this.focusedObject.getPositionX() <= this.offset[0] + this.leftBound) {
            this.offset[0] = this.focusedObject.getPositionX() - this.leftBound
        }

        // handle for rightBound
        if (this.focusedObject.getPositionX() >= this.offset[0] + this.rightBound) {
            this.offset[0] = this.focusedObject.getPositionX() - this.rightBound
        }
    }

    setTopBound(topBound: number) {
        this.topBound = topBound
    }

    setBottomBound(bottomBound: number) {
        this.bottomBound = bottomBound
    }

    setLeftBound(leftBound: number) {
        this.leftBound = leftBound
    }

    setRightBound(rightBound: number) {
        this.rightBound = rightBound
    }

    focusOn(object: GameObject) {
        this.focusedObject = object
    }

    getOffset() {
        return this.offset
    }

    getOffsetX() {
        return this.offset[0]
    }

    getOffsetY() {
        return this.offset[1]
    }

    setOffsetX(x: number) {
        this.offset[0] = x
    }

    setOffsetY(y: number) {
        this.offset[1] = y
    }

    setOffset(offset: [number, number]) {
        this.offset = offset
    }
}
