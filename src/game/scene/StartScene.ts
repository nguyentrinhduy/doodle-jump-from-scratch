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
import { PLAYER_START_POSITION_IN_START_SCENE } from '../constants/Player'
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
    constructor() {
        super()
        this.loadResources()
    }
    private loadResources() {
        // load Background
        this.background = new ImageGameObject(MainMenuSprite)
        this.background.setHeight(WINDOW_HEIGHT)
        this.background.setPosition([...BACKGROUND_POSITION])

        // load Player
        this.player = new Player()
        this.player.setPosition([...PLAYER_START_POSITION_IN_START_SCENE])

        // load PlayButton
        this.playButton = new Button(PlayButtonSprite)
        this.playButton.setPosition([...PLAY_BUTTON_POSITION])

        // load Land
        this.land = new NormalLand()
        this.land.setPosition([...LAND_POSITION_IN_START_SCENE])
    }

    processInput(): void {
        if (this.mouseInput.clicked(this.playButton)) {
            DataManager.getInstance().reset()
            this.context.transitionTo(new PlayingScene())
        }
    }

    update(deltaTime: number): void {
        this.player.autoFallInStartScene(deltaTime)
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

            // draw Background
            this.background.display()

            // draw Land
            this.land.display()

            // draw Player
            this.player.display()

            // draw  PlayButton
            this.playButton.display()
        }
    }
}
