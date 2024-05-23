import { Player } from "../player/Player";
import { Land } from "./Land";

export class DustLand extends Land{
    constructor(){
        super(["Land", "Dust"]);
    }
    onJumped(player: Player): void {
        
    }
}