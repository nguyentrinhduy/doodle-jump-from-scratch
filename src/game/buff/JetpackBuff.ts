import { BUFF_TIME, PLAYER_VELOCITY_ON_JETPACK_BUFF } from '../constants/Buff'
import { JetpackBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { Buff } from './Buff'

export class JetpackBuff extends Buff {
    constructor() {
        super(JetpackBuffSprite)
        this.requestSingleAnimation(0)
    }
    onReceived(player: Player): void {
        player.setVelocity([...PLAYER_VELOCITY_ON_JETPACK_BUFF])
        player.applyGravity(false)
        player.setState(PlayerState.WearingJetpack)
        player.setBuffTime(BUFF_TIME)
        player.setBuff(this)
        this.requestLoopAnimation()
    }
}
