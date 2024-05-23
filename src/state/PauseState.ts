import { GameManager } from "../GameManager";
import { canvas } from "../MainGame";
import { Button } from "../button/Button";
import { View } from "../gameEngine/View";
import { PauseBackgroundFlyweight, ResumeButtonFlyweight, TopPlayingFlyweight } from "../resourceFactory/ResourcePath";
import { PlayingState } from "./PlayingState";
import { State } from "./State";

export class PauseState extends State{
    resumeButton: Button;
    background: View;
    topBackground: View;
    constructor(){
        super();
        this.loadResources();
        canvas.addEventListener('click', this.handleMouseClick);
    }
    loadResources(){
        // load background
        this.background = new View(PauseBackgroundFlyweight);
        this.background.setPosition([0, 0]);

        // load topBackground
        this.topBackground = new View(TopPlayingFlyweight);
        this.topBackground.setPosition([0, 0]);

        // load resume button
        this.resumeButton = new Button(ResumeButtonFlyweight);
        this.resumeButton.scaleSize(1.2);
        this.resumeButton.setPosition([this.background.getPositionX() + this.background.getWidth() - 60,10]);
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