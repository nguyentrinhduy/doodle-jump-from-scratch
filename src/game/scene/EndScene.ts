import { BACKGROUND_POSITION, BOTTOM_BACKGROUND_POSITION, GAME_OVER_POSITION, MENU_BUTTON_POSITION, PLAY_AGAIN_BUTTON_POSITION, SCORE_POSITION, TOP_BACKGROUND_POSITION, YOUR_HIGH_SCORE_POSITION, YOUR_NAME_POSITION } from '../constants/FixedPosition'
import { BackgroundSprite, BottomBackgroundSprite, GameOverSprite, MenuButtonSprite, PlayAgainButtonSprite, TopBackgroundSprite } from '../constants/ResourcePath'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Scene } from '../../game-engine/scene-handler/Scene'
import { TextGameObject } from '../../game-engine/game-objects/TextGameObject'
import { DataManager } from '../DataManager'
import { Button } from '../../game-engine/game-objects/Button'

export class EndScene extends Scene {
    private background: ImageGameObject
    private topBackground: ImageGameObject
    private bottomBackground: ImageGameObject
    private gameOverBackground: ImageGameObject
    private yourScoreObject: TextGameObject
    private yourHighScoreObject: TextGameObject
    private yourNameObject: TextGameObject
    private playAgainButton: Button
    private menuButton: Button
    private playerName: string
    private score: number
    private dataManager: DataManager
    constructor() {
        super()
        this.dataManager = DataManager.getInstance()
        this.loadResources()
    }
    private loadResources() {
        // load background
        this.background = new ImageGameObject(BackgroundSprite)
        this.background.setPosition([...BACKGROUND_POSITION])

        // load top background
        this.topBackground = new ImageGameObject(TopBackgroundSprite)
        this.topBackground.setPosition([...TOP_BACKGROUND_POSITION])

        // load bottom background
        this.bottomBackground = new ImageGameObject(BottomBackgroundSprite)
        this.bottomBackground.setPosition([...BOTTOM_BACKGROUND_POSITION])

        // load game over background
        this.gameOverBackground = new ImageGameObject(GameOverSprite)
        this.gameOverBackground.setPosition([...GAME_OVER_POSITION])

        // load score
        this.score = this.dataManager.getScore()

        // load your score object
        this.yourScoreObject = new TextGameObject() 
        this.yourScoreObject.setPosition([...SCORE_POSITION])

        // load your high score object

        this.yourHighScoreObject = new TextGameObject()
        this.yourHighScoreObject.setPosition([...YOUR_HIGH_SCORE_POSITION])

        // load your name object
        this.yourNameObject = new TextGameObject()
        this.yourNameObject.setPosition([...YOUR_NAME_POSITION])

        // load play again button
        this.playAgainButton = new Button(PlayAgainButtonSprite)
        this.playAgainButton.setPosition([...PLAY_AGAIN_BUTTON_POSITION])

        // load main menu button
        this.menuButton = new Button(MenuButtonSprite)
        this.menuButton.setPosition([...MENU_BUTTON_POSITION])
    }

    processInput(): void {}

    update(deltaTime: number): void {}

    render(): void {
        this.background.display()
        this.topBackground.display()
        this.bottomBackground.display()
        this.gameOverBackground.display()
        this.yourScoreObject.display()
        this.yourHighScoreObject.display()
        this.yourNameObject.display()
        this.playAgainButton.display()
        this.menuButton.display()
    }
}
