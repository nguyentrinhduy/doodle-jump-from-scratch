import { Position } from '../../game-engine/game-objects/Position'
import { PLAYER_VELOCITY_ON_SPRING_BUFF } from '../constants/Buff'
import { BUFF_DEPTH } from '../constants/Depths'
import { SpringBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { Buff } from './Buff'

export class SpringBuff extends Buff {
    constructor() {
        super(SpringBuffSprite)
        this.setDepth(BUFF_DEPTH)
    }

    onReceived(player: Player): void {
        player.setState(PlayerState.Jump)
        player.setVelocity(PLAYER_VELOCITY_ON_SPRING_BUFF)
        let standingPosition = new Position(this.position.getX(), this.position.getY() + this.size.getHeight())
        this.requestSingleAnimation(1)
        this.scaleSize(2)
        this.position = new Position(standingPosition.getX(), standingPosition.getY() - this.size.getHeight())
    }

    clone(): Buff {
        let newBuff = new SpringBuff()
        newBuff.setPosition(this.position)
        newBuff.setSize(this.size)
        newBuff.visible = this.visible
        newBuff.setAnimator(this.cloneAnimator())
        return newBuff
    }
}
