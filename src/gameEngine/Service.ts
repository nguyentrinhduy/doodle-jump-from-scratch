export class Service{
    private static instance: Service;
    private Speed: number;
    private constructor(){
        this.Speed = 60;
    }
    static getInstance(){
        if (!Service.instance){
            Service.instance = new Service();
        }
        return Service.instance;
    }
    setSpeed(Speed: number){
        this.Speed = Speed;
    }
    getSpeed(){
        return this.Speed;
    }
    // services
    getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    getRandomFloat(min: number, max: number){
        return (Math.random()*(max - min) + min);
    }
}