import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants/WindowBounds'
import { MainGame } from '../game-engine/main-game/MainGame'
import { SpriteFactory } from '../game-engine/resource-factory/SpriteFactory'
import { StartScene } from './scene/StartScene'

class DoodleJump extends MainGame {
    constructor() {
        super()
        const canvas = document.getElementById('game') as HTMLCanvasElement
        canvas.style.marginLeft = '400px'
        canvas.width = WINDOW_WIDTH
        canvas.height = WINDOW_HEIGHT
    }
    override run() {
        this.transitionTo(new StartScene())
        super.run()
    }
}

// run the game
let newGame = new DoodleJump()
newGame.run()
