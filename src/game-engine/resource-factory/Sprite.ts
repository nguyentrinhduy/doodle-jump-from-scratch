

export class Sprite {
    private image: HTMLImageElement
    private loaded: boolean

    constructor(filePath: string[]) {
        this.loaded = false
        this.image = new Image()
        let resourcePath = './assets/Images/'
        resourcePath += filePath.join('/')
        resourcePath += '.png'
        this.image.src = resourcePath
        console.log(resourcePath)
    }
    getNaturalSize(): [number, number] {
        return [this.image.width, this.image.height]
    }
    display(position: [number, number], size: [number, number]) {
        const canvas = document.getElementById("game") as HTMLCanvasElement;
        const ctx = canvas!.getContext('2d')
        if (ctx) {
            ctx.drawImage(this.image, position[0], position[1], size[0], size[1])
        }
    }
}
