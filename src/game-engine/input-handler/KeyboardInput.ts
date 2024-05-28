export class KeyboardInput {
    private keyDownInput:  { [key: string]: boolean}
    private keyUpInput: {[key: string]: boolean}
    constructor() {
        this.keyDownInput = {}
        this.keyUpInput = {}
        window.addEventListener('keydown', this.keyDownEventListener)
        window.addEventListener('keyup', this.keyUpEventListener)
    }
    keyDown(key: string) {
        if (!(key in this.keyDownInput)) return false
        return this.keyDownInput[key]
    }

    keyReleased(key: string) {
        if (!(key in this.keyUpInput)) return false
        
        return this.keyUpInput[key]
    }

    private keyDownEventListener = (event: KeyboardEvent) => {
        this.keyDownInput[event.key] = true
        this.keyUpInput[event.key] = false
    }

    private keyUpEventListener = (event: KeyboardEvent) => {
        this.keyDownInput[event.key] = false
        this.keyUpInput[event.key] = true
    }
}
