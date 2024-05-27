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
    PLAYER_START_VELOCITY_IN_PLAYING_SCENE,
    PLAYER_VELOCITY_DIRECTION,
} from '../constants/Player'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/Bounds'
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
        this.physicsHandler.setVelocity([...PLAYER_START_VELOCITY_IN_PLAYING_SCENE])
    }
    private resolveBuffPosition() {
        if (!this.buff) return
        if (this.state == PlayerState.WearingPropeller) {
            this.buff.setPosition([this.position[0] + 15, this.position[1]])
        } else if (this.state == PlayerState.WearingJetpack) {
            if (this.direction == Direction.Left) {
                this.buff.setPosition([this.position[0] + this.size[0] - 30, this.position[1] + 20])
            } else {
                this.buff.setPosition([
                    this.position[0] - this.buff.getWidth() + 30,
                    this.position[1] + 20,
                ])
            }
        }
    }

    autoFall(deltaTime: number) {
        this.physicsHandler.update(deltaTime)
        if (this.position[0] + this.size[0] <= 0) {
            this.position[0] = WINDOW_WIDTH
        } else if (this.position[0] >= WINDOW_WIDTH) {
            this.position[0] = -this.size[0]
        }
        if (this.buffTime > 0) {
            this.buffTime -= deltaTime
            if (this.buffTime <= 0) {
                this.buffTime = 0
                this.buff = null
                this.setState(PlayerState.Jump)
                this.physicsHandler.setEnable(true)
            } else {
                this.buff!.timePassed(deltaTime)
                this.resolveBuffPosition()
            }
        }
        if (this.physicsHandler.getVelocityY() >= 0) {
            if (this.state == PlayerState.Jump) {
                this.setState(PlayerState.Fall)
            }
        }
    }
    setVelocityDirection(direction: Direction) {
        this.direction = direction
        this.setState(this.state)
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

    getBuff() {
        return this.buff
    }

    setState(state: PlayerState, direction = this.direction) {
        this.state = state
        this.direction = direction
        switch (this.state) {
            case PlayerState.Jump: {
                if (direction == Direction.Left) this.setSprite(PlayerJumpLeftSprite)
                else this.setSprite(PlayerJumpRightSprite)
                break
            }
            default: {
                if (direction == Direction.Right) this.setSprite(PlayerFallRightSprite)
                else this.setSprite(PlayerFallLeftSprite)
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
