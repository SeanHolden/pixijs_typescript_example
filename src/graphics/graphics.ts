import { Application, Graphics, Text, TextStyle } from "pixijs";

class Game {
    private app: Application;

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
        this.create();
    }

    create(): void {
        const rectangle = new Graphics();
        rectangle.beginFill(0x66CCFF);
        rectangle.lineStyle(4, 0xFF3300, 1);
        rectangle.drawRect(50, 50, 200, 100);
        rectangle.endFill();
        this.app.stage.addChild(rectangle);

        const circle = new Graphics();
        circle.beginFill(0x9966FF);
        circle.drawCircle(100, 300, 64);
        circle.endFill();
        this.app.stage.addChild(circle);

        const ellipse = new Graphics();
        ellipse.beginFill(0xFFFF00);
        ellipse.drawEllipse(380, 130, 50, 20);
        ellipse.endFill();
        this.app.stage.addChild(ellipse);

        const roundBox = new Graphics();
        roundBox.lineStyle(4, 0x99CCFF, 1);
        roundBox.beginFill(0xFF9933);
        roundBox.drawRoundedRect(48, 190, 84, 36, 10)
        roundBox.endFill();
        this.app.stage.addChild(roundBox);

        const line = new Graphics();
        line.lineStyle(4, 0xFFFFFF, 1);
        line.moveTo(0, 0);
        line.lineTo(80, 50);
        line.x = 32;
        line.y = 32;
        this.app.stage.addChild(line);

        const triangle = new Graphics();
        triangle.beginFill(0x66FF33);
        triangle.drawPolygon([
            -32, 64,             //First point
            32, 64,              //Second point
            0, 0                 //Third point
        ]);
        triangle.endFill();
        //The triangle's x/y position is anchored to its first point in the path
        triangle.x = 180;
        triangle.y = 300;
        this.app.stage.addChild(triangle);

        // === DISPLAYING TEXT
        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          });
        const message = new Text("Hello Pixi!", style);
        message.position.set(256, 256);
        this.app.stage.addChild(message);
        message.text = "sean was here!"
        // If you want to use a custom font file, use the CSS @font-face rule to
        // link the font file to the HTML page where your Pixi application is running.
        // as long as it's loaded in the page, you can call it with PIXI.
    }
}

new Game();
