import { Buff } from "../buff/Buff";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { NormalLandFlyweight } from "../resourceFactory/ResourcePath";
import { Land } from "./Land";

export class NormalLand extends Land{
    private buff: Buff | null;
    
    constructor(){
        super(NormalLandFlyweight);
    }
    onJumped(player: Player): void {
        if (this.buff && player.collides(this.buff)){

        }
        else{
            player.setVector([0, -100]);
            player.setState(PlayerState.Jump);
        }
    }
    onBuffReceived(){
        // TODO: delete the buff on the land
    }
}