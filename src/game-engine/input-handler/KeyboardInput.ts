export class KeyboardInput {
    private keyInputDowned: string
    private keyInputReleased: string
    constructor() {
        this.keyInputDowned = ''
        this.keyInputReleased = ''
        window.addEventListener('keydown', this.keyDownEventListener)
        window.addEventListener('keyup', this.keyUpEventListener)
    }
    pressed(key: string) {
        if (this.keyInputDowned == key) {
            this.keyInputDowned = ''
            return true
        }
        return false
    }
    private keyDownEventListener = (event: KeyboardEvent) => {
        this.keyInputDowned = event.key
    }

    released(key: string) {
        if (this.keyInputReleased == key) {
            this.keyInputReleased = ''
            return true
        }
        return false
    }

    private keyUpEventListener = (event: KeyboardEvent) => {
        this.keyInputReleased = event.key
    }
}
