import { Application, loader, Rectangle, Sprite, Text, Texture, TextStyle } from "pixijs";
import { hitTestRectangle } from "../lib/hit-test-rectangle";
import { keyboard } from "../lib/keyboard";

export class CustomSprite extends Sprite {
    centerX: number;
    centerY: number;
    halfWidth: number;
    halfHeight: number;
    velocity: {
        x: number,
        y: number
    }
}

class Game {
    private app: Application;
    private cat: CustomSprite;
    private tiger: CustomSprite;
    private message: Text;

    constructor() {
        this.init();
    }

    init(): void {
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
            "../assets/images/tileset2.png"
        ])
        .load(this.create.bind(this));
    }

    create(): void {
        const tilemap = loader.resources["../assets/images/tileset2.png"].texture.baseTexture;
        this.cat = new CustomSprite(new Texture(tilemap, new Rectangle(0, 0, 64, 64)));
        this.cat.position.set(0, 64);
        this.cat.anchor.set(0.5, 0.5);
        this.tiger = new CustomSprite(new Texture(tilemap, new Rectangle(0, 64, 64, 64)));
        this.tiger.position.set(256, 256);
        this.tiger.anchor.set(0.5, 0.5);

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

        const style = new TextStyle({ fill: "#ffffff"});
        this.message = new Text("No Collision", style);
        this.message.position.set(10, 10);

        this.app.stage.addChild(this.tiger);
        this.app.stage.addChild(this.cat);
        this.app.stage.addChild(this.message);
        console.log(this.tiger.tint);

        this.app.ticker.add(this.update.bind(this));
    }

    update(): void {
        this.cat.x += this.cat.velocity.x;
        this.cat.y += this.cat.velocity.y;
        if (hitTestRectangle(this.cat, this.tiger)) {
            this.message.text = "Collision!!!";
            this.tiger.tint = 0xff3300;
        } else {
            this.message.text = "No Collision";
            this.tiger.tint = 0xffffff;
        }
    }
}

new Game();
