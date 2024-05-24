import { View } from "../gameEngine/View";

export abstract class Monster extends View{
    constructor(state: string[]){
        super(state);
    }
    
    abstract move(progress: number): void;
}