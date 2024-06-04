import { BUFF_TIME, PLAYER_VELOCITY_ON_JETPACK_BUFF } from '../constants/Buff'
import { BUFF_DEPTH, ON_PLAYER_BUFF_DEPTH } from '../constants/Depths'
import { JetpackBuffSprite } from '../constants/ResourcePath'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { Buff } from './Buff'

export class JetpackBuff extends Buff {
    public constructor() {
        super(JetpackBuffSprite)
        this.setDepth(BUFF_DEPTH)
    }
    public onReceived(player: Player): void {
        player.setVelocity(PLAYER_VELOCITY_ON_JETPACK_BUFF)
        player.applyGravity(false)
        player.setState(PlayerState.WearingJetpack)
        player.setBuffTime(BUFF_TIME)
        player.setBuff(this)
        this.requestLoopAnimation()
        this.setDepth(ON_PLAYER_BUFF_DEPTH)
    }

    public clone(): Buff {
        let newBuff = new JetpackBuff()
        newBuff.setPosition(this.position)
        newBuff.setSize(this.size)
        newBuff.visible = this.visible
        newBuff.setAnimator(this.cloneAnimator())
        return newBuff
    }
}
