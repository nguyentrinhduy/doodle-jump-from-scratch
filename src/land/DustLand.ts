import { Camera } from "../gameEngine/Camera";
import { Player } from "../player/Player";
import { Land } from "./Land";

export class DustLand extends Land{
    constructor(){
        super(["Land", "Dust"]);
    }
    onJumped(player: Player): void {
        // this.requestMultipleAnimation(1, 5);
    }
    move(): void {
        let cameraVector = Camera.getInstance().getVector();
        this.position[0] += cameraVector[0];
        this.position[1] += cameraVector[1];
    }
}