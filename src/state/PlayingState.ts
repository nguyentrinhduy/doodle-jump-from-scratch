import { GameManager } from "../GameManager";
import { canvas } from "../MainGame";
import { Button } from "../button/Button";
import { View } from "../gameEngine/View";
import { Player } from "../player/Player";
import { BackgroundFlyweight, PauseButtonFlyweight, TopPlayingFlyweight } from "../constants/ResourcePath";
import { PauseState } from "./PauseState";
import { State } from "./State";
import { BACKGROUND_POSITION, PAUSE_BUTTON_POSITION, TOP_BACKGROUND_POSITION } from "../constants/FixedPosition";
import { Direction, PlayerState } from "../player/PlayerState";
import { EndState } from "./EndState";
import { Land } from "../land/Land";
import { Monster } from "../monster/Monster";
import { PLAYER_START_POSITION } from "../constants/Player";

export class PlayingState extends State{
    gameManager: GameManager;
    background: View;
    topBackground: View;
    pauseButton: Button;
    player: Player;
    lands: Land[];
    monsters: Monster[];
    constructor(){
        super();
        this.gameManager = GameManager.getInstance();
        this.loadResources();
        canvas.addEventListener('click', this.handleMouseClick);
        window.addEventListener('keydown', this.handleArrowKeysPressed);
        window.addEventListener('keyup', this.handleArrowKeysReleased);
    }
    private async loadResources(){
        // load player
        this.player = this.gameManager.getPlayer();

        // load lands
        this.lands = this.gameManager.getLands();

        // load background
        this.background = new View(BackgroundFlyweight);
        this.background.setPosition([...BACKGROUND_POSITION]);

        // load top background
        this.topBackground = new View(TopPlayingFlyweight);
        this.topBackground.setPosition([...TOP_BACKGROUND_POSITION]);

        // load pause button
        this.pauseButton = new Button(PauseButtonFlyweight);
        this.pauseButton.scaleSize(1.5);
        this.pauseButton.setPosition([...PAUSE_BUTTON_POSITION]);
        
        
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
    private handleArrowKeysReleased = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                break;
            case 's':
            case 'ArrowDown':
                break;
            case 'a':
            case 'ArrowLeft':
                break;
            case 'd':
            case 'ArrowRight':
                // Stop moving when arrow keys are released
                this.player.setVector([0, this.player.getVector()[1]]);
                break;
            default:
                // Handle other keys if necessary
                break;
        }
    }
    private handleArrowKeysPressed = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                // Handle up arrow key

                break;
            case 's':
            case 'ArrowDown':
                // Handle down arrow key
                
                break;
            case 'a':
            case 'ArrowLeft':
                // Handle left arrow key
                this.player.setVectorDirection(Direction.Left);
                break;
            case 'd':
            case 'ArrowRight':
                // Handle right arrow key
                this.player.setVectorDirection(Direction.Right);
                break;
            default:
                // Handle other keys
                break;
        }
    }
    render(){
        this.background.display();
        this.lands.forEach(element => {
            console.log(element.getPositionX());
            element.display();
        });
        this.topBackground.display();
        this.pauseButton.display();
        this.player.display();
    }
    update(progress: number): void {
        this.gameManager.updateMap();
        if (this.player.getState() == PlayerState.Lose){
            this.context.transitionTo(new EndState());
            canvas.removeEventListener('click', this.handleMouseClick);
            window.removeEventListener('keydown', this.handleArrowKeysPressed);
            window.removeEventListener('keyup', this.handleArrowKeysReleased);
            return;
        }
        // console.log(this.player.vector[1]);
        this.lands.forEach(element => {
            if (this.player.standOn(element)){
                element.onJumped(this.player);
            }
        });
        this.player.autoFall(progress);
    }
}