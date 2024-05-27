import {
    BACKGROUND_POSITION,
    BOTTOM_BACKGROUND_POSITION,
    GAME_OVER_POSITION,
    MENU_BUTTON_POSITION,
    PLAY_AGAIN_BUTTON_POSITION,
    SCORE_POSITION,
    TOP_BACKGROUND_POSITION,
    YOUR_HIGH_SCORE_POSITION,
    YOUR_NAME_POSITION,
    YOUR_SCORE_POSITION,
} from '../constants/FixedPosition'
import {
    BackgroundSprite,
    BottomBackgroundSprite,
    GameOverSprite,
    MenuButtonSprite,
    PlayAgainButtonSprite,
    TopBackgroundSprite,
} from '../constants/ResourcePath'
import { ImageGameObject } from '../../game-engine/game-objects/ImageGameObject'
import { GameObject } from '../../game-engine/game-objects/GameObject'
import { Scene } from '../../game-engine/scene-handler/Scene'
import { TextGameObject } from '../../game-engine/game-objects/TextGameObject'
import { DataManager } from '../DataManager'
import { Button } from '../../game-engine/game-objects/Button'
import { StartScene } from './StartScene'
import { PlayingScene } from './PlayingScene'
import { YOUR_HIGH_SCORE_SIZE, YOUR_NAME_SIZE, YOUR_SCORE_SIZE } from '../constants/Bounds'

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
    private highScore: number
    private dataManager: DataManager
    constructor() {
        super()
        this.dataManager = DataManager.getInstance()
        this.loadResources()

        // TODO: replace these lines of code with the input handler
        const canvas = document.getElementById('game') as HTMLCanvasElement
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

        // load high score
        this.highScore = this.dataManager.getHighScore()

        // load name
        this.playerName = this.dataManager.getPlayerName()

        // load your score object
        this.yourScoreObject = new TextGameObject('YOUR SCORE: ' + this.score.toString())
        this.yourScoreObject.setPosition([...YOUR_SCORE_POSITION])
        this.yourScoreObject.setHeight(YOUR_SCORE_SIZE)

        // load your high score object

        this.yourHighScoreObject = new TextGameObject(
            'YOUR HIGH SCORE: ' + this.highScore.toString()
        )
        this.yourHighScoreObject.setPosition([...YOUR_HIGH_SCORE_POSITION])
        this.yourHighScoreObject.setHeight(YOUR_HIGH_SCORE_SIZE)

        // load your name object
        this.yourNameObject = new TextGameObject('YOUR NAME: ' + this.playerName)
        this.yourNameObject.setPosition([...YOUR_NAME_POSITION])
        this.yourNameObject.setHeight(YOUR_NAME_SIZE)

        // load play again button
        this.playAgainButton = new Button(PlayAgainButtonSprite)
        this.playAgainButton.setPosition([...PLAY_AGAIN_BUTTON_POSITION])

        // load main menu button
        this.menuButton = new Button(MenuButtonSprite)
        this.menuButton.setPosition([...MENU_BUTTON_POSITION])
    }

    processInput(): void {
        if (this.mouseInput.clicked(this.playAgainButton)) {
            this.dataManager.reset()
            this.context.transitionTo(new PlayingScene())
        } else if (this.mouseInput.clicked(this.menuButton)) {
            this.context.transitionTo(new StartScene())
        }
    }

    update(deltaTime: number): void {}

    render(): void {
        // display background
        this.background.display()

        // display top background
        this.topBackground.display()

        // display bottom background
        this.bottomBackground.display()

        // display game over background
        this.gameOverBackground.display()

        // display play again button
        this.playAgainButton.display()

        // display menu button
        this.menuButton.display()

        // display score object
        this.yourScoreObject.display()

        // display high score object
        this.yourHighScoreObject.display()

        // display name object
        this.yourNameObject.display()
    }
}
