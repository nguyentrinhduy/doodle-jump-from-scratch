import { Buff, BuffType } from "../buff/Buff";
import { JetpackBuff } from "../buff/JetpackBuff";
import { PropellerBuff } from "../buff/PropellerBuff";
import { SpringBuff } from "../buff/SpringBuff";
import { LAND_WIDTH, MOVING_LAND_INITIAL_VECTOR } from "../constants/Land";
import { PLAYER_START_POSITION, PLAYER_START_VECTOR } from "../constants/Player";
import { MovingLandFlyweight } from "../constants/ResourcePath";
import { WINDOW_WIDTH } from "../constants/WindowBounds";
import { Camera } from "../gameEngine/Camera";
import { Service } from "../gameEngine/Service";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { Land } from "./Land";

export class MovingLand extends Land{
    private buff: Buff | null;
    private vector: [number, number];
    constructor(){
        super(MovingLandFlyweight);
        this.vector = [...MOVING_LAND_INITIAL_VECTOR];
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
    move(): void {
        let cameraVector = Camera.getInstance().getVector();
        let timePassed = Camera.getInstance().getTimePassed();
        this.position[0] += cameraVector[0] + timePassed*this.vector[0];
        if (this.position[0] >= WINDOW_WIDTH - LAND_WIDTH){
            this.position[0] = WINDOW_WIDTH - LAND_WIDTH;
            this.vector[0] = - this.vector[0];
        }
        else if (this.position[0] <= 0){
            this.position[0] = 0;
            this.vector[0] = - this.vector[0];
        }
        this.position[1] += cameraVector[1] + timePassed*this.vector[1];
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
}