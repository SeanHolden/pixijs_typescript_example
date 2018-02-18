import { Application, loader, Sprite } from "pixijs";
import { keyboard } from "../lib/keyboard";

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
        this.cat.velocity = { x: 0, y: 0 };

        const left = keyboard(37);
        const up = keyboard(38);
        const right = keyboard(39);
        const down = keyboard(40);

        left.press = () => {
            this.cat.velocity.x = -5;
            this.cat.velocity.y = 0;
        }

        left.release = () => {
            if (!right.isDown && this.cat.velocity.y === 0) {
                this.cat.velocity.x = 0;
            }
        }

        right.press = () => {
            this.cat.velocity.x = 5;
            this.cat.velocity.y = 0;
        }

        right.release = () => {
            if (!left.isDown && this.cat.velocity.y === 0) {
                this.cat.velocity.x = 0;
            }
        }

        up.press = () => {
            this.cat.velocity.y = -5;
            this.cat.velocity.x = 0;
        };

        up.release = () => {
            if (!down.isDown && this.cat.velocity.x === 0) {
              this.cat.velocity.y = 0;
            }
        };

        down.press = () => {
            this.cat.velocity.y = 5;
            this.cat.velocity.x = 0;
        };

        down.release = () => {
            if (!up.isDown && this.cat.velocity.x === 0) {
              this.cat.velocity.y = 0;
            }
        };

        this.app.stage.addChild(this.cat);
        this.app.ticker.add(this.update.bind(this));
    }

    update(): void {
        this.cat.x += this.cat.velocity.x;
        this.cat.y += this.cat.velocity.y;
    }
}

new Game();
