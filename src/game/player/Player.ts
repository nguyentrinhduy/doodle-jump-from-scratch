import { Direction, PlayerState } from './PlayerState'
import { Bullet } from './Bullet'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Sprite } from '../../game-engine/resource-factory/Sprite'
import {
    PlayerFallLeftSprite,
    PlayerFallRightSprite,
    PlayerJumpLeftSprite,
    PlayerJumpRightSprite,
} from '../constants/ResourcePath'
import {
    GRAVITY_ACCELERATION,
    PLAYER_START_POSITION,
    PLAYER_START_VELOCITY,
    PLAYER_VELOCITY_DIRECTION,
} from '../constants/Player'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/WindowBounds'
import { Camera } from '../../game-engine/camera/Camera'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { Buff } from '../buff/Buff'
import { PhysicsHandler } from '../../game-engine/physics/PhysicsHandler'

export class Player extends ImageGameObject {
    private score: number
    private state: PlayerState
    private direction: Direction
    private buffTime: number
    private buff: Buff | null
    private camera: Camera
    private physicsHandler: PhysicsHandler
    constructor() {
        super(PlayerJumpLeftSprite)
        this.position = [...PLAYER_START_POSITION]
        this.state = PlayerState.Jump
        this.direction = Direction.Left
        this.buffTime = 0
        this.scaleSize(1.5)
        this.physicsHandler = new PhysicsHandler(this)
        this.physicsHandler.setVelocity([...PLAYER_START_VELOCITY])
    }
    private resolveBuffPosition() {}

    autoFall(deltaTime: number) {
        this.physicsHandler.update(deltaTime)
        if (this.buffTime > 0) {
            this.buffTime -= deltaTime
            this.buffTime = 0
            this.buff = null
            this.setState(PlayerState.Jump)
            this.physicsHandler.setEnable(true)
        }
        if (this.physicsHandler.getVelocityY() >= 0) {
            if (this.state == PlayerState.Jump) {
                this.setState(PlayerState.Fall)
            }
        }
    }
    setVelocityDirection(direction: Direction) {
        this.direction = direction
        switch (direction) {
            case Direction.Left: {
                this.physicsHandler.setVelocityX(-PLAYER_VELOCITY_DIRECTION)
                break
            }
            default: {
                this.physicsHandler.setVelocityX(PLAYER_VELOCITY_DIRECTION)
                break
            }
        }
    }
    setVelocity(velocity: [number, number]) {
        this.physicsHandler.setVelocity(velocity)
    }
    setVelocityX(x: number) {
        this.physicsHandler.setVelocityX(x)
    }
    setVelocityY(y: number) {
        this.physicsHandler.setVelocityY(y)
    }
    applyGravity(isAppliedPhysics: boolean) {
        this.physicsHandler.setEnable(isAppliedPhysics)
    }
    getVelocity() {
        return this.physicsHandler.getVelocity()
    }
    getState() {
        return this.state
    }
    update(deltaTime: number) {
        this.autoFall(deltaTime)
    }
    setBuffTime(time: number) {
        this.buffTime = time
    }
    setBuff(buff: Buff) {
        this.buff = buff
    }
    setState(state: PlayerState, direction = this.direction) {
        this.state = state
        this.direction = direction
        switch (this.state) {
            case PlayerState.Fall: {
                if (direction == Direction.Right) this.setSprite(PlayerFallRightSprite)
                else this.setSprite(PlayerFallLeftSprite)
                break
            }
            case PlayerState.Jump: {
                if (direction == Direction.Left) this.setSprite(PlayerJumpLeftSprite)
                else this.setSprite(PlayerJumpRightSprite)
                break
            }
            case PlayerState.WearingJetpack: {
            }
            case PlayerState.WearingPropeller: {
            }
            default: {
                break
            }
        }
    }

    shoot(velocity: [number, number]) {
        return new Bullet(this.position, velocity)
    }

    autoFallInStartScene(deltaTime: number) {
        this.physicsHandler.update(deltaTime)

        if (this.physicsHandler.getVelocityY() >= 0) {
            if (this.state == PlayerState.Jump) {
                this.setState(PlayerState.Fall)
            }
        }
    }

    override display(cameraOffset: [number, number] = [0, 0]): void {
        super.display(cameraOffset)
        if (this.buff) {
            this.buff.display(cameraOffset)
        }
    }
}
