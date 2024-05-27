import { WINDOW_WIDTH } from "../constants/Bounds";
import { AlienMonsterSprite } from "../constants/ResourcePath";
import { Monster } from "./Monster";

export class AlienMonster extends Monster {
    protected velocity: [number, number];
    constructor() {
        super(AlienMonsterSprite)
        this.requestSingleAnimation(0)
    }
    move(deltaTime: number): void {
        if (this.position[0] >= WINDOW_WIDTH - this.size[0]) {
            this.position[0] = WINDOW_WIDTH - this.size[0]
            this.velocity[0] = -this.velocity[0]
            this.requestSingleAnimation(1)
        } else if (this.position[0] <= 0) {
            this.position[0] = 0
            this.velocity[0] = -this.velocity[0]
            this.requestSingleAnimation(0)
        }
        this.position[1] += deltaTime * this.velocity[1]
        this.position[0] += deltaTime * this.velocity[0]
    }
}