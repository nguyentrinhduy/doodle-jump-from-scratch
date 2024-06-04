import { Sprite } from '../resource-factory/Sprite'
import { SpriteFactory } from '../resource-factory/SpriteFactory'
import { Animator } from './Animator'
import { Camera } from '../camera/Camera'
import { Size } from './Size'
import { Position } from './Position'

export abstract class GameObject {
    protected size: Size 
    protected position: Position
    protected visible: boolean
    protected depth: number
    public constructor() {
        this.size = new Size(0, 0)
        this.position = new Position(0, 0)
        this.visible = true
        this.depth = 0
    }
    public setSize(size: Size): void {
        this.size.set(size)
    }
    public setWidth(width: number): void {
        this.size.setWidth(width)
    }
    public setHeight(height: number): void {
        this.size.setHeight(height)
    }
    public setPosition(position: Position): void {
        this.position.set(position)
    }
    public setPositionX(x: number): void {
        this.position.setX(x)
    }
    public setPositionY(y: number): void {
        this.position.setY(y)
    }
    public scaleSize(scale: number): void {
        let width = this.size.getWidth()
        let height = this.size.getHeight()
        width *= scale
        height *= scale
        this.size.setWidth(width)
        this.size.setHeight(height)
    }
    public getSize(): Size {
        return this.size
    }
    public getWidth(): number {
        return this.size.getWidth()
    }
    public getHeight(): number {
        return this.size.getHeight()
    }
    public getPosition() {
        return this.position
    }
    public getPositionX(): number {
        return this.position.getX()
    }
    public getPositionY(): number {
        return this.position.getY()
    }
    public isVisible(): boolean {
        return this.visible
    }
    public setVisible(visible: boolean): void {
        this.visible = visible
    }
    public getDepth(): number {
        return this.depth
    }
    public setDepth(depth: number) {
        this.depth = depth
    }
    public containsPoint(point: Position): boolean {
        return (
            this.position.getX() <= point.getX() &&
            point.getX() <= this.position.getX() + this.size.getWidth() &&
            this.position.getY() <= point.getY() &&
            point.getY() <= this.position.getY() + this.size.getHeight()
        )
    }
    public collides(other: GameObject): boolean {
        return (
            this.containsPoint(other.position) ||
            this.containsPoint(new Position(other.getPositionX(), other.getPositionX() + other.getHeight())) ||
            this.containsPoint(new Position(other.getPositionX() + other.getWidth(), other.getPositionY())) ||
            this.containsPoint(new Position(
                other.getPositionX() + other.getWidth(),
                other.getPositionY() + other.getHeight(),
            ))
        )
    }
    public standOn(other: GameObject): boolean {
        return (
            other.containsPoint(new Position(this.getPositionX(), this.getPositionY() + this.getHeight())) ||
            other.containsPoint(new Position(this.getPositionX() + this.getWidth(), this.getPositionY() + this.getHeight()))
        )
    }
    abstract render(camera: Camera): void
}
