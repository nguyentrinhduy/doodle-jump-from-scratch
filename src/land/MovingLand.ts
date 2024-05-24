import { Buff, BuffType } from "../buff/Buff";
import { JetpackBuff } from "../buff/JetpackBuff";
import { PropellerBuff } from "../buff/PropellerBuff";
import { SpringBuff } from "../buff/SpringBuff";
import { Camera } from "../gameEngine/Camera";
import { Service } from "../gameEngine/Service";
import { Player } from "../player/Player";
import { Land } from "./Land";

export class MovingLand extends Land{
    private buff: Buff | null;
    constructor(){
        super([]);
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
    move(): void {
        let cameraVector = Camera.getInstance().getVector();
        this.position[0] += cameraVector[0];
        this.position[1] += cameraVector[1];
    }
    onJumped(player: Player): void {
        
    }
}