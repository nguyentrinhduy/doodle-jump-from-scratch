import { PLAYER_VELOCITY_ON_SPRING_BUFF } from '../constants/Buff'
import { SpringBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { Buff } from './Buff'

export class SpringBuff extends Buff {
    constructor() {
        super(SpringBuffSprite)
        this.requestSingleAnimation(0)
    }

    onReceived(player: Player): void {
        player.setState(PlayerState.Jump)
        player.setVelocity([...PLAYER_VELOCITY_ON_SPRING_BUFF])
        this.requestSingleAnimation(1)
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
