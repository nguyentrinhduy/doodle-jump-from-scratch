import { AnimationView } from "../gameEngine/AnimationView";
import { ImageView } from "../gameEngine/ImageView";
import { View } from "../gameEngine/View";
import { Player } from "../player/Player";
import { Flyweight } from "../resourceFactory/Flyweight";
export enum LandType{
    NormalLand = 0,
    MovingLand = 1,
    DustLand = 2,
}
export abstract class Land extends AnimationView{
    constructor(state: string[]){
        super(state);
        this.scaleSize(2);
        console.log(this.size[0]);
    }
    abstract move(): void;
    abstract onJumped(player: Player): void;
}