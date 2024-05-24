import { BACKGROUND_POSITION, TOP_BACKGROUND_POSITION } from "../constants/FixedPosition";
import { BackgroundFlyweight, TopPlayingFlyweight } from "../constants/ResourcePath";
import { View } from "../gameEngine/View";
import { State } from "./State";

export class EndState extends State{
    
    private background: View;
    private topBackground: View;
    private bottomBackground: View;
    constructor(){
        super();
        this.loadResources();
    }
    private loadResources(){
        // load background
        this.background = new View(BackgroundFlyweight);
        this.background.setPosition([...BACKGROUND_POSITION]);
        
        // load top background
        this.topBackground = new View(TopPlayingFlyweight);
        this.topBackground.setPosition([...TOP_BACKGROUND_POSITION]);

        // load bottom background
        
    }
    update(progress: number): void {
        
    }
    render(): void {
        
    }
}