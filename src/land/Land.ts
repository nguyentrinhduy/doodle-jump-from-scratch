import { View } from "../gameEngine/View";
import { Player } from "../player/Player";
import { Flyweight } from "../resourceFactory/Flyweight";
export abstract class Land extends View{
    constructor(state: string[]){
        super(state);
    }
    abstract onJumped(player: Player): void;
}