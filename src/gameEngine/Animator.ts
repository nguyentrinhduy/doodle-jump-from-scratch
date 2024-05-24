import { Flyweight } from "../resourceFactory/Flyweight";

export class Animator{
    private currentAnimation: number;
    private flyweights: Flyweight[];
    private timeDifference: number;
    private animationTimeLeft: number;
    private timeDisplay: number;
    private range: [number, number] | null;
    constructor(){
        this.range = null;
    }
    setAnimator(state: string[]){
        
    }
    setTimeDifference(time: number){
        this.timeDifference = time;
    }
    
    setTimeDisplay(time: number){
        this.timeDisplay = time;
    }
    setRangeAnimation(range: [number, number] | null){
        this.range = range;
    }
    setCurrenAnimation(currentAnimation: number){
        this.currentAnimation = currentAnimation;
    }
    timePassed(time: number){
        if (this.range && this.currentAnimation == this.range[1]) return;
        if (this.timeDifference == 0) return;
        this.animationTimeLeft -= time;
        if (this.animationTimeLeft <= 0){
            this.animationTimeLeft = this.timeDifference;
            this.currentAnimation++;
            if (this.currentAnimation >= this.flyweights.length){
                this.currentAnimation = 0;
            }
        }
    }
    getNaturalSize(){
        return this.flyweights[0].getNaturalSize();
    }
    display(position: [number, number], vector: [number, number]){
        this.flyweights[this.currentAnimation].display(position, vector);
    }
}