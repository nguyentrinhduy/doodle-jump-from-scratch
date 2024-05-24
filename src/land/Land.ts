import { View } from "../gameEngine/View";
import { Player } from "../player/Player";
import { Flyweight } from "../resourceFactory/Flyweight";
export enum LandType{
    NormalLand = 0,
    DustLand = 1,
    MovingLand = 2,
}
export abstract class Land extends View{
    constructor(state: string[]){
        super(state);
        this.scaleSize(2);
        console.log(this.size[0]);
    }
    abstract move(): void;
    abstract onJumped(player: Player): void;
}