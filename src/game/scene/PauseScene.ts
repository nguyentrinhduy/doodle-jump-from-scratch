import { Button } from '../../game-engine/game-objects/Button'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import {
    PauseBackgroundSprite,
    ResumeButtonSprite,
    TopBackgroundSprite,
} from '../constants/ResourcePath'
import { PlayingScene } from './PlayingScene'
import { Scene } from '../../game-engine/scene-handler/Scene'
import {
    BACKGROUND_POSITION,
    PAUSE_BUTTON_POSITION,
    RESUME_BUTTON_POSITION,
    TOP_BACKGROUND_POSITION,
} from '../constants/FixedPosition'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'

export class PauseScene extends Scene {
    resumeButton: Button
    background: ImageGameObject
    topBackground: ImageGameObject
    constructor() {
        super()
        this.loadResources()
        // TODO: remove these lines of code with input handler in game engine
        const canvas = document.getElementById('game') as HTMLCanvasElement
    }
    loadResources() {
        // load background
        this.background = new ImageGameObject(PauseBackgroundSprite)
        this.background.setPosition([...BACKGROUND_POSITION])

        // load topBackground
        this.topBackground = new ImageGameObject(TopBackgroundSprite)
        this.topBackground.setPosition([...TOP_BACKGROUND_POSITION])

        // load resume button
        this.resumeButton = new Button(ResumeButtonSprite)
        this.resumeButton.scaleSize(1.2)
        this.resumeButton.setPosition([...RESUME_BUTTON_POSITION])
    }
    render(): void {
        this.background.display()
        this.topBackground.display()
        this.resumeButton.display()
    }

    processInput(): void {
        if (this.mouseInput.clicked(this.resumeButton)) {
            this.context.transitionTo(new PlayingScene())
        }
    }
    update(deltaTime: number): void {
        // none
    }
}
