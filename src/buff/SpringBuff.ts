import { SpringBuffFlyweight } from "../constants/ResourcePath";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { Buff } from "./Buff";

export class SpringBuff extends Buff{
    constructor(){
        super(SpringBuffFlyweight);
    }
    onReceived(player: Player): void {
        player.setState(PlayerState.Jump);
        player.setVector([0, -400]);
    }
}