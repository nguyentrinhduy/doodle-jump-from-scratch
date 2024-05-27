import { Button } from '../game-objects/Button'

export class MouseInput {
    private mousePosition: [number, number]
    constructor() {
        this.mousePosition = [-1, -1]
        const canvas = document.getElementById('game')
        canvas!.addEventListener('click', this.mouseClickEventListener)
    }
    clicked(button: Button): boolean {
        if (button.containsPoint(this.mousePosition)) {
            this.mousePosition = [-1, -1]
            return true
        }
        return false
    }
    private mouseClickEventListener = (event: MouseEvent) => {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        this.mousePosition = [mouseX, mouseY]
    }
}
