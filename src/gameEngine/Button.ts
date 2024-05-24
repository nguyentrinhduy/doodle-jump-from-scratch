import { Camera } from "./Camera";
import { ImageView } from "./ImageView";
import { View } from "./View";

export class Button extends ImageView{
    isClicked(positionX: number, positionY: number): boolean{
        let camera = Camera.getInstance();
        return this.containsPoint([positionX - camera.getOffsetX(), positionY - camera.getOffsetY()]);
    }
}