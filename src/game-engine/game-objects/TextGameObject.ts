import { GameObject } from './GameObject'

export class TextGameObject extends GameObject {
    private text: string
    private font: string
    constructor(text: string = "0") {
        super()
        this.text = text;
    }
    setText(text: string) {
        this.text = text
    }

    getText() {
        return this.text
    }

    display(cameraOffset: [number, number] = [0, 0]): void {
        
    }
}
