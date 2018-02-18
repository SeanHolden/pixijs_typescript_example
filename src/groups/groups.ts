import { Application, loader, Sprite, Texture, Container } from "pixijs";

class Game {
    private app: Application;
    private cat: Sprite;
    private tiger: Sprite;
    private hedgehog: Sprite;

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
            "../assets/images/tileset2.png"
        ])
        .load(this.create.bind(this));
    }

    create() {
        const tilemap = loader.resources["../assets/images/tileset2.png"].texture.baseTexture;
        this.cat = new PIXI.Sprite(new Texture(tilemap, new PIXI.Rectangle(0, 0, 64, 64)));
        this.tiger = new PIXI.Sprite(new Texture(tilemap, new PIXI.Rectangle(0, 64, 64, 64)));
        this.hedgehog = new PIXI.Sprite(new Texture(tilemap, new PIXI.Rectangle(64, 0, 64, 64)));
        this.cat.position.set(16, 16);
        this.hedgehog.position.set(32, 32);
        this.tiger.position.set(64, 64);

        const animals = new Container();
        animals.addChild(this.cat);
        animals.addChild(this.hedgehog);
        animals.addChild(this.tiger);

        // can list container's children like this...
        console.log(animals.children);

        // Set container position and sprite individual positions will remain relative to the container box.
        animals.position.set(64, 64);

        // === SCALING WHOLE CONTAINER
        // this will scale everything at the same time inside this container.
        //animals.width = 200;
        //animals.height = 200;
        console.log("container details: ", animals.x, animals.y, animals.width, animals.height);

        // === LOCAL POSITION (16px)
        // this is position from top left of container
        console.log(this.cat.position);

        // === GLOBAL POSITION
        // overall position in stage view
        console.log("cat global position", animals.toGlobal(this.cat.position));
        // alternative and probably better way as it is much more accurate for collision detection...
        console.log("Tiger Global Position: ", this.tiger.getGlobalPosition().x, this.tiger.getGlobalPosition().y);

        // === ACCESS SPRITE'S PARENT
        console.log(this.cat.parent);

        // === DISTANCE FROM ONE SPRITE TO ANOTHER
        console.log("tiger x distance from hedgehog", this.tiger.toLocal(this.tiger.position, this.hedgehog).x);
        console.log("tiger y distance from hedgehog", this.tiger.toLocal(this.tiger.position, this.hedgehog).y);


        // === PARTICLE CONTAINER
        // Any sprites inside a ParticleContainer will render 2 to 5 times faster than they would if they were in a regular Container
        // probably worth using this unless you need specific features from regular container.
        let superFastSprites = new PIXI.particles.ParticleContainer();
        let cat2 = new PIXI.Sprite(new Texture(tilemap, new PIXI.Rectangle(0, 0, 64, 64)));
        let tiger2 = new PIXI.Sprite(new Texture(tilemap, new PIXI.Rectangle(0, 64, 64, 64)));
        let hedgehog2 = new PIXI.Sprite(new Texture(tilemap, new PIXI.Rectangle(64, 0, 64, 64)));
        cat2.position.set(16, 16);
        hedgehog2.position.set(32, 32);
        tiger2.position.set(64, 64);
        superFastSprites.addChild(cat2);
        superFastSprites.addChild(hedgehog2);
        superFastSprites.addChild(tiger2);
        superFastSprites.position.set(200, 200);

        this.app.stage.addChild(animals);
        this.app.stage.addChild(superFastSprites);

        this.app.ticker.add(this.update.bind(this));
    }

    update(): void {
    }
}

new Game();