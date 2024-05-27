import { WINDOW_WIDTH } from '../constants/Bounds'
import { BLUE_WINGS_MONSTER_INITIAL_VELOCITY } from '../constants/Monsters'
import { BlueWingsMonsterSprite } from '../constants/ResourcePath'
import { Monster } from './Monster'

export class BlueWingsMonster extends Monster {
    protected velocity: [number, number]
    constructor() {
        super(BlueWingsMonsterSprite)
        this.velocity = [...BLUE_WINGS_MONSTER_INITIAL_VELOCITY]
        this.requestLoopAnimation()
    }
    move(deltaTime: number): void {
        if (this.position[0] >= WINDOW_WIDTH - this.size[0]) {
            this.position[0] = WINDOW_WIDTH - this.size[0]
            this.velocity[0] = -this.velocity[0]
        } else if (this.position[0] <= 0) {
            this.position[0] = 0
            this.velocity[0] = -this.velocity[0]
        }
        this.position[1] += deltaTime * this.velocity[1]
        this.position[0] += deltaTime * this.velocity[0]
    }
}
