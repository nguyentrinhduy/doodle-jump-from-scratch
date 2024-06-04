import { Camera } from '../game-engine/camera/Camera'
import { Buff } from './buff/Buff'
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
    private buffs: Buff[]
    private playerName: string
    private score: number
    private static instance: DataManager
    private playerCamera: Camera
    private highScore: number
    private difficulty: number
    private constructor() {
        this.highScore = 0
        this.reset()
    }

    reset() {
        this.player = new Player()
        this.playerCamera = new Camera()
        this.playerCamera.focusOn(this.player)
        this.playerCamera.setTopBound(TOP_BOUND)
        this.lands = []
        this.bullets = []
        this.monsters = []
        this.buffs = []
        this.playerName = 'Unknown Player'
        this.score = 0
        this.difficulty = 0
    }

    static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }

    setPlayer(player: Player) {
        this.player = player
        this.playerCamera.focusOn(this.player)
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

    getBuffs() {
        return this.buffs
    }
    
    getPlayerCamera() {
        return this.playerCamera
    }

    getScore() {
        return this.score
    }

    getPlayerName() {
        return this.playerName
    }

    setScore(score: number) {
        this.score = score
        this.highScore = Math.max(this.highScore, this.score)
    }

    getHighScore() {
        return this.highScore
    }

    setDifficulty(difficulty: number) {
        this.difficulty = difficulty
    }
    getDifficulty() {
        return this.difficulty
    }
}
