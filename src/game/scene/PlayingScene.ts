import { DataManager } from '../DataManager'
import { Button } from '../../game-engine/game-objects/Button'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Player } from '../player/Player'
import { BackgroundSprite, PauseButtonSprite, TopBackgroundSprite } from '../constants/ResourcePath'
import { PauseScene } from './PauseScene'
import { Scene } from '../../game-engine/scene-handler/Scene'
import {
    BACKGROUND_POSITION,
    PAUSE_BUTTON_POSITION,
    SCORE_POSITION,
    TOP_BACKGROUND_POSITION,
} from '../constants/FixedPosition'
import { Direction, PlayerState } from '../player/PlayerState'
import { EndScene } from './EndScene'
import { ILand, Land, LandType } from '../land/ILand'
import { Monster, MonsterType } from '../monster/Monster'
import {
    BULLET_UP_VELOCITY,
    PLAYER_SHOOTING_TIME,
    PLAYER_START_POSITION,
    PLAYER_START_VELOCITY,
} from '../constants/Player'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { Bullet } from '../player/Bullet'
import {
    DIFFICULTY_RATIO,
    SCORE_PLAYING_SCENE_SIZE,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
} from '../constants/Bounds'
import { NormalLand } from '../land/NormalLand'
import { LAND_HEIGHT, LAND_WIDTH } from '../constants/Land'
import { MovingLand } from '../land/MovingLand'
import { Camera } from '../../game-engine/camera/Camera'
import { MathHandler } from '../../game-engine/math/MathHandler'
import { DustLand } from '../land/DustLand'
import { TextGameObject } from '../../game-engine/game-objects/TextGameObject'
import { BlueWingsMonster } from '../monster/BlueWingsMonster'
import { AlienMonster } from '../monster/AlienMonster'
import { Position } from '../../game-engine/game-objects/Position'
import { Buff } from '../buff/Buff'
import { BACKGROUND_DEPTH, PAUSE_BUTTON_DEPTH, PLAYER_DEPTH, SCORE_OBJECT_DEPTH, TOP_BACKGROUND_DEPTH } from '../constants/Depths'

export class PlayingScene extends Scene {
    private dataManager: DataManager
    private background: ImageGameObject
    private topBackground: ImageGameObject
    private pauseButton: Button
    private scoreObject: TextGameObject
    private score: number
    private player: Player
    private lands: Land[]
    private monsters: Monster[]
    private bullets: Bullet[]
    private bulletReloadTime: number
    private lastStandableLandHeight: number
    private temporaryPlayer: Player | null
    private playerBuff: Buff | null
    private temporaryPlayerBuff: Buff | null
    private buffs: Buff[]
    private playerCamera: Camera
    private UIgameObjects: GameObject[]
    private gameObjects: GameObject[]
    private difficulty: number
    public constructor() {
        super()
        this.dataManager = DataManager.getInstance()
        this.UIgameObjects = []
        this.gameObjects = []
        this.loadResources()
        this.setMapKey()
    }
    private setMapKey(): void {
        this.keyboardInput.setMapKey('ArrowUp', 'Up')
        this.keyboardInput.setMapKey('w', 'Up')
        this.keyboardInput.setMapKey('ArrowLeft', 'Left')
        this.keyboardInput.setMapKey('a', 'Left')
        this.keyboardInput.setMapKey('ArrowDown', 'Down')
        this.keyboardInput.setMapKey('s', 'Down')
        this.keyboardInput.setMapKey('ArrowRight', 'Right')
        this.keyboardInput.setMapKey('d', 'Right')
    }
    private loadResources(): void {
        // set null for temporary player
        this.temporaryPlayer = null

        // load player
        this.player = this.dataManager.getPlayer()
        this.player.setDepth(PLAYER_DEPTH)
        this.gameObjects.push(this.player)

        // load lands
        this.lands = this.dataManager.getLands()
        this.lands.forEach(element => {
            this.gameObjects.push(element)
        });

        // load monsters
        this.monsters = this.dataManager.getMonsters()
        this.gameObjects.push(...this.monsters)

        // load bullets
        this.bullets = this.dataManager.getBullets()
        this.gameObjects.push(...this.bullets)

        // load buffs
        this.buffs = this.dataManager.getBuffs() 
        this.gameObjects.push(...this.buffs)

        // load background
        this.background = new ImageGameObject(BackgroundSprite)
        this.background.setPosition(BACKGROUND_POSITION)
        this.background.setDepth(BACKGROUND_DEPTH)
        this.UIgameObjects.push(this.background)

        // load top background
        this.topBackground = new ImageGameObject(TopBackgroundSprite)
        this.topBackground.setPosition(TOP_BACKGROUND_POSITION)
        this.topBackground.setDepth(TOP_BACKGROUND_DEPTH)
        this.UIgameObjects.push(this.topBackground)

        // load pause button
        this.pauseButton = new Button(PauseButtonSprite)
        this.pauseButton.scaleSize(1.5)
        this.pauseButton.setPosition(PAUSE_BUTTON_POSITION)
        this.pauseButton.setDepth(PAUSE_BUTTON_DEPTH)
        this.UIgameObjects.push(this.pauseButton)

        // load camera
        this.playerCamera = this.dataManager.getPlayerCamera()

        // load score
        this.score = this.dataManager.getScore()
        this.scoreObject = new TextGameObject(this.score.toString())
        this.scoreObject.setPosition(SCORE_POSITION)
        this.scoreObject.setHeight(SCORE_PLAYING_SCENE_SIZE)
        this.scoreObject.setDepth(SCORE_OBJECT_DEPTH)
        this.UIgameObjects.push(this.scoreObject)

        // load difficulty
        this.difficulty = this.dataManager.getDifficulty()

        // sort game objects following depths
        this.UIgameObjects.sort((a, b) => a.getDepth() - b.getDepth())

        this.gameObjects.sort((a, b) => a.getDepth() - b.getDepth())
    }

    public processInput(): void {
        this.mouseInputProcessing()
        this.keyboardInputProcessing()
    }

    public render(): void {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let sorted = true

        // remove invisible elements
        for (let index = 0; index < this.gameObjects.length; index ++) {
            while(index < this.gameObjects.length && !this.gameObjects[index].isVisible()) {
                this.gameObjects.splice(index, 1)
                sorted = false
            }
        }
        
        // sorting following depths
        if (!sorted) {
            this.gameObjects.sort((a, b) => a.getDepth() - b.getDepth())
        }

        // render
        let UIindex = 0
        let gameIndex = 0
        while (UIindex < this.UIgameObjects.length && gameIndex < this.gameObjects.length) {
            if (this.UIgameObjects[UIindex].getDepth() <= this.gameObjects[gameIndex].getDepth()) {
                this.UIgameObjects[UIindex].render(this.camera)
                UIindex++
            }
            else {
                this.gameObjects[gameIndex].render(this.playerCamera)
                gameIndex++
            }
        }
        while(UIindex < this.UIgameObjects.length) {
            this.UIgameObjects[UIindex].render(this.camera)
            UIindex++
        }
        while(gameIndex < this.gameObjects.length) {
            this.gameObjects[gameIndex].render(this.playerCamera)
            gameIndex++
        }
        console.log(this.gameObjects.length)
    }

