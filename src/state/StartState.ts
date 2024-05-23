import { GameManager } from "../GameManager";
import { canvas } from "../MainGame"
import { Button } from "../button/Button";
import { Camera } from "../gameEngine/Camera";
import { View } from "../gameEngine/View";
import { NormalLand } from "../land/NormalLand";
import { Player } from "../player/Player";
import { PlayerState } from "../player/PlayerState";
import { FlyweightFactory } from "../resourceFactory/FlyweightFactory";
import { BackgroundFlyweight, MainMenuFlyweight, PlayButtonFlyweight } from "../resourceFactory/ResourcePath";
import { PlayingState } from "./PlayingState";
import { State } from "./State"

export class StartState extends State {
    private background: View;
    private playButton: Button;
    private player: Player;
    private scoreButton: Button;
    private land: NormalLand;
    constructor(){
        super();
        this.loadResources();
        canvas.addEventListener('click', this.handleMouseClick)
    }
    private loadResources(){
        // load Background
        console.log("getFlyweight");
        // load Player
        this.player = GameManager.getInstance().getPlayer();
        this.player.setPositionX(100)
        this.background = new View(MainMenuFlyweight);
        this.background.setHeight(window.innerHeight);
        this.background.setPosition([0, 0]);

        // load PlayButton
        this.playButton = new Button(PlayButtonFlyweight);
        this.playButton.setPosition([70, 500]);

        // load ScoresButton
        this.land = new NormalLand();
        this.land.setPosition([120, 580]);
        this.land.scaleSize(1.5);
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
        this.player.autoFall(period);
        if (this.player.collides(this.land)){
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