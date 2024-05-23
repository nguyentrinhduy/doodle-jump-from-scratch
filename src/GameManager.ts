import { canvas } from "./MainGame";
import { Buff } from "./buff/Buff";
import { Land } from "./land/Land";
import { Bullet } from "./player/Bullet";
import { Player } from "./player/Player";
import { State } from "./state/State";

export class GameManager {
    private buffs: Buff[];
    private player: Player;
    private bullets: Bullet[];
    private lands: Land[];
    private state : State
    private static instance: GameManager;
    private constructor() {
        this.reset();
    }

    reset() {
        this.player = new Player();
        this.lands = [];
        this.buffs = [];
        this.bullets = [];
    }

    static getInstance(): GameManager{
        if (!GameManager.instance){
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    process(period: number){
        this.state.update(period);
        this.render();
    }
    
    getPlayer(){
        return this.player;
    }

    updateMap(){
        // remove stuffs below the camera
        while(this.lands.length > 0 && this.lands[0].getPositionY() >= window.innerHeight + 10){
            this.lands.shift();
        }

        // add stuffs above the camera
        
    }
    render(){
        const ctx = canvas!.getContext('2d');
        if (ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        this.state.render();
    }
    transitionTo(state: State){
        this.state = state;
        this.state.setContext(this);
    }
}

