// import { canvas } from "../MainGame";
import { Sprite } from './Sprite'
import {
    AlienMonsterSprite,
    BackgroundSprite,
    BlueWingsMonsterSprite,
    DustLandSprite,
    GameOverSprite,
    JetpackBuffSprite,
    MainMenuSprite,
    MenuButtonSprite,
    MovingLandSprite,
    NormalLandSprite,
    OptionsButtonSprite,
    PauseBackgroundSprite,
    PauseButtonSprite,
    PlayAgainButtonSprite,
    PlayAgainHoverButtonSprite,
    PlayButtonSprite,
    PlayHoverButtonSprite,
    PlayerFallLeftSprite,
    PlayerFallRightSprite,
    PlayerJumpLeftSprite,
    PlayerJumpRightSprite,
    PlayerShootSprite,
    PropellerBuffSprite,
    ResumeButtonSprite,
    SpringBuffSprite,
    TopBackgroundSprite,
} from '../../game/constants/ResourcePath'
import { JetpackBuff } from '../../game/buff/JetpackBuff'

const INITIAL_SPRITES = [
    BackgroundSprite,
    PauseBackgroundSprite,
    TopBackgroundSprite,
    MainMenuSprite,
    PlayerFallLeftSprite,
    PlayerFallRightSprite,
    PlayerJumpLeftSprite,
    PlayerJumpRightSprite,
    PlayerShootSprite,
    PlayButtonSprite,
    PlayHoverButtonSprite,
    PauseButtonSprite,
    OptionsButtonSprite,
    PlayAgainHoverButtonSprite,
    PlayAgainButtonSprite,
    ResumeButtonSprite,
    NormalLandSprite,
    MovingLandSprite,
    GameOverSprite,
    MenuButtonSprite,
]

const INITIAL_ANIMATIONS: [string[], number][] = [
    [PropellerBuffSprite, 4],
    [JetpackBuffSprite, 10],
    [SpringBuffSprite, 2],
    [DustLandSprite, 4],
    [BlueWingsMonsterSprite, 8],
    [AlienMonsterSprite, 2],
]
export class SpriteFactory {
    private Sprites: { [key: string]: Sprite } = <any>{}
    private animationSprites: { [key: string]: Sprite[] } = <any>{}
    private static instance: SpriteFactory

    private constructor() {
        for (const spriteName of INITIAL_SPRITES) {
            this.Sprites[this.getKey(spriteName)] = new Sprite(spriteName)
        }
        for (const spriteInfo of INITIAL_ANIMATIONS) {
            let sprites: Sprite[] = []
            for (let animationIndex = 0; animationIndex < spriteInfo[1]; animationIndex++) {
                let spriteName = [...spriteInfo[0]]
                spriteName.push(animationIndex.toString())
                sprites.push(new Sprite(spriteName))
            }
            this.animationSprites[this.getKey(spriteInfo[0])] = sprites
        }
    }
    public static getInstance() {
        if (!SpriteFactory.instance) {
            SpriteFactory.instance = new SpriteFactory()
        }
        return SpriteFactory.instance
    }

    private getKey(spriteName: string[]): string {
        return spriteName.join('_')
    }
    getSprite(spriteName: string[]): Sprite {
        const key = this.getKey(spriteName)
        if (!(key in this.Sprites)) {
            this.Sprites[key] = new Sprite(spriteName)
        }
        return this.Sprites[key]
    }
    getAnimationSprite(spritesName: string[]): Sprite[] {
        const key = this.getKey(spritesName)
        if (!(key in this.animationSprites)) {
            throw new Error('The desired animation sprite does not exist')
        }
        return this.animationSprites[key]
    }
}
