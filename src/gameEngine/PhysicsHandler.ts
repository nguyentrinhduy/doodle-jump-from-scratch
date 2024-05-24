import { GRAVITY_ACCELERATION } from "../constants/Player";

export class PhysicsHandler{
    private gravity_acceleration: [number, number];
    constructor(){
        this.gravity_acceleration = [...GRAVITY_ACCELERATION];
    }
}