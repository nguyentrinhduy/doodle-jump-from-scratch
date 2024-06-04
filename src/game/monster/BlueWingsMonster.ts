import { Position } from '../../game-engine/game-objects/Position'
import { WINDOW_WIDTH } from '../constants/Bounds'
import { MONSTERS_DEPTH } from '../constants/Depths'
import { BLUE_WINGS_MONSTER_INITIAL_VELOCITY } from '../constants/Monsters'
import { BlueWingsMonsterSprite } from '../constants/ResourcePath'
import { Monster } from './Monster'

export class BlueWingsMonster extends Monster {
    protected velocity: Position
    constructor() {
        super(BlueWingsMonsterSprite)
        this.velocity = new Position(0, 0)
        this.velocity.set(BLUE_WINGS_MONSTER_INITIAL_VELOCITY)
        this.requestLoopAnimation()
        this.depth = MONSTERS_DEPTH
    }
    move(deltaTime: number): void {
        if (this.position.getX() >= WINDOW_WIDTH - this.size.getWidth()) {
            this.position.setX(WINDOW_WIDTH - this.size.getWidth())
            this.velocity.setX(-this.velocity.getX())
        } else if (this.position.getX() <= 0) {
            this.position.setX(0)
            this.velocity.setX(-this.velocity.getX())
        }
        this.position.setY(this.position.getY() + deltaTime * this.velocity.getY())
        this.position.setX(this.position.getX() + deltaTime * this.velocity.getX())
    }
}
