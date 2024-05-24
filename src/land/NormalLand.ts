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
import { PLAYER_START_VECTOR } from "../constants/Player";

export class NormalLand extends Land{
    private buff: Buff | null;
    
    constructor(){
        super(NormalLandFlyweight);
        this.requestSingleAnimation(0);
    }
    
    private setPositionForBuff(){
        let service = Service.getInstance();
        this.buff!.setPosition([
            this.position[0] + service.getRandomFloat(0, this.size[0] - this.buff!.getWidth()),
            this.position[1] - this.buff!.getHeight()
        ]);
    }
    randomizeBuff(){
        let service = Service.getInstance();
        let randomNum = service.getRandomInt(0, 3);
        switch (randomNum){
            case BuffType.Propeller:
            {
                this.buff = new PropellerBuff();
                this.setPositionForBuff();
                break;
            }
            case BuffType.Jetpack:
            {
                this.buff = new JetpackBuff();
                this.setPositionForBuff();
                break;
            }
            case BuffType.Spring:
            {
                this.buff = new SpringBuff();
                this.setPositionForBuff();
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
            this.buff = null;
        }
        else{
            player.setVector([...PLAYER_START_VECTOR]);
            player.setState(PlayerState.Jump);
        }
    }
    move(): void {
        let cameraVector = Camera.getInstance().getVector();
        this.position[0] += cameraVector[0];
        this.position[1] += cameraVector[1];
    }
}