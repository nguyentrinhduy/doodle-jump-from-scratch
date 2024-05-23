import { canvas } from "../MainGame";

export class Flyweight{
    private image: HTMLImageElement;

    constructor(filePath: string[]) {
        this.image = new Image();
        let resourcePath = "./assets/Images/";
        resourcePath += filePath.join('/')
        // filePath.forEach(element => {
        //     resourcePath += "/";
        //     resourcePath += element;
        // });
        resourcePath += ".png";
        this.image.src = resourcePath;
        console.log(resourcePath);
    }

    getNaturalSize(): [number, number]{
        return [this.image.width, this.image.height];
    }
    display(position: [number, number], size: [number, number]){
        const ctx = canvas!.getContext('2d');
        if (ctx){
            ctx.drawImage(this.image, position[0], position[1], size[0], size[1]);
        }
    }
}