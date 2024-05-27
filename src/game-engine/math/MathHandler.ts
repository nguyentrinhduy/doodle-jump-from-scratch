export class MathHandler {
    private static instance: MathHandler
    private Speed: number
    private constructor() {
        this.Speed = 60
    }
    static getInstance() {
        if (!MathHandler.instance) {
            MathHandler.instance = new MathHandler()
        }
        return MathHandler.instance
    }
    // MathHandlers
    getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
    }

    getRandomFloat(min: number, max: number) {
        return Math.random() * (max - min) + min
    }
}
