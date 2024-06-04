import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../game/constants/Bounds'
import { GameObject } from '../game-objects/GameObject'
import { Position } from '../game-objects/Position'
import { Size } from '../game-objects/Size'

export class Camera {
    private offset: Position  // locate at the left top
    private size: Size
    private focusedObject: GameObject | null

    // bounds for when the focused object exceeds the bound, the camera itself will follow
    private topBound: number
    private bottomBound: number
    private leftBound: number
    private rightBound: number
    public constructor() {
        this.offset = new Position(0, 0)
        this.size = new Size(WINDOW_WIDTH, WINDOW_HEIGHT)
        this.focusedObject = null
        this.topBound = -Infinity
        this.bottomBound = Infinity
        this.leftBound = -Infinity
        this.rightBound = Infinity
    }

    public isOutOfRange(object: GameObject): boolean {
        return (
            this.isOutOfTopRange(object) &&
            this.isOutOfBottomRange(object) &&
            this.isOutOfLeftRange(object) &&
            this.isOutOfRightRange(object)
        )
    }

    public isOutOfTopRange(object: GameObject): boolean {
        return object.getPositionY() + object.getHeight() < this.offset.getY()
    }

    public isOutOfBottomRange(object: GameObject): boolean {
        return object.getPositionY() > this.offset.getY() + this.size.getHeight()
    }

    public isOutOfLeftRange(object: GameObject): boolean {
        return object.getPositionX() + object.getWidth() < this.offset.getX()
    }

    public isOutOfRightRange(object: GameObject): boolean {
        return object.getPositionX() > this.offset.getX() + this.size.getWidth()
    }

    public update(): void {
        if (!this.focusedObject) return

        // handle for topBound
        if (this.focusedObject.getPositionY() <= this.offset.getY() + this.topBound) {
            this.offset.setY(this.focusedObject.getPositionY() - this.topBound)
        }

        // handle for bottomBound
        if (this.focusedObject.getPositionY() >= this.offset.getY() + this.bottomBound) {
            this.offset.setY(this.focusedObject.getPositionY() - this.bottomBound)
        }

        // handle for leftBound
        if (this.focusedObject.getPositionX() <= this.offset.getX() + this.leftBound) {
            this.offset.setX(this.focusedObject.getPositionX() - this.leftBound)
        }

        // handle for rightBound
        if (this.focusedObject.getPositionX() >= this.offset.getX() + this.rightBound) {
            this.offset.setX(this.focusedObject.getPositionX() - this.rightBound)
        }
    }

    public setTopBound(topBound: number): void {
        this.topBound = topBound
    }

    public setBottomBound(bottomBound: number): void {
        this.bottomBound = bottomBound
    }

    public setLeftBound(leftBound: number): void {
        this.leftBound = leftBound
    }

    public setRightBound(rightBound: number): void {
        this.rightBound = rightBound
    }

    public focusOn(object: GameObject): void {
        this.focusedObject = object
    }

    public getOffset(): Position{
        return this.offset
    }

    public getOffsetX(): number {
        return this.offset.getX()
    }

    public getOffsetY(): number {
        return this.offset.getY()
    }

    public setOffsetX(x: number): void {
        this.offset.setX(x)
    }

    public setOffsetY(y: number): void {
        this.offset.setY(y)
    }

    public setOffset(offset: Position): void {
        this.offset = offset
    }
}
