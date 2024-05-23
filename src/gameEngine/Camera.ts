// default
export const WINDOW_WIDTH = 1000;
export const WINDOW_HEIGHT = 1000;
export class Camera{
    private offset: [number, number]; // locate at the left top
    private size: [number, number];
    private vector: [number, number];
    private static instance: Camera;
    private constructor(){
        this.offset = [400, 0];
    }
    static getInstance(){
        if (!Camera.instance){
            Camera.instance = new Camera();
        }
        return Camera.instance;
    }
    getOffsetX(){
        return this.offset[0];
    }
    getOffsetY(){
        return this.offset[1];
    }
    getNewPosition(position: [number, number]): [number, number]{
        return [position[0] + this.offset[0], position[1] + this.offset[1]];
    }
    setOffset(offset: [number, number]){
        this.offset = offset;
    }
    setVector(vector: [number, number]){
        this.vector = vector;
    }
    
}