import { GameManager } from "../GameManager";

export abstract class State {
    protected context: GameManager;

    setContext(context: GameManager){
        this.context = context;
    }
    abstract update(progress: number): void;
    abstract render(): void;
}
