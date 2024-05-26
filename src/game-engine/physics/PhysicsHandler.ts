import { GRAVITY_ACCELERATION } from '../../game/constants/Player'
import { GameObject } from '../game-objects/GameObject'

export class PhysicsHandler {
    private gravity_acceleration: [number, number]
    private velocity: [number, number]
    private isAppliedPhysics: boolean
    private AppliedObject: GameObject | null
    constructor(object: GameObject) {
        this.AppliedObject = object
        this.gravity_acceleration = [...GRAVITY_ACCELERATION]
        this.isAppliedPhysics = true
    }

    setEnable(isAppliedPhysics: boolean) {
        this.isAppliedPhysics = isAppliedPhysics
    }

    isEnabled() {
        return this.isAppliedPhysics
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
        if (!this.isAppliedPhysics) return
        this.velocity[0] += this.gravity_acceleration[0] * deltaTime
        this.velocity[1] += this.gravity_acceleration[1] * deltaTime
    }
}
