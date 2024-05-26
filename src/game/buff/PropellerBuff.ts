import { BUFF_TIME, PLAYER_VELOCITY_ON_PROPELLER_BUFF } from '../constants/Buff'
import { PropellerBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'

import { Buff } from './Buff'

export class PropellerBuff extends Buff {
    constructor() {
        super(PropellerBuffSprite)
        this.requestSingleAnimation(0)
    }
    onReceived(player: Player): void {
        player.setVelocity([...PLAYER_VELOCITY_ON_PROPELLER_BUFF])
        player.applyGravity(false)
        player.setState(PlayerState.WearingPropeller)
        player.setBuffTime(BUFF_TIME)
        player.setBuff(this)
        this.requestLoopAnimation()
    }
}
