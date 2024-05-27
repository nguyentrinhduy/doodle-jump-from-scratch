import { AnimationGameObject } from '../../game-engine/game-objects/AnimationGameObject'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'

export enum MonsterType{
    None = 0,
    BlueWingsMonster = 1,
    AlienMonster = 2,
}
export abstract class Monster extends AnimationGameObject {
    protected abstract velocity: [number, number]
    constructor(Scene: string[]) {
        super(Scene)
    }
    onCollision(player: Player) {
        player.setState(PlayerState.Lose)
    }
    abstract move(deltaTime: number): void
}
