import { Application, loader, Sprite } from "pixijs";

class CustomSprite extends Sprite {
    velocity: {
        x: number,
        y: number
    };
}

class Game {
    private cat: CustomSprite;
    private app: Application;

    constructor() {
        this.init();
    }

    init() {
        this.app = new Application({
            width: 512,
            height: 512,
            backgroundColor: 0x061639
        });
        
        document.body.appendChild(this.app.view);
        this.preload();
    }

    preload() {
        loader.add([
                "../assets/images/cat.png",
                "../assets/images/tileset.png"
            ])
            .load(this.create.bind(this));
    }

    create() {
        this.cat = new CustomSprite(
            loader.resources["../assets/images/cat.png"].texture
        );
        this.cat.velocity = { x: 1, y: 1 };
        this.app.stage.addChild(this.cat);

        this.app.ticker.add(this.update.bind(this));
    }

    update(): void {
        this.cat.x += this.cat.velocity.x;
        this.cat.y += this.cat.velocity.y;
    }
}

new Game();
