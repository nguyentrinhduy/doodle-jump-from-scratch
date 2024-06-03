import { Position } from "../game-objects/Position"
import { Size } from "../game-objects/Size"

export class Sprite {
    private image: HTMLImageElement

    public constructor(filePath: string[]) {
        this.image = new Image()
        let resourcePath = './assets/Images/'
        resourcePath += filePath.join('/')
        resourcePath += '.png'
        this.image.src = resourcePath
    }
    public getNaturalSize(): Size {
        return new Size(this.image.width, this.image.height)
    }
    public render(position: Position, size: Size): void {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas!.getContext('2d')
        if (ctx) {
            ctx.drawImage(this.image, position.getX(), position.getY(), size.getHeight(), size.getWidth())
        }
    }
}
