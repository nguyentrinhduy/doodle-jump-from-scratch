import { Sprite } from '../resource-factory/Sprite'
import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { Animator } from './Animator'
import { Camera } from '../camera/Camera'

export abstract class GameObject {
    protected size: [number, number] // [width, height]
    protected position: [number, number] // left top position of the rectangle
    protected visible: boolean
    constructor() {
        this.visible = true
    }
    setSize(size: [number, number]) {
        this.size = size
    }
    setWidth(width: number) {
        this.size[1] = width
    }
    setHeight(height: number) {
        this.size[1] = height
    }
    setPosition(position: [number, number]) {
        this.position = position
    }
    setPositionX(x: number) {
        this.position[0] = x
    }
    setPositionY(y: number) {
        this.position[1] = y
    }
    scaleSize(scale: number) {
        this.size[0] *= scale
        this.size[1] *= scale
    }
    getSize() {
        return this.size
    }
    getWidth() {
        return this.size[0]
    }
    getHeight() {
        return this.size[1]
    }
    getPosition() {
        return this.position
    }
    getPositionX() {
        return this.position[0]
    }
    getPositionY() {
        return this.position[1]
    }
    isVisible() {
        return this.visible
    }
    setVisible(visible: boolean) {
        this.visible = visible
    }
    containsPoint(point: [number, number]) {
        return (
            this.position[0] <= point[0] &&
            point[0] <= this.position[0] + this.size[0] &&
            this.position[1] <= point[1] &&
            point[1] <= this.position[1] + this.size[1]
        )
    }
    collides(other: GameObject): boolean {
        return (
            this.containsPoint(other.position) ||
            this.containsPoint([other.position[0], other.position[1] + other.size[1]]) ||
            this.containsPoint([other.position[0] + other.size[0], other.position[1]]) ||
            this.containsPoint([
                other.position[0] + other.size[0],
                other.position[1] + other.size[1],
            ])
        )
    }
    standOn(other: GameObject): boolean {
        return (
            other.containsPoint([this.position[0], this.position[1] + this.size[1]]) ||
            other.containsPoint([this.position[0] + this.size[0], this.position[1] + this.size[1]])
        )
    }
    abstract display(cameraOffset: [number, number]): void
}
