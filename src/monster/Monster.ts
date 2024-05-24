import { AnimationView } from "../gameEngine/AnimationView";
import { View } from "../gameEngine/View";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";

export abstract class Monster extends AnimationView{
    protected vector: [number, number];
    constructor(state: string[]){
        super(state);
    }
    onCollision(player: Player){
        player.setState(PlayerState.Lose);
    }
    abstract move(progress: number): void;
}