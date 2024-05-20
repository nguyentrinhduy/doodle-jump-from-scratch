import { Buff } from "./buff/Buff.js";
import { State } from "./state/State.js"
import { StartState } from "./state/StartState.js";

export class GameManager {
    time: number;
    score: number;
    buffs: Buff[];
    state: State;
    private static instance: GameManager;
    private constructor() {
        this.reset()
    }

    reset() {
        this.time = 0;
        this.score = 0;
        this.state = new StartState();
    }

    getInstance(): GameManager{
        if (!GameManager.instance){
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
}

