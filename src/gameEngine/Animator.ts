import { Flyweight } from "../resourceFactory/Flyweight";

export class Animator{
    private currentAnimation: number;
    private flyweights: Flyweight[];
    private timeDifference: number;
    private animationTimeLeft: number;
    private timeDisplay: number;

    setTimeDifference(time: number){
        this.timeDifference = time;
    }
    
    setTimeDisplay(time: number){
        this.timeDisplay = time;
    }

    timePassed(time: number){
        this.animationTimeLeft -= time;
        if (this.animationTimeLeft <= 0){
            this.animationTimeLeft = this.timeDifference;
            this.currentAnimation++;
            if (this.currentAnimation >= this.flyweights.length){
                this.currentAnimation = 0;
            }
        }
    }
    
    display(position: [number, number], vector: [number, number]){
        this.flyweights[this.currentAnimation].display(position, vector);
    }
}