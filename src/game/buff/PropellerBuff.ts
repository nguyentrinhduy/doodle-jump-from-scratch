import { BUFF_TIME, PLAYER_VELOCITY_ON_PROPELLER_BUFF } from '../constants/Buff'
import { BUFF_DEPTH, ON_PLAYER_BUFF_DEPTH } from '../constants/Depths'
import { PropellerBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'

import { Buff } from './Buff'

export class PropellerBuff extends Buff {
    constructor() {
        super(PropellerBuffSprite)
        this.setDepth(BUFF_DEPTH)
    }
    onReceived(player: Player): void {
        player.setVelocity(PLAYER_VELOCITY_ON_PROPELLER_BUFF)
        player.applyGravity(false)
        player.setState(PlayerState.WearingPropeller)
        player.setBuffTime(BUFF_TIME)
        player.setBuff(this)
        this.requestLoopAnimation()
        this.setDepth(ON_PLAYER_BUFF_DEPTH)
    }

    clone(): Buff {
        let newBuff = new PropellerBuff()
        newBuff.setPosition(this.position)
        newBuff.setSize(this.size)
        newBuff.visible = this.visible
        newBuff.setAnimator(this.cloneAnimator())
        return newBuff
    }
}
