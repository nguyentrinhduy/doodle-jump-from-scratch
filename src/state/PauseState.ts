import { GameManager } from "../GameManager";
import { canvas } from "../MainGame";
import { Button } from "../gameEngine/Button";
import { View } from "../gameEngine/View";
import { PauseBackgroundFlyweight, ResumeButtonFlyweight, TopPlayingFlyweight } from "../constants/ResourcePath";
import { PlayingState } from "./PlayingState";
import { State } from "./State";
import { BACKGROUND_POSITION, PAUSE_BUTTON_POSITION, RESUME_BUTTON_POSITION, TOP_BACKGROUND_POSITION } from "../constants/FixedPosition";
import { ImageView } from "../gameEngine/ImageView";

export class PauseState extends State{
    resumeButton: Button;
    background: ImageView;
    topBackground: ImageView;
    constructor(){
        super();
        this.loadResources();
        canvas.addEventListener('click', this.handleMouseClick);
    }
    loadResources(){
        // load background
        this.background = new ImageView(PauseBackgroundFlyweight);
        this.background.setPosition([...BACKGROUND_POSITION]);

        // load topBackground
        this.topBackground = new ImageView(TopPlayingFlyweight);
        this.topBackground.setPosition([...TOP_BACKGROUND_POSITION]);

        // load resume button
        this.resumeButton = new Button(ResumeButtonFlyweight);
        this.resumeButton.scaleSize(1.2);
        this.resumeButton.setPosition([...RESUME_BUTTON_POSITION]);
    }
    handleMouseClick = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        if (this.resumeButton.isClicked(mouseX, mouseY)) {
            this.context.transitionTo(new PlayingState());
            canvas.removeEventListener('click', this.handleMouseClick);
        }
    }
    render(): void {
        this.background.display();
        this.topBackground.display();
        this.resumeButton.display();
    }
    update(progress: number): void {
        // none
    }
}