import { GameManager } from "./GameManager";
import { Service } from "./gameEngine/Service";
import { FlyweightFactory } from "./resourceFactory/FlyweightFactory";
import { StartState } from "./state/StartState";
import { State } from "./state/State";

export class MainGame {
    gameManager: GameManager;
    state: State
    constructor(){
        this.gameManager = GameManager.getInstance();
        FlyweightFactory.getInstance();
    }
    run()
    {
        this.gameManager.transitionTo(new StartState());
        console.log("New Game Created");
        requestAnimationFrame(loop);
    }
    process(period: number){
        let progress = period/Service.getInstance().getSpeed();
        this.gameManager.process(progress);
    }
}

function loop() {
    const time = window.performance.now();
    
    const delta = time - lastTime;
    newGame.process(delta);
    lastTime = time;
    requestAnimationFrame(loop);
}

export const canvas = document.getElementById('game') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.width);
console.log(canvas.height);

let newGame = new MainGame();
let lastTime = window.performance.now();

// run the game
newGame.run();


