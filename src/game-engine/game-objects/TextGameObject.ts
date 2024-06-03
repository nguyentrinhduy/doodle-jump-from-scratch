import { GameObject } from './GameObject'

export class TextGameObject extends GameObject {
    private text: string
    private font: string
    constructor(text: string = '0') {
        super()
        this.text = text
        this.font = 'DoodleJump'
        this.size = [0, 30]
    }
    setText(text: string) {
        this.text = text
    }

    getText() {
        return this.text
    }

    render(cameraOffset: [number, number] = [0, 0]): void {
        if (!this.visible) return
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.font = this.size[1].toString() + 'px ' + this.font
            ctx.fillText(this.text, this.position[0], this.position[1])
        }
    }
}
