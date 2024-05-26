import { Buff, BuffType } from '../buff/Buff'
import { JetpackBuff } from '../buff/JetpackBuff'
import { PropellerBuff } from '../buff/PropellerBuff'
import { SpringBuff } from '../buff/SpringBuff'
import { LAND_WIDTH, MOVING_LAND_INITIAL_VELOCITY } from '../constants/Land'
import { PLAYER_START_POSITION, PLAYER_START_VELOCITY } from '../constants/Player'
import { MovingLandSprite } from '../constants/ResourcePath'
import { WINDOW_WIDTH } from '../constants/WindowBounds'
import { Camera } from '../../game-engine/camera/Camera'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { MathHandler } from '../../game-engine/math/MathHandler'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { ILand } from './ILand'

export class MovingLand extends ImageGameObject implements ILand {
    private buff: Buff | null
    private velocity: [number, number]
    constructor() {
        super(MovingLandSprite)
        this.scaleSize(2)
        this.velocity = [...MOVING_LAND_INITIAL_VELOCITY]
    }
    private setPositionForBuff() {
        let service = MathHandler.getInstance()
        this.buff!.setPosition([
            this.position[0] + service.getRandomFloat(0, this.size[0] - this.buff!.getWidth()),
            this.position[1] - this.buff!.getHeight(),
        ])
    }
    randomizeBuff() {
        let service = MathHandler.getInstance()
        let randomNum = service.getRandomInt(0, 3)
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
    }
    move(deltaTime: number): void {
        if (this.position[0] >= WINDOW_WIDTH - LAND_WIDTH) {
            this.position[0] = WINDOW_WIDTH - LAND_WIDTH
            this.velocity[0] = -this.velocity[0]
        } else if (this.position[0] <= 0) {
            this.position[0] = 0
            this.velocity[0] = -this.velocity[0]
        }
        this.position[1] += deltaTime * this.velocity[1]
        this.position[0] += deltaTime * this.velocity[0]
    }
    onJumped(player: Player): void {
        if (this.buff && player.collides(this.buff)) {
            this.buff.onReceived(player)
            this.buff = null
        } else {
            player.setVelocity([...PLAYER_START_VELOCITY])
            player.setState(PlayerState.Jump)
        }
    }
}
