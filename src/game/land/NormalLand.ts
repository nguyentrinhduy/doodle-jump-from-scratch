import { Buff, BuffType } from '../buff/Buff'
import { NormalLandSprite } from '../constants/ResourcePath'
import { ILand } from './ILand'
import { PropellerBuff } from '../buff/PropellerBuff'
import { JetpackBuff } from '../buff/JetpackBuff'
import { SpringBuff } from '../buff/SpringBuff'
import { Camera } from '../../game-engine/camera/Camera'
import { PLAYER_START_VELOCITY } from '../constants/Player'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { MathHandler } from '../../game-engine/math/MathHandler'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'

export class NormalLand extends ImageGameObject implements ILand {
    private buff: Buff | null

    constructor() {
        super(NormalLandSprite)
        this.scaleSize(2)
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
        let randomNum = service.getRandomInt(0, 4)
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
    onJumped(player: Player): void {
        if (this.buff && player.collides(this.buff)) {
            this.buff.onReceived(player)
            this.buff = null
        } else {
            player.setVelocity([...PLAYER_START_VELOCITY])
            player.setState(PlayerState.Jump)
        }
    }
    move(deltaTime: number): void {}
    override display(cameraOffset?: [number, number]): void {
        super.display(cameraOffset)
        if (this.buff) {
            this.buff.display(cameraOffset)
        }
    }
}
