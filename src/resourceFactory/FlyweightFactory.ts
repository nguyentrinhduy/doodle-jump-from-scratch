// import { canvas } from "../MainGame";
import { Flyweight } from "./Flyweight";
import 
{ BackgroundFlyweight, JetpackBuffFlyweight, MainMenuFlyweight, NormalLandFlyweight, OptionsButtonFlyweight, PauseBackgroundFlyweight, PauseButtonFlyweight, PlayAgainButtonFlyweight, PlayAgainHoverButtonFlyweight, PlayButtonFlyweight, PlayHoverButtonFlyweight, PlayerFallLeftFlyweight, PlayerFallRightFlyweight, PlayerJumpLeftFlyweight, PlayerJumpRightFlyweight, PlayerShootFlyweight, PropellerBuffFlyweight, ResumeButtonFlyweight, SpringBuffFlyweight, TopPlayingFlyweight } from "../constants/ResourcePath";
import { JetpackBuff } from "../buff/JetpackBuff";

const INITIAL_FLYWEIGHTS =
[
    BackgroundFlyweight,
    PauseBackgroundFlyweight,
    TopPlayingFlyweight,
    MainMenuFlyweight,
    PlayerFallLeftFlyweight,
    PlayerFallRightFlyweight,
    PlayerJumpLeftFlyweight,
    PlayerJumpRightFlyweight,
    PlayerShootFlyweight,
    PlayButtonFlyweight,
    PlayHoverButtonFlyweight,
    PauseButtonFlyweight,
    OptionsButtonFlyweight,
    PlayAgainHoverButtonFlyweight,
    PlayAgainButtonFlyweight,
    ResumeButtonFlyweight,
    NormalLandFlyweight,
    // PropellerBuffFlyweight,
    // JetpackBuffFlyweight,
    // SpringBuffFlyweight
]

const INITIAL_ANIMATIONS =
[
    
]
export class FlyweightFactory{
    private flyweights: {[key: string]: Flyweight} = <any>{};
    private animationFlyweights: {[key: string]: Flyweight} = <any>{};
    private static instance: FlyweightFactory;

    private constructor() {
        for (const state of INITIAL_FLYWEIGHTS) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }
    public static getInstance(){
        if (!FlyweightFactory.instance){
            FlyweightFactory.instance = new FlyweightFactory();
        }
        return FlyweightFactory.instance;
    }
    
    private getKey(state: string[]): string {
        return state.join('_');
    }
    getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);        if (!(key in this.flyweights)) {
            this.flyweights[key] = new Flyweight(sharedState);
        }
        return this.flyweights[key];
    }

    
}