import { BUFF_TIME, PLAYER_VECTOR_ON_PROPELLER_BUFF } from "../constants/Buff";
import { PropellerBuffFlyweight } from "../constants/ResourcePath";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { Buff } from "./Buff";

export class PropellerBuff extends Buff{
    constructor(){
        super(PropellerBuffFlyweight);
    }
    onReceived(player: Player): void {
        player.setVector([...PLAYER_VECTOR_ON_PROPELLER_BUFF]);
        player.setAcceleration([0, 0]);
        player.setState(PlayerState.WearingPropeller);
        player.setBuffTime(BUFF_TIME);
    }
}