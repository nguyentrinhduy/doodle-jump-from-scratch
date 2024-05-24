import { View } from "../gameEngine/View";
import { Player } from "../player/Player";

export enum BuffType{
    None = 0, 
    Propeller = 1,
    Jetpack = 2,
    Spring = 3,
}
export abstract class Buff extends View {
    constructor(state: string[]){
        super(state);
    }
    abstract onReceived(player: Player): void;
}