import { canvas } from "./MainGame";
import { LAND_HEIGHT, LAND_WIDTH } from "./constants/Land";
import { PLAYER_START_VECTOR } from "./constants/Player";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants/WindowBounds";
import { Camera } from "./gameEngine/Camera";
import { Service } from "./gameEngine/Service";
import { DustLand } from "./land/DustLand";
import { Land, LandType } from "./land/Land";
import { MovingLand } from "./land/MovingLand";
import { NormalLand } from "./land/NormalLand";
import { Monster } from "./monster/Monster";
import { Bullet } from "./player/Bullet";
import { Player } from "./player/Player";
import { State } from "./state/State";

export class GameManager {
    private player: Player;
    private bullets: Bullet[];
    private lands: Land[];
    private state : State
    private monsters: Monster[];
    private playerName: string;
    private static instance: GameManager;
    private constructor() {
        this.reset();
    }

    reset() {
        this.player = new Player(); 
        this.lands = [];
        this.bullets = [];
        this.monsters = [];
    }

    static getInstance(): GameManager{
        if (!GameManager.instance){
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    process(period: number){
        Camera.getInstance().setTimePassed(period);
        this.state.update(period);
        this.render();
    }
    
    getPlayer(){
        return this.player;
    }
    getLands(){
        return this.lands;
    }
    getMonsters(){
        return this.monsters;
    }
    getBullets(){
        return this.bullets;
    }
    updateMap(){
        // move
        this.lands.forEach(element => {
            element.move();
        });
        // remove stuffs below the camera
        while(this.lands.length > 0 && this.lands[0].getPositionY() >= WINDOW_HEIGHT + 10){
            this.lands.shift();
        }
        while(this.monsters.length > 0 && this.lands[0].getPositionY() >= WINDOW_HEIGHT + 10){
            this.monsters.shift();
        }

        // add stuffs above the camera
        let service = Service.getInstance();
        while(this.lands.length == 0 || this.lands[this.lands.length - 1].getPositionY() >= 50){
            let previousHeight = WINDOW_HEIGHT;
            if (this.lands.length > 0){
                previousHeight = this.lands[this.lands.length - 1].getPositionY();
            }
            let randomNum = service.getRandomInt(0, 2);
            switch (randomNum) {
                case LandType.NormalLand:
                {
                    let newLand = new NormalLand();
                    newLand.setPosition([
                        service.getRandomFloat(0, WINDOW_WIDTH - LAND_WIDTH),
                        service.getRandomFloat(previousHeight - LAND_HEIGHT - 200, previousHeight - LAND_HEIGHT)
                    ]);
                    this.lands.push(newLand);
                    break;
                }
                case LandType.MovingLand:
                {
                    let newLand = new MovingLand();
                    newLand.setPosition([
                        service.getRandomFloat(0, WINDOW_WIDTH - LAND_WIDTH),
                        service.getRandomFloat(previousHeight - LAND_HEIGHT - 200, previousHeight - LAND_HEIGHT)
                    ]);
                    this.lands.push(newLand);
                    break;
                }
                case LandType.DustLand:
                {
                    let newLand = new DustLand();
                    newLand.setPosition([
                        service.getRandomFloat(0, WINDOW_WIDTH - LAND_WIDTH),
                        service.getRandomFloat(previousHeight - LAND_HEIGHT - 200, previousHeight - LAND_HEIGHT)
                    ]);
                    this.lands.push(newLand);
                    break;
                }
            }
        }
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

