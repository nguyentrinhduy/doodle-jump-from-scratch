import { PLAYER_VELOCITY_ON_SPRING_BUFF } from '../constants/Buff'
import { SpringBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { Buff } from './Buff'

export class SpringBuff extends Buff {
    constructor() {
        super(SpringBuffSprite)
    }

    onReceived(player: Player): void {
        player.setState(PlayerState.Jump)
        player.setVelocity([...PLAYER_VELOCITY_ON_SPRING_BUFF])
        let standingPosition = [this.position[0], this.position[1] + this.size[1]]
        this.requestSingleAnimation(1)
        this.scaleSize(2)
        this.position = [standingPosition[0], standingPosition[1] - this.size[1]]
    }

    clone(): Buff {
        let newBuff = new SpringBuff()
        newBuff.position = [...this.position]
        newBuff.size = [...this.size]
        newBuff.visible = this.visible
        newBuff.setAnimator(this.cloneAnimator())
        return newBuff
    }
}
