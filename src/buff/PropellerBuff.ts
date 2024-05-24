import { PropellerBuffFlyweight } from "../constants/ResourcePath";
import { Player } from "../player/Player";
import { Buff } from "./Buff";

export class PropellerBuff extends Buff{
    constructor(){
        super(PropellerBuffFlyweight);
    }
    onReceived(player: Player): void {
        
    }
}