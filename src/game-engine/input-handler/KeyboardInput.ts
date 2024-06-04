export class KeyboardInput {
    private keyDownInput:  { [key: string]: boolean }
    private keyUpInput: { [key: string]: boolean }
    private mapKey: { [key: string]: string}
    public constructor() {
        this.keyDownInput = {}
        this.keyUpInput = {}
        this.mapKey = {}
        window.addEventListener('keydown', this.keyDownEventListener)
        window.addEventListener('keyup', this.keyUpEventListener)
    }
    public setMapKey(key: string, value: string): void {
        this.mapKey[key] = value
    }
    public keyDown(key: string): boolean {
        if (!(this.mapKey[key] in this.keyDownInput)) return false
        return this.keyDownInput[this.mapKey[key]]
    }

    public keyReleased(key: string): boolean {
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
