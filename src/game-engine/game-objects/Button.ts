import { Camera } from '../camera/Camera'
import { ImageGameObject } from './ImageGameObject'
import { GameObject } from './GameObject'

export class Button extends ImageGameObject {
    isClicked(positionX: number, positionY: number): boolean {
        return this.containsPoint([positionX, positionY])
    }
}
