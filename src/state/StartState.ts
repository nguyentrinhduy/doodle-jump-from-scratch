import { GameManager } from "../GameManager";
import { canvas } from "../MainGame"
import { Button } from "../gameEngine/Button";
import { Camera } from "../gameEngine/Camera";
import { View } from "../gameEngine/View";
import { NormalLand } from "../land/NormalLand";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { FlyweightFactory } from "../resourceFactory/FlyweightFactory";
import { BackgroundFlyweight, MainMenuFlyweight, PlayButtonFlyweight } from "../constants/ResourcePath";
import { PlayingState } from "./PlayingState";
import { State } from "./State"
import { BACKGROUND_POSITION, LAND_POSITION_IN_START_STATE, PLAY_BUTTON_POSITION } from "../constants/FixedPosition";
import { PLAYER_START_POSITION_IN_START_STATE } from "../constants/Player";
import { WINDOW_HEIGHT } from "../constants/WindowBounds";
import { ImageView } from "../gameEngine/ImageView";

export class StartState extends State {
    private background: ImageView;
    private playButton: Button;
    private player: Player;
    private scoreButton: Button;
    private land: NormalLand;
    constructor(){
        super();
        this.loadResources();
        canvas.addEventListener('click', this.handleMouseClick)
    }
    private async loadResources(){
        // load Background
        console.log("getFlyweight");
        // load Player
        this.player = GameManager.getInstance().getPlayer();
        this.player.setPosition([...PLAYER_START_POSITION_IN_START_STATE]);
        this.background = new ImageView(MainMenuFlyweight);
        this.background.setHeight(WINDOW_HEIGHT);
        this.background.setPosition([...BACKGROUND_POSITION]);

        // load PlayButton
        this.playButton = new Button(PlayButtonFlyweight);
        this.playButton.setPosition([...PLAY_BUTTON_POSITION]);

        // load ScoresButton
        this.land = new NormalLand();
        this.land.setPosition([...LAND_POSITION_IN_START_STATE]);
        // load Options
    }

    private handleMouseClick = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        if (this.playButton.isClicked(mouseX, mouseY)) {
            GameManager.getInstance().reset();
            this.context.transitionTo(new PlayingState());
            canvas.removeEventListener('click', this.handleMouseClick);
            
        }
    }
    update(period: number){
        this.player.autoFallInStartState(period);
        if (this.player.standOn(this.land)){
            if (this.player.getState() == PlayerState.Fall){
                this.land.onJumped(this.player);
            }
        }
    }
    render() {
        const ctx = canvas.getContext('2d');
        if (ctx){
            // draw Background
            this.background.display();

            // draw Land
            this.land.display();

            // draw Player
            this.player.display();

            // draw  PlayButton
            this.playButton.display();
        }
    }
}