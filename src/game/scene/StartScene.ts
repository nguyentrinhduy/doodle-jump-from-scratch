import { DataManager } from '../DataManager'
import { Button } from '../../game-engine/game-objects/Button'
import { Camera } from '../../game-engine/camera/Camera'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { NormalLand } from '../land/NormalLand'
import { Player } from '../player/Player'
import { PlayerState } from '../player/PlayerState'
import { SpriteFactory } from '../../game-engine/resource-factory/SpriteFactory'
import { BackgroundSprite, MainMenuSprite, PlayButtonSprite } from '../constants/ResourcePath'
import { PlayingScene } from './PlayingScene'
import { Scene } from '../../game-engine/scene-handler/Scene'
import {
    BACKGROUND_POSITION,
    LAND_POSITION_IN_START_SCENE,
    PLAY_BUTTON_POSITION,
} from '../constants/FixedPosition'
import {
    PLAYER_START_POSITION_IN_START_SCENE,
    PLAYER_START_VELOCITY,
    PLAYER_START_VELOCITY_IN_START_SCENE,
} from '../constants/Player'
import { WINDOW_HEIGHT } from '../constants/Bounds'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { ISceneContext } from '../../game-engine/scene-handler/ISceneContext'

export class StartScene extends Scene {
    private background: ImageGameObject
    private playButton: Button
    private player: Player
    private scoreButton: Button
    private land: NormalLand
    private canvas: HTMLCanvasElement
    private UIgameObjects: GameObject[]
    private gameObjects: GameObject[]
    constructor() {
        super()
        this.gameObjects = []
        this.UIgameObjects = []
        this.loadResources()
    }
    private loadResources() {
        // load Background
        this.background = new ImageGameObject(MainMenuSprite)
        this.background.setHeight(WINDOW_HEIGHT)
        this.background.setPosition(BACKGROUND_POSITION)
        this.background.setDepth(1)

        // load Player
        this.player = new Player()
        this.player.setPosition(PLAYER_START_POSITION_IN_START_SCENE)
        this.player.setVelocity(PLAYER_START_VELOCITY_IN_START_SCENE)
        this.player.setDepth(2)

        // load PlayButton
        this.playButton = new Button(PlayButtonSprite)
        this.playButton.setPosition(PLAY_BUTTON_POSITION)
        this.playButton.setDepth(4)

        // load Land
        this.land = new NormalLand()
        this.land.setPosition(LAND_POSITION_IN_START_SCENE)
        this.land.setDepth(3)

        this.UIgameObjects.push(this.background)
        this.UIgameObjects.push(this.playButton)
        this.UIgameObjects.sort((a, b) => {
            if (a.getDepth() < b.getDepth()) {
                return 1
            }
            return 0
        })
        this.gameObjects.push(this.player)
        this.gameObjects.push(this.land)
        this.gameObjects.sort((a, b) => {
            if (a.getDepth() < b.getDepth()) {
                return 1
            }
            return 0
        })
        
    }

    processInput(): void {
        if (this.mouseInput.clicked(this.playButton)) {
            let dataManager = DataManager.getInstance()
            dataManager.reset()
            let lands = dataManager.getLands()
            lands.push(this.land)
            dataManager.setPlayer(this.player)
            this.context.transitionTo(new PlayingScene())
        }
    }

    update(deltaTime: number): void {
        this.player.autoFall(deltaTime)
        if (this.player.standOn(this.land)) {
            if (this.player.getState() == PlayerState.Fall) {
                this.land.onJumped(this.player)
            }
        }
    }

    render(): void {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas!.getContext('2d')
        if (ctx) {
            // clear the whole canvas first
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // this.background.render(this.camera)
            let UIindex = 0
            let gameIndex = 0
            while (UIindex < this.UIgameObjects.length && gameIndex < this.gameObjects.length) {
                if (this.UIgameObjects[UIindex].getDepth() <= this.gameObjects[gameIndex].getDepth()) {
                    this.UIgameObjects[UIindex].render(this.camera)
                    UIindex++
                }
                else {
                    this.gameObjects[gameIndex].render(this.camera)
                    gameIndex++
                }
            }
            while(UIindex < this.UIgameObjects.length) {
                this.UIgameObjects[UIindex].render(this.camera)
                UIindex++
            }
            while(gameIndex < this.gameObjects.length) {
                this.gameObjects[gameIndex].render(this.camera)
                gameIndex++
            }
        }
    }
}
