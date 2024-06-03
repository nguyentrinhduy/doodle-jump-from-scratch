import { GRAVITY_ACCELERATION } from '../../game/constants/Player'
import { GameObject } from '../game-objects/GameObject'

export class PhysicsHandler {
    private gravity_acceleration: [number, number]
    private velocity: [number, number]
    private isAppliedAcceleration: boolean
    private AppliedObject: GameObject | null
    constructor(object: GameObject) {
        this.AppliedObject = object
        this.gravity_acceleration = [...GRAVITY_ACCELERATION]
        this.isAppliedAcceleration = true
    }

    setEnable(isAppliedAcceleration: boolean) {
        this.isAppliedAcceleration = isAppliedAcceleration
    }

    isEnabled() {
        return this.isAppliedAcceleration
    }

    getVelocity() {
        return this.velocity
    }

    setVelocity(velocity: [number, number]) {
        this.velocity = velocity
    }

    getVelocityX() {
        return this.velocity[0]
    }

    setVelocityX(x: number) {
        this.velocity[0] = x
    }

    getVelocityY() {
        return this.velocity[1]
    }

    setVelocityY(y: number) {
        this.velocity[1] = y
    }

    update(deltaTime: number) {
        if (!this.AppliedObject) return
        let newPosition = this.AppliedObject.getPosition()
        newPosition[0] += this.velocity[0] * deltaTime
        newPosition[1] += this.velocity[1] * deltaTime
        if (!this.isAppliedAcceleration) return
        this.velocity[0] += this.gravity_acceleration[0] * deltaTime
        this.velocity[1] += this.gravity_acceleration[1] * deltaTime
    }

    clone(object: GameObject) {
        let newPhysicHandler = new PhysicsHandler(object)
        newPhysicHandler.velocity = [...this.velocity]
        newPhysicHandler.isAppliedAcceleration = this.isAppliedAcceleration
        return newPhysicHandler
    }
}
