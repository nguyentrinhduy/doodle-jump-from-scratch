export class KeyboardInput {
    private keyDownInput:  { [key: string]: boolean }
    private keyUpInput: { [key: string]: boolean }
    private mapKey: { [key: string]: string}
    constructor() {
        this.keyDownInput = {}
        this.keyUpInput = {}
        this.mapKey = {}
        this.mapKey['w'] = 'w'
        this.mapKey['ArrowUp'] = 'w'
        this.mapKey['a'] = 'a'
        this.mapKey['ArrowLeft'] = 'a'
        this.mapKey['s'] = 's'
        this.mapKey['ArrowDown'] = 's'
        this.mapKey['d'] = 'd'
        this.mapKey['ArrowRight'] = 'd'
        window.addEventListener('keydown', this.keyDownEventListener)
        window.addEventListener('keyup', this.keyUpEventListener)
    }
    keyDown(key: string) {
        if (!(this.mapKey[key] in this.keyDownInput)) return false
        return this.keyDownInput[this.mapKey[key]]
    }

    keyReleased(key: string) {
        if (!(this.mapKey[key] in this.keyUpInput)) return false
        return this.keyUpInput[this.mapKey[key]]
    }

    private keyDownEventListener = (event: KeyboardEvent) => {
        this.keyDownInput[this.mapKey[event.key]] = true
        this.keyUpInput[this.mapKey[event.key]] = false
    }

    private keyUpEventListener = (event: KeyboardEvent) => {
        this.keyDownInput[this.mapKey[event.key]] = false
        this.keyUpInput[this.mapKey[event.key]] = true
    }
}
