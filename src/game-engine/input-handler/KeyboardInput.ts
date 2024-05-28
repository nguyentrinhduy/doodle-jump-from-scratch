export class KeyboardInput {
    private keyInputDowned: string
    private keyInputReleased: string
    private keyInputPressed: string
    constructor() {
        this.keyInputDowned = ''
        this.keyInputReleased = ''
        window.addEventListener('keydown', this.keyDownEventListener)
        window.addEventListener('keypress', this.keyPressEventListener)
        window.addEventListener('keyup', this.keyUpEventListener)
    }
    keyDown(key: string) {
        if (this.keyInputDowned == key) {
            this.keyInputDowned = ''
            return true
        }
        return false
    }

    keyPressed(key: string) {
        if (this.keyInputPressed == key) {
            this.keyInputPressed = ''
            return true
        }
        return false
    }

    keyReleased(key: string) {
        if (this.keyInputReleased == key) {
            this.keyInputReleased = ''
            return true
        }
        return false
    }

    private keyDownEventListener = (event: KeyboardEvent) => {
        this.keyInputDowned = event.key
    }

    private keyPressEventListener = (event: KeyboardEvent) => {
        this.keyInputPressed = event.key
    }

    private keyUpEventListener = (event: KeyboardEvent) => {
        this.keyInputReleased = event.key
    }
}
