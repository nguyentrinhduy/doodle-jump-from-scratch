import { Direction, PlayerState } from "./PlayerState";
import { Bullet } from "./Bullet";
import { View } from "../gameEngine/View";
import { GameManager } from "../GameManager";
import { Flyweight } from "../resourceFactory/Flyweight";
import { PlayerFallLeftFlyweight, PlayerFallRightFlyweight, PlayerJumpLeftFlyweight, PlayerJumpRightFlyweight } from "../constants/ResourcePath";
import { GRAVITY_ACCELERATION, PLAYER_START_POSITION, PLAYER_START_VECTOR, PLAYER_VECTOR_DIRECTION } from "../constants/Player";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/WindowBounds";
import { Camera } from "../gameEngine/Camera";
import { ImageView } from "../gameEngine/ImageView";
import { Buff } from "../buff/Buff";


export class Player extends ImageView{
    private score: number;
    private acceleration: [number, number];
    private vector: [number, number];
    private state: PlayerState;
    private direction: Direction;
    private buffTime: number;
    private buff: Buff | null;
    constructor(){
        super(PlayerJumpLeftFlyweight);
        this.acceleration = [...GRAVITY_ACCELERATION];
        this.vector = [...PLAYER_START_VECTOR];
        this.position = [...PLAYER_START_POSITION];
        this.state = PlayerState.Jump;
        this.direction = Direction.Left;
        this.buffTime = 0;
        this.scaleSize(1.5);
    }

    autoFall(progress: number){
        this.position[0] += this.vector[0]*progress;
        if (this.position[1] + this.vector[1]*progress <= 300)
        {
            Camera.getInstance().setVector([0, 300 - (this.position[1] + this.vector[1]*progress)]);
            this.position[1] = 300;
        }
        else{
            this.position[1] += this.vector[1]*progress;
            Camera.getInstance().setVector([0, 0]);
        }
        if (this.position[1] >= WINDOW_HEIGHT + 10){
            this.state = PlayerState.Lose;
            return;
        }
        if (this.position[0] >= WINDOW_WIDTH){
            this.position[0] = -30;
        }
        else if (this.position[0] <= -30){
            this.position[0] = WINDOW_WIDTH;
        }
        this.score += Math.max(0, -this.vector[1]*progress);
        this.vector[0] += this.acceleration[0]*progress;
        this.vector[1] += this.acceleration[1]*progress;
        this.buffTime -= progress;
        if (this.buffTime <= 0){
            this.buffTime = 0;
            this.setState(PlayerState.Jump);
            this.acceleration = [...GRAVITY_ACCELERATION];
        }
        if (this.vector[1] >= 0){
            if (this.state == PlayerState.Jump){
                this.setState(PlayerState.Fall);
            }
        }
    }
    setVectorDirection(direction: Direction){
        this.direction = direction;
        switch(direction){
            case Direction.Left:
            {
                this.vector[0] = - PLAYER_VECTOR_DIRECTION;
                break;
            }
            default:
            {
                this.vector[0] = PLAYER_VECTOR_DIRECTION;
                break;
            }
        }
    }
    setVector(vector: [number, number]){
        this.vector = vector;
    }
    setVectorX(x: number){
        this.vector[0] = x;
    }
    setVectorY(y: number){
        this.vector[1] = y;
    }
    setAcceleration(acceleration: [number, number]){
        this.acceleration = acceleration;
    }
    getVector(){
        return this.vector;
    }
    getState(){
        return this.state;
    }
    update(progress: number){
        this.autoFall(progress);
    }
    setBuffTime(time: number){
        this.buffTime = time;
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
    
    autoFallInStartState(progress: number){
        this.position[0] += this.vector[0]*progress;
        this.position[1] += this.vector[1]*progress;
        this.vector[0] += this.acceleration[0]*progress;
        this.vector[1] += this.acceleration[1]*progress;
        if (this.vector[1] >= 0){
            if (this.state == PlayerState.Jump){
                this.setState(PlayerState.Fall);
            }
        }
    }
}