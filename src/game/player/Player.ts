import { Direction, PlayerState } from './PlayerState'
import { Bullet } from './Bullet'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Sprite } from '../../game-engine/resource-factory/Sprite'
import {
    PlayerFallLeftSprite,
    PlayerFallRightSprite,
    PlayerJumpLeftSprite,
    PlayerJumpRightSprite,
    PlayerShootSprite,
} from '../constants/ResourcePath'
import {
    BULLET_INITIAL_POSITION,
    PLAYER_SHOOTING_TIME,
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
import { Position } from '../../game-engine/game-objects/Position'

export class Player extends ImageGameObject {
    private state: PlayerState
    private direction: Direction
    private specialStateTime: number
    private buff: Buff | null
    private physicsHandler: PhysicsHandler
    private shootAllowed: boolean
    constructor() {
        super(PlayerJumpLeftSprite)
        this.position.set(PLAYER_START_POSITION)
        this.state = PlayerState.Jump
        this.direction = Direction.Left
        this.specialStateTime = 0
        this.scaleSize(1.5)
        this.physicsHandler = new PhysicsHandler(this)
        this.physicsHandler.setVelocity(PLAYER_START_VELOCITY_IN_PLAYING_SCENE)
        this.shootAllowed = true
    }
    private resolveBuffPosition() {
        if (!this.buff) return
        if (this.state == PlayerState.WearingPropeller) {
            this.buff.setPosition(new Position(this.getPositionX() + 15, this.getPositionY()))
        } else if (this.state == PlayerState.WearingJetpack) {
            if (this.direction == Direction.Left) {
                this.buff.setPosition(new Position(this.getPositionX() + this.getWidth() - 30, this.getPositionY() + 20))
            } else {
                this.buff.setPosition(new Position(
                    this.getPositionX() - this.buff.getWidth() + 30,
                    this.getPositionY() + 20,
                ))
            }
        }
    }

    autoFall(deltaTime: number) {
        this.physicsHandler.update(deltaTime)
        if (this.specialStateTime > 0) {
            this.specialStateTime -= deltaTime
            if (this.specialStateTime <= 0) {
                this.specialStateTime = 0
                this.buff?.setVisible(false)
                this.buff = null
                this.setState(PlayerState.Jump)
                this.physicsHandler.setEnable(true)
            } else {
                if (this.buff) {
                    this.buff!.update(deltaTime)
                    this.resolveBuffPosition()
                }
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
    setVelocity(velocity: Position) {
        this.physicsHandler.setVelocity(velocity)
    }

    setVelocityX(x: number) {
        this.physicsHandler.setVelocityX(x)
    }
    getVelocityX() {
        return this.physicsHandler.getVelocityX()
    }
    setVelocityY(y: number) {
        this.physicsHandler.setVelocityY(y)
    }
    getVelocityY() {
        return this.physicsHandler.getVelocityY()
    }
    applyGravity(isAppliedGravity: boolean) {
        this.physicsHandler.setEnable(isAppliedGravity)
    }

    getVelocity() {
        return this.physicsHandler.getVelocity()
    }

    getState() {
        return this.state
    }
    setShootAllowed(shootAllowed: boolean) {
        this.shootAllowed = shootAllowed
    }
    getShootAllowed() {
        return this.shootAllowed
    }
    update(deltaTime: number) {
        this.autoFall(deltaTime)
    }

    setBuffTime(time: number) {
        this.specialStateTime = time
    }

    setBuff(buff: Buff) {
        this.buff = buff
    }

    getBuff() {
        return this.buff
    }
    override setPositionX(x: number): void {
        super.setPositionX(x)
        this.resolveBuffPosition()
    }
    override setPosition(position: Position): void {
        super.setPosition(position)
        this.resolveBuffPosition()
    }
    override setPositionY(y: number): void {
        super.setPositionY(y)
        this.resolveBuffPosition()
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
            case PlayerState.ShootUp: {
                this.setSprite(PlayerShootSprite)
                break
            }
            default: {
                if (direction == Direction.Right) this.setSprite(PlayerFallRightSprite)
                else this.setSprite(PlayerFallLeftSprite)
                break
            }
        }
    }
    setSpecialStateTime(time: number) {
        this.specialStateTime = time
    }
    shoot(velocity: Position) {
        return new Bullet(
            new Position(
                this.getPositionX() + BULLET_INITIAL_POSITION.getX(),
                this.getPositionY() + BULLET_INITIAL_POSITION.getY(),
            ),
            velocity
        )
    }

    clone(): Player {
        let player = new Player()
        player.setPosition(this.position)
        player.setSize(this.size)
        player.visible = this.visible
        player.depth = this.depth
        player.state = this.state
        player.direction = this.direction
        player.physicsHandler = this.physicsHandler.clone(player)
        player.specialStateTime = this.specialStateTime
        player.sprite = this.sprite
        if (this.buff) {
            player.buff = this.buff.clone()
        } else {
            player.buff = null
        }
        return player
    }
}
