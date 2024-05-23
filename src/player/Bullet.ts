import { View } from "../gameEngine/View";
import { Flyweight } from "../resourceFactory/Flyweight";

export class Bullet extends View{
    private vector: [number, number];
    constructor(position: [number, number], vector: [number, number]){
        super(["Bullet", "Bullet"]);
        this.position = position;
        this.vector = vector;
    }
}