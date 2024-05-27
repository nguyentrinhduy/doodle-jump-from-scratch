import { BUFF_TIME, PLAYER_VELOCITY_ON_PROPELLER_BUFF } from '../constants/Buff'
import { PropellerBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'

import { Buff } from './Buff'

export class PropellerBuff extends Buff {
    constructor() {
        super(PropellerBuffSprite)
    }
    onReceived(player: Player): void {
        player.setVelocity([...PLAYER_VELOCITY_ON_PROPELLER_BUFF])
        player.applyGravity(false)
        player.setState(PlayerState.WearingPropeller)
        player.setBuffTime(BUFF_TIME)
        player.setBuff(this)
        this.requestLoopAnimation()
    }

    clone(): Buff {
        let newBuff = new PropellerBuff()
        newBuff.position = [...this.position]
        newBuff.size = [...this.size]
        newBuff.visible = this.visible
        newBuff.setAnimator(this.cloneAnimator())
        return newBuff
    }
}
