// import { canvas } from "../MainGame";
import { Sprite } from './Sprite'
import {
    AlienMonsterSprite,
    BackgroundSprite,
    BlueWingsMonsterSprite,
    BulletSprite,
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
    BulletSprite,
    PlayerShootSprite,
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
    public static getInstance(): SpriteFactory {
        if (!SpriteFactory.instance) {
            SpriteFactory.instance = new SpriteFactory()
        }
        return SpriteFactory.instance
    }

    public preloadSprites(): void {
        for (const spritePath of INITIAL_SPRITES) {
            this.getSprite(spritePath);
        }

        for (const [animationSpritePath] of INITIAL_ANIMATIONS) {
            this.getAnimationSprite(animationSpritePath);
        }
    }

    private getKey(spriteName: string[]): string {
        return spriteName.join('_')
    }
    public getSprite(spriteName: string[]): Sprite {
        const key = this.getKey(spriteName)
        if (!(key in this.Sprites)) {
            this.Sprites[key] = new Sprite(spriteName)
        }
        return this.Sprites[key]
    }
    public getAnimationSprite(spritesName: string[]): Sprite[] {
        const key = this.getKey(spritesName)
        if (!(key in this.animationSprites)) {
            throw new Error('The desired animation sprite does not exist')
        }
        return this.animationSprites[key]
    }
}
