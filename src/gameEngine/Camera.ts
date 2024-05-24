
export class Camera{
    private offset: [number, number]; // locate at the left top
    private size: [number, number];
    private vector: [number, number];
    private timePassed: number;
    private static instance: Camera;
    private constructor(){
        this.offset = [400, 0];
        this.vector = [0, 0];
    }
    static getInstance(){
        if (!Camera.instance){
            Camera.instance = new Camera();
        }
        return Camera.instance;
    }
    getVector(){
        return this.vector;
    }
    getOffsetX(){
        return this.offset[0];
    }
    getOffsetY(){
        return this.offset[1];
    }
    setTimePassed(time: number){
        this.timePassed = time;
    }
    getTimePassed(){
        return this.timePassed;
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