import { Buff, BuffType } from "../buff/Buff";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { NormalLandFlyweight } from "../constants/ResourcePath";
import { Land } from "./Land";
import { Service } from "../gameEngine/Service";
import { PropellerBuff } from "../buff/PropellerBuff";
import { JetpackBuff } from "../buff/JetpackBuff";
import { SpringBuff } from "../buff/SpringBuff";
import { Camera } from "../gameEngine/Camera";

export class NormalLand extends Land{
    private buff: Buff | null;
    
    constructor(){
        super(NormalLandFlyweight);
    }
    
    randomizeBuff(){
        let randomNum = Service.getInstance().getRandomInt(0, 3);
        switch (randomNum){
            case BuffType.Propeller:
            {
                this.buff = new PropellerBuff();
                this.buff
                break;
            }
            case BuffType.Jetpack:
            {
                this.buff = new JetpackBuff();
                break;
            }
            case BuffType.Spring:
            {
                this.buff = new SpringBuff();
                break;
            }
            default:
            {
                break;
            }
        }
    }
    onJumped(player: Player): void {
        if (this.buff && player.collides(this.buff)){
            this.buff.onReceived(player);
        }
        else{
            player.setVector([0, -100]);
            player.setState(PlayerState.Jump);
        }
    }
    move(): void {
        let cameraVector = Camera.getInstance().getVector();
        this.position[0] += cameraVector[0];
        this.position[1] += cameraVector[1];
    }
}