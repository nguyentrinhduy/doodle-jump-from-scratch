import { Camera } from '../game-engine/camera/Camera'
import { TOP_BOUND } from './constants/Bounds'
import { ILand, Land, LandType } from './land/ILand'
import { Monster } from './monster/Monster'
import { Bullet } from './player/Bullet'
import { Player } from './player/Player'

export class DataManager {
    private player: Player
    private bullets: Bullet[]
    private lands: Land[]
    private monsters: Monster[]
    private playerName: string
    private score: number
    private static instance: DataManager
    private camera: Camera
    private constructor() {
        this.reset()
    }

    reset() {
        this.player = new Player()
        this.camera = new Camera()
        this.camera.focusOn(this.player)
        this.camera.setTopBound(TOP_BOUND)
        this.lands = []
        this.bullets = []
        this.monsters = []
        this.playerName = 'Unknown Player'
        this.score = 0
    }

    static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }

    getPlayer() {
        return this.player
    }

    getLands() {
        return this.lands
    }

    getMonsters() {
        return this.monsters
    }

    getBullets() {
        return this.bullets
    }

    getCamera() {
        return this.camera
    }

    getScore() {
        return this.score
    }

    getPlayerName() {
        return this.playerName
    }

    setScore(score: number) {
        this.score = score
    }
}
