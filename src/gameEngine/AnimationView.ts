import { Animator } from "./Animator";
import { Camera } from "./Camera";
import { View } from "./View";
import { TIME_DIFFERENCE_ANIMATION } from "./constant";

export class AnimationView extends View{
    private animator: Animator;
    
    constructor(state: string[]){
        super();
        
    }
    protected setAnimator(state: string[]){
        this.animator.setAnimator(state);
        this.size = this.animator.getNaturalSize();
    }
    requestLoopAnimation(){
        this.animator.setRangeAnimation(null);
        this.animator.setCurrenAnimation(0);
        this.animator.setTimeDifference(TIME_DIFFERENCE_ANIMATION);
    }
    requestSingleAnimation(target: number){
        this.animator.setTimeDifference(0);
        this.animator.setCurrenAnimation(target);
    }
    requestMultipleAnimation(from: number, to: number){
        this.animator.setCurrenAnimation(from);
        this.animator.setAnimator
    }
    display(){
        this.animator.display(this.position, this.size);
        this.animator.timePassed(Camera.getInstance().getTimePassed());
    }
}