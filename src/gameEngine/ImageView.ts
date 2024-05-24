import { Flyweight } from "../resourceFactory/Flyweight";
import { FlyweightFactory } from "../resourceFactory/FlyweightFactory";
import { Camera } from "./Camera";
import { View } from "./View";

export class ImageView extends View{
    protected flyweight: Flyweight;
    
    constructor(state: string[]){
        super();
        this.flyweight = FlyweightFactory.getInstance().getFlyweight(state);
        this.size = this.flyweight.getNaturalSize();
    }
    loadImage(): Promise<void>{
        return this.flyweight.loadImage();
    }
    protected setFlyweight(state: string[]){
        this.flyweight = FlyweightFactory.getInstance().getFlyweight(state);
    }
    display(){
        // console.log("getFlyweight");
        this.flyweight.display(Camera.getInstance().getNewPosition(this.position), this.size);
    }
}