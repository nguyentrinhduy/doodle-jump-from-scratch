import { Camera } from '../camera/Camera'
import { GameObject } from './GameObject'
import { Size } from './Size'

export class TextGameObject extends GameObject {
    private text: string
    private font: string
    constructor(text: string = '0') {
        super()
        this.text = text
        this.font = 'DoodleJump'
        this.size = new Size(0, 30)
    }
    setText(text: string) {
        this.text = text
    }

    getText() {
        return this.text
    }

    render(camera: Camera = new Camera()): void {
        if (!this.visible) return
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.font = this.size.getHeight().toString() + 'px ' + this.font
            ctx.fillText(this.text, this.position.getX() - camera.getOffsetX(), this.position.getY() - camera.getOffsetY())
        }
    }
}