    public update(deltaTime: number): void {
        this.checkCollidesMonster()
        if (
            (this.playerCamera.isOutOfBottomRange(this.player) &&
                this.player.getState() == PlayerState.Fall) ||
            this.player.getState() == PlayerState.Lose
        ) {
            this.dataManager.setScore(this.score)
            this.dataManager.setDifficulty(this.difficulty)
            this.context.transitionTo(new EndScene())
            return
        }
        this.lands.forEach((element) => {
            if (this.player.getVelocityY() > 0) {
                if (this.player.standOn(element)) {
                    element.onJumped(this.player)
                } else if (this.temporaryPlayer && this.temporaryPlayer.standOn(element)) {
                    element.onJumped(this.temporaryPlayer)
                    let position = this.player.getPosition()
                    this.player.setVisible(false)
                    this.player = this.temporaryPlayer.clone()
                    this.playerCamera.focusOn(this.player)
                    this.player.setPosition(position)
                    this.gameObjects.push(this.player)
                }
            }
        })
        this.updateMap(deltaTime)
        this.bullets.forEach((element) => {
            element.move(deltaTime)
        })
        this.player.autoFall(deltaTime)
        this.score = Math.round(
            Math.max(this.score, PLAYER_START_POSITION.getY() - this.player.getPositionY())
        )
        if (this.player.getPositionX() < 0) {
            if (this.player.getPositionX() + this.player.getWidth() > 0) {
                let need = false
                if (this.temporaryPlayer) {
                    this.temporaryPlayer.setVisible(false)
                    this.temporaryPlayer.getBuff()?.setVisible(false)
                }
                this.temporaryPlayer = this.player.clone()
                this.temporaryPlayer.setPositionX(this.player.getPositionX() + WINDOW_WIDTH)
                this.gameObjects.push(this.temporaryPlayer)
                if (this.temporaryPlayer.getBuff()) {
                    this.gameObjects.push(this.temporaryPlayer.getBuff()!)
                }
            } else {
                this.player.setVisible(false)
                this.player = this.temporaryPlayer!
                this.playerCamera.focusOn(this.player)
                this.temporaryPlayer = null
            }
        } else if (this.player.getPositionX() + this.player.getWidth() > WINDOW_WIDTH) {
            if (this.player.getPositionX() < WINDOW_WIDTH) {
                if (this.temporaryPlayer) {
                    this.temporaryPlayer.setVisible(false)
                    this.temporaryPlayer.getBuff()?.setVisible(false)
                }
                this.temporaryPlayer = this.player.clone()
                this.temporaryPlayer.setPositionX(this.player.getPositionX() - WINDOW_WIDTH)
                this.gameObjects.push(this.temporaryPlayer)
                if (this.temporaryPlayer.getBuff()) {
                    this.gameObjects.push(this.temporaryPlayer.getBuff()!)
                }
            } else {
                this.player.setVisible(false)
                this.player = this.temporaryPlayer!
                this.playerCamera.focusOn(this.player)
                this.temporaryPlayer = null
            }
        } else {
            if (this.temporaryPlayer) this.temporaryPlayer.setVisible(false)
            this.temporaryPlayer = null
        }
        this.scoreObject.setText(this.score.toString())
        this.playerCamera.update()
        this.difficulty = this.score * DIFFICULTY_RATIO
    }
    private checkCollidesMonster(): void {
        // check if a bullet collides a monsters
        for (let iMonster = 0; iMonster < this.monsters.length; iMonster++) {
            for (let iBullet = 0; iBullet < this.bullets.length; iBullet++) {
                if (this.monsters[iMonster].collides(this.bullets[iBullet])) {
                    this.monsters[iMonster].setVisible(false)
                    this.monsters.splice(iMonster, 1)
                    this.bullets[iBullet].setVisible(false)
                    this.bullets.splice(iBullet, 1)
                    return
                }
            }
            if (this.monsters[iMonster].collides(this.player)) {
                if (
                    this.player.standOn(this.monsters[iMonster]) &&
                    this.player.getVelocityY() > 0
                ) {
                    this.monsters[iMonster].setVisible(false)
                    this.monsters.splice(iMonster, 1)
                    this.player.setVelocity(PLAYER_START_VELOCITY)
                    if (this.temporaryPlayer) {
                        this.temporaryPlayer.setVelocity(PLAYER_START_VELOCITY)
                    }
                    if (this.player.getState() != PlayerState.ShootUp) {
                        this.player.setState(PlayerState.Jump)
                        if (this.temporaryPlayer) {
                            this.temporaryPlayer.setState(PlayerState.Jump)
                        }
                    }
                } else {
                    this.player.setState(PlayerState.Lose)
                }
                return
            }
        }
    }
    private updateMap(deltaTime: number): void {
        // remove stuffs below the camera
        while (this.lands.length > 0 && this.playerCamera.isOutOfBottomRange(this.lands[0])) {
            this.lands[0].setVisible(false)
            this.lands.shift()
        }
        while (
            this.monsters.length > 0 &&
            (this.playerCamera.isOutOfBottomRange(this.monsters[0]) || this.player.getBuff())
        ) {
            this.monsters[0].setVisible(false)
            this.monsters.shift()
        }
        while (this.bullets.length > 0 && this.playerCamera.isOutOfRange(this.bullets[0])) {
            this.bullets[0].setVisible(false)
            this.bullets.shift()
        }
        while (this.buffs.length > 0 && this.playerCamera.isOutOfBottomRange(this.buffs[0])) {
            this.buffs[0].setVisible(false)
            this.buffs.shift()
        }
        // add stuffs above the camera
        let mathHandler = MathHandler.getInstance()
        while (
            this.lands.length == 0 ||
            this.lands[this.lands.length - 1].getPositionY() - this.playerCamera.getOffsetY() >= 50
        ) {
            let previousHeight = WINDOW_HEIGHT
            if (this.lands.length > 0) {
                previousHeight = this.lands[this.lands.length - 1].getPositionY()
            }
            let randomNum = mathHandler.getRandomInt(0, 3)
            if (previousHeight - this.lastStandableLandHeight >= 30) {
                randomNum = mathHandler.getRandomInt(0, 1)
            }

            switch (randomNum) {
                case LandType.NormalLand: {
                    let newLand = new NormalLand()
                    newLand.setPosition(new Position(
                        mathHandler.getRandomFloat(0, WINDOW_WIDTH - newLand.getWidth()),
                        mathHandler.getRandomFloat(
                            previousHeight - LAND_HEIGHT - 30 - Math.min(10, this.difficulty),
                            previousHeight - LAND_HEIGHT - 10 - Math.min(20, this.difficulty)
                        ),
                    ))
                    let buff = newLand.randomizeBuff()
                    if (buff) {
                        this.buffs.push(buff)
                        this.gameObjects.push(buff)
                    }
                    this.lastStandableLandHeight = newLand.getPositionY()
                    this.lands.push(newLand)
                    this.gameObjects.push(newLand)
                    break
                }
                case LandType.MovingLand: {
                    let newLand = new MovingLand()
                    newLand.setPosition(new Position(
                        mathHandler.getRandomFloat(0, WINDOW_WIDTH - newLand.getWidth()),
                        mathHandler.getRandomFloat(
                            previousHeight - LAND_HEIGHT - 30 - Math.min(10, this.difficulty),
                            previousHeight - LAND_HEIGHT - 10 - Math.min(20, this.difficulty)
                        ),
                    ))
                    let buff = newLand.randomizeBuff()
                    if (buff) {
                        this.buffs.push(buff)
                        this.gameObjects.push(buff)
                    }
                    this.lastStandableLandHeight = newLand.getPositionY()
                    this.lands.push(newLand)
                    this.gameObjects.push(newLand)
                    break
                }
                case LandType.DustLand: {
                    let newLand = new DustLand()
                    newLand.setPosition(new Position(
                        mathHandler.getRandomFloat(0, WINDOW_WIDTH - newLand.getWidth()),
                        mathHandler.getRandomFloat(
                            previousHeight - LAND_HEIGHT - 30 - Math.min(10, this.difficulty),
                            previousHeight - LAND_HEIGHT - 10 - Math.min(20, this.difficulty)
                        ),
                    ))
                    let buff = newLand.randomizeBuff()
                    if (buff) {
                        this.buffs.push(buff)
                        this.gameObjects.push(buff)
                    }
                    this.lands.push(newLand)
                    this.gameObjects.push(newLand)
                    break
                }
            }
        }
        while (
            (this.player.getState() == PlayerState.Jump ||
                this.player.getState() == PlayerState.Fall) &&
            (this.monsters.length == 0 ||
                this.monsters[this.monsters.length - 1].getPositionY() - this.playerCamera.getOffsetY() >=
                    700)
        ) {
            let previousHeight = this.playerCamera.getOffsetY()
            if (this.monsters.length > 0) {
                previousHeight = this.monsters[this.monsters.length - 1].getPositionY()
            }
            let randomNum = mathHandler.getRandomInt(0, 3)
            switch (randomNum) {
                case MonsterType.BlueWingsMonster: {
                    let newMonster = new BlueWingsMonster()
                    newMonster.setPosition(new Position(
                        mathHandler.getRandomFloat(0, WINDOW_WIDTH - newMonster.getWidth()),
                        mathHandler.getRandomFloat(
                            previousHeight -
                                newMonster.getHeight() -
                                3000 +
                                Math.min(800, this.difficulty),
                            previousHeight - newMonster.getHeight() - 2000
                        ),
                    ))
                    this.monsters.push(newMonster)
                    this.gameObjects.push(newMonster)
                    break
                }
                case MonsterType.AlienMonster:
                    let newMonster = new AlienMonster()
                    newMonster.setPosition(new Position(
                        mathHandler.getRandomFloat(0, WINDOW_WIDTH - newMonster.getWidth()),
                        mathHandler.getRandomFloat(
                            previousHeight -
                                newMonster.getHeight() -
                                3000 +
                                Math.min(800, this.difficulty),
                            previousHeight - newMonster.getHeight() - 2000
                        ),
                    ))
                    this.monsters.push(newMonster)
                    this.gameObjects.push(newMonster)
                    break
                default: {
                    break
                }
            }
        }
        this.lands.forEach((element) => {
            element.move(deltaTime)
        })

        this.monsters.forEach((element) => {
            element.move(deltaTime)
            element.update(deltaTime)
        })
    }

