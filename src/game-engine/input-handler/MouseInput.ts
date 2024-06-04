import { Button } from '../game-objects/Button'
import { Position } from '../game-objects/Position'

export class MouseInput {
    private mousePosition: Position
    constructor() {
        this.mousePosition = new Position(-1, -1)
        const canvas = document.getElementById('game')
        canvas!.addEventListener('click', this.mouseClickEventListener)
    }
    clicked(button: Button): boolean {
        if (button.containsPoint(this.mousePosition)) {
            this.mousePosition = new Position(-1, -1)
            return true
        }
        return false
    }
    private mouseClickEventListener = (event: MouseEvent) => {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        this.mousePosition.setX(mouseX)
        this.mousePosition.setY(mouseY)
    }
}
