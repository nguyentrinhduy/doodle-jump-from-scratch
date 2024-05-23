import { GameManager } from "../GameManager";
import { canvas } from "../MainGame";
import { Button } from "../button/Button";
import { View } from "../gameEngine/View";
import { Player } from "../player/Player";
import { BackgroundFlyweight, PauseButtonFlyweight, TopPlayingFlyweight } from "../resourceFactory/ResourcePath";
import { PauseState } from "./PauseState";
import { State } from "./State";

export class PlayingState extends State{
    gameManager: GameManager;
    background: View;
    topBackground: View;
    pauseButton: Button;
    player: Player;
    constructor(){
        super();
        this.gameManager = GameManager.getInstance();
        this.gameManager.reset();
        this.loadResources();
        canvas.addEventListener('click', this.handleMouseClick);
    }
    private loadResources(){
        // load background
        this.background = new View(BackgroundFlyweight);
        this.background.setPosition([0, 0]);
        // load top background
        this.topBackground = new View(TopPlayingFlyweight);
        this.topBackground.setPosition([0, 0]);
        // load pause button
        this.pauseButton = new Button(PauseButtonFlyweight);
        this.pauseButton.scaleSize(1.5);
        this.pauseButton.setPosition([this.background.getPositionX() + this.background.getWidth() - 60, 0]);

        this.player = this.gameManager.getPlayer();
        this.gameManager.updateMap();
    }
    private handleMouseClick = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        if (this.pauseButton.isClicked(mouseX, mouseY)) {
            GameManager.getInstance().reset();
            this.context.transitionTo(new PauseState());
            canvas.removeEventListener('click', this.handleMouseClick);
        }
    }
    render(){
        this.background.display();
        this.topBackground.display();
        this.pauseButton.display();
    }
    update(progress: number): void {
        this.gameManager.updateMap();
    }
}