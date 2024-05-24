import { BulletFlyweight } from "../constants/ResourcePath";
import { ImageView } from "../gameEngine/ImageView";
import { View } from "../gameEngine/View";
import { Flyweight } from "../resourceFactory/Flyweight";

export class Bullet extends ImageView{
    private vector: [number, number];
    constructor(position: [number, number], vector: [number, number]){
        super(BulletFlyweight);
        this.position = position;
        this.vector = vector;
    }
}