import { Camera } from "../gameEngine/Camera";
import { View } from "../gameEngine/View";

export class Button extends View{
    isClicked(positionX: number, positionY: number): boolean{
        let camera = Camera.getInstance();
        return this.containsPoint([positionX - camera.getOffsetX(), positionY - camera.getOffsetY()]);
    }
}