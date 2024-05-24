import { JetpackBuffFlyweight } from "../constants/ResourcePath";
import { Player } from "../player/Player";
import { Buff } from "./Buff";

export class JetpackBuff extends Buff{
    constructor(){
        super(JetpackBuffFlyweight);
    }
    onReceived(player: Player): void {
        
    }
}