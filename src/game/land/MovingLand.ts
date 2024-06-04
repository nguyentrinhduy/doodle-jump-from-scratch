import { Buff, BuffType } from '../buff/Buff'
import { JetpackBuff } from '../buff/JetpackBuff'
import { PropellerBuff } from '../buff/PropellerBuff'
import { SpringBuff } from '../buff/SpringBuff'
import { LAND_WIDTH, MOVING_LAND_INITIAL_VELOCITY } from '../constants/Land'
import { PLAYER_START_POSITION, PLAYER_START_VELOCITY } from '../constants/Player'
import { MovingLandSprite } from '../constants/ResourcePath'
import { WINDOW_WIDTH } from '../constants/Bounds'
import { Camera } from '../../game-engine/camera/Camera'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { MathHandler } from '../../game-engine/math/MathHandler'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { ILand } from './ILand'
import { Position } from '../../game-engine/game-objects/Position'
import { LAND_DEPTH } from '../constants/Depths'

export class MovingLand extends ImageGameObject implements ILand {
    private buff: Buff | null
    private velocity: Position
    constructor() {
        super(MovingLandSprite)
        this.scaleSize(2)
        this.velocity = new Position(0, 0)
        this.velocity.set(MOVING_LAND_INITIAL_VELOCITY)
        this.buff = null
        this.depth = LAND_DEPTH
    }
    private setPositionForBuff() {
        let mathHandler = MathHandler.getInstance()
        this.buff!.setPosition(new Position(
            this.getPositionX() + mathHandler.getRandomFloat(0, this.getWidth() - this.buff!.getWidth()),
            this.getPositionY() - this.buff!.getHeight(),
        ))
    }
    public randomizeBuff(): Buff | null {
        let mathHandler = MathHandler.getInstance()
        let randomNum = mathHandler.getRandomInt(0, 30)
        switch (randomNum) {
            case BuffType.Propeller: {
                this.buff = new PropellerBuff()
                this.setPositionForBuff()
                break
            }
            case BuffType.Jetpack: {
                this.buff = new JetpackBuff()
                this.setPositionForBuff()
                break
            }
            case BuffType.Spring: {
                this.buff = new SpringBuff()
                this.setPositionForBuff()
                break
            }
            default: {
                break
            }
        }
        return this.buff
    }
    public move(deltaTime: number): void {
        let buffPosition = new Position(0, 0)
        if (this.buff) buffPosition = this.buff.getPosition()
        if (this.getPositionX() >= WINDOW_WIDTH - this.getWidth()) {
            buffPosition.setX(buffPosition.getX() - (this.position.getX() - (WINDOW_WIDTH - this.getWidth())))
            this.setPositionX(WINDOW_WIDTH - this.getWidth())
            this.velocity.setX(-this.velocity.getX())
        } else if (this.getPositionX() <= 0) {
            buffPosition.setX(buffPosition.getX() - this.getPositionX())
            this.setPositionX(0)
            this.velocity.setX(-this.velocity.getX())
        }
        this.position.setY(this.position.getY() + deltaTime * this.velocity.getY())
        this.position.setX(this.position.getX() + deltaTime * this.velocity.getX())
        buffPosition.setX(buffPosition.getX() + deltaTime * this.velocity.getX())
        buffPosition.setY(buffPosition.getY() + deltaTime * this.velocity.getY())
        if (this.buff) {
            this.buff.setPosition(buffPosition)
        }
    }
    public onJumped(player: Player): void {
        if (this.buff && player.collides(this.buff)) {
            this.buff.onReceived(player)
        } else {
            player.setVelocity(PLAYER_START_VELOCITY)
            if (player.getState() != PlayerState.ShootUp) {
                player.setState(PlayerState.Jump)
            }
        }
    }
}