    private mouseInputProcessing(): void {
        if (this.mouseInput.clicked(this.pauseButton)) {
            this.dataManager.setScore(this.score)
            this.context.transitionTo(new PauseScene())
        }
    }

    private keyboardInputProcessing(): void {
        // key up
        // release a or release arrow left
        if (this.keyboardInput.keyReleased('a') || this.keyboardInput.keyReleased('ArrowLeft')) {
            this.player.setVelocityX(0)
        }
        // release d or release arrow right
        else if (
            this.keyboardInput.keyReleased('d') ||
            this.keyboardInput.keyReleased('ArrowRight')
        ) {
            this.player.setVelocityX(0)
        }
        // release w or release arrow up
        if (this.keyboardInput.keyReleased('w') || this.keyboardInput.keyReleased('ArrowUp')) {
            this.player.setShootAllowed(true)
        }

        // key down
        // press a or press arrow left
        if (this.keyboardInput.keyDown('a') || this.keyboardInput.keyDown('ArrowLeft')) {
            this.player.setVelocityDirection(Direction.Left)
        }
        // press d or press arrow right
        else if (this.keyboardInput.keyDown('d') || this.keyboardInput.keyDown('ArrowRight')) {
            this.player.setVelocityDirection(Direction.Right)
        }
        // press w or press arrow up
        if (this.keyboardInput.keyDown('w') || this.keyboardInput.keyDown('ArrowUp')) {
            if (
                this.player.getState() == PlayerState.Fall ||
                this.player.getState() == PlayerState.Jump ||
                this.player.getState() == PlayerState.ShootUp
            ) {
                if (this.player.getShootAllowed()) {
                    this.bullets.push(this.player.shoot(BULLET_UP_VELOCITY))
                    this.player.setShootAllowed(false)
                }
                this.player.setState(PlayerState.ShootUp)
                this.player.setSpecialStateTime(PLAYER_SHOOTING_TIME)
            }
        }
    }
}
