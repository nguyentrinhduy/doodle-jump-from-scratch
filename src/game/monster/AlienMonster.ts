import { Position } from '../../game-engine/game-objects/Position'
import { WINDOW_WIDTH } from '../constants/Bounds'
import { MONSTERS_DEPTH } from '../constants/Depths'
import { ALIEN_MONSTER_INITIAL_VELOCITY } from '../constants/Monsters'
import { AlienMonsterSprite } from '../constants/ResourcePath'
import { Monster } from './Monster'

export class AlienMonster extends Monster {
    protected velocity: Position
    constructor() {
        super(AlienMonsterSprite)
        this.requestSingleAnimation(0)
        this.velocity = new Position(0, 0)
        this.velocity.set(ALIEN_MONSTER_INITIAL_VELOCITY)
        this.depth = MONSTERS_DEPTH
    }
    move(deltaTime: number): void {
        if (this.position.getX() >= WINDOW_WIDTH - this.size.getWidth()) {
            this.position.setX(WINDOW_WIDTH - this.size.getWidth())
            this.velocity.setX(-this.velocity.getX())
            this.requestSingleAnimation(1)
        } else if (this.position.getX() <= 0) {
            this.position.setX(0)
            this.velocity.setX(-this.velocity.getX())
            this.requestSingleAnimation(0)
        }
        this.position.setY(this.position.getY() + deltaTime * this.velocity.getY())
        this.position.setX(this.position.getX() + deltaTime * this.velocity.getX())
    }
}
