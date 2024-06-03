import { GRAVITY_ACCELERATION } from '../../game/constants/Player'
import { GameObject } from '../game-objects/GameObject'
import { Position } from '../game-objects/Position'

export class PhysicsHandler {
    private acceleration: Position
    private velocity: Position
    private isAppliedAcceleration: boolean
    private AppliedObject: GameObject | null
    public constructor(object: GameObject) {
        this.AppliedObject = object
        this.acceleration = GRAVITY_ACCELERATION
        this.isAppliedAcceleration = true
    }

    public setEnable(isAppliedAcceleration: boolean): void {
        this.isAppliedAcceleration = isAppliedAcceleration
    }

    public isEnabled(): boolean {
        return this.isAppliedAcceleration
    }

    public getVelocity(): Position {
        return this.velocity
    }

    public setVelocity(velocity: Position): void {
        this.velocity = velocity
    }

    public getVelocityX(): number {
        return this.velocity.getX()
    }

    public setVelocityX(x: number): void {
        this.velocity.setX(x)
    }

    public getVelocityY(): number {
        return this.velocity.getY()
    }

    public setVelocityY(y: number): void {
        this.velocity.setY(y)
    }

    public update(deltaTime: number): void {
        if (!this.AppliedObject) return
        let newPositionX = this.AppliedObject.getPositionX()
        let newPositionY = this.AppliedObject.getPositionY()
        this.AppliedObject.setPositionX(newPositionX + this.velocity.getX() * deltaTime)
        this.AppliedObject.setPositionY(newPositionY + this.velocity.getY() * deltaTime)
        if (!this.isAppliedAcceleration) return
        let newVelocityX = this.velocity.getX()
        let newVelocityY = this.velocity.getY()
        this.velocity.setX(newVelocityX + this.acceleration.getX() * deltaTime)
        this.velocity.setY(newVelocityY + this.acceleration.getY() * deltaTime)
    }

    public clone(object: GameObject): PhysicsHandler {
        let newPhysicsHandler = new PhysicsHandler(object)
        newPhysicsHandler.velocity = this.velocity
        newPhysicsHandler.isAppliedAcceleration = this.isAppliedAcceleration
        return newPhysicsHandler
    }
}
