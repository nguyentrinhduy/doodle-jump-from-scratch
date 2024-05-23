import { Direction, PlayerState } from "./PlayerState";
import { Bullet } from "./Bullet";
import { View } from "../gameEngine/View";
import { GameManager } from "../GameManager";
import { Flyweight } from "../resourceFactory/Flyweight";
import { PlayerFallLeftFlyweight, PlayerFallRightFlyweight, PlayerJumpLeftFlyweight, PlayerJumpRightFlyweight } from "../resourceFactory/ResourcePath";

export class Player extends View{
    private score: number;
    private acceleration: [number, number];
    private vector: [number, number];
    private state: PlayerState;
    private direction: Direction;
    private buffTime: number;
    constructor(){
        super(PlayerJumpRightFlyweight);
        this.acceleration = [0, 10];
        this.vector = [0, -100];
        this.position = [250, window.innerHeight + 10];
        this.state = PlayerState.Jump;
        this.direction = Direction.Left;
        this.scaleSize(1.5);
    }

    autoFall(progress: number){
        this.position[0] += this.vector[0]*progress;
        this.position[1] += this.vector[1]*progress;
        this.score += Math.max(0, this.vector[1]*progress);
        this.vector[0] += this.acceleration[0]*progress;
        this.vector[1] += this.acceleration[1]*progress;
        
        if (this.vector[1] >= 0){
            if (this.state == PlayerState.Jump){
                this.setState(PlayerState.Fall);
            }
        }
    }

    setVector(vector: [number, number]){
        this.vector = vector;
    }
    getState(){
        return this.state;
    }
    update(progress: number){
        this.autoFall(progress);
    }
    setState(state: PlayerState, direction = this.direction){
        this.state = state;
        this.direction = direction;
        switch (state){
            case PlayerState.Fall: 
            {
                if (direction == Direction.Right)
                    this.setFlyweight(PlayerFallRightFlyweight);
                else
                    this.setFlyweight(PlayerFallLeftFlyweight);
                break;
            }
            case PlayerState.Jump:
            {
                if (direction == Direction.Left)
                    this.setFlyweight(PlayerJumpLeftFlyweight);
                else
                    this.setFlyweight(PlayerJumpRightFlyweight);
                break;
            }
            default:
            {
                break;
            }
        }
    }
    shoot(vector: [number, number]){
        return new Bullet(this.position, vector);
    }
    onReceivedBuffs(){

    }
}