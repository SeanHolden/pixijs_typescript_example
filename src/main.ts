import * as PIXI from "pixijs";

let renderType: string;

// === APP SETUP
if(PIXI.utils.isWebGLSupported()){
    renderType = "WebGL";
} else {
    renderType = "canvas";
}

PIXI.utils.sayHello(renderType);

// === NEW APP WITH OPTIONS
const app: PIXI.Application = new PIXI.Application({
    width: 256,
    height: 256,
    backgroundColor: 0x061639
});

// === APPEND APP TO HTML DOCUMENT
// Pixi automatically creates canvas for you.
document.body.appendChild(app.view);

// === RESIZING VIEW/CANVAS
// autoResize ensures that canvas resizes with the view. More often than not, you want this.
app.renderer.autoResize = true;
app.renderer.resize(512, 512);

// === RENDERER VIEW
// app.renderer.view returns canvas HTML element.
// use this to set css styles on the canvas itself.
console.log(app.renderer.view);
// shorter equivalent...
console.log(app.view);

// example of how to access height and width of view
console.log(app.renderer.view.width, app.renderer.view.height);

// Example of the above comment in action.
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// === STAGE
// Anything you want to be made visible in the renderer has to be added to a special Pixi object called the stage...
// The stage is a Pixi Container object.
// You can think of a container as a kind of empty box that will group together and store whatever you put inside it.
// The stage object is the root container for all the visible things in your scene.
// Whatever you put inside the stage will be rendered on the canvas.
console.log(app.stage);


// === LOADING SPRITES
// Add as many images to the "add" array as needed
PIXI.loader
    .add([
        "assets/images/cat.png",
        "assets/images/tileset.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

// === LOADING PROGRESS %
function loadProgressHandler(loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) {
    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    // resource.error is also available. This will display any error that happened while loading a file.
}

// callback function to be called once all images are loaded.
function setup() {
    console.log("finished loading sprites...");

    // During loading of images, images are converted to "textures" to be compatible with WebGL.
    // Sprite is created from texture of an image, accessed from loader.resources.
    let cat = new PIXI.Sprite(
        PIXI.loader.resources["assets/images/cat.png"].texture
    );

    // === REMOVING A SPRITE
    // simply remove it from the stage...
    //app.stage.removeChild(cat);
    // Alternatively, this will be enough to "remove" the sprite more efficiently...
    //cat.visible = false;

    // === POSITIONING A SPRITE
    cat.x = 96;
    cat.y = 96;
    // alternatively...
    cat.position.set(200, 150)

    // === SIZE AND SCALE
    // by specific number of pixels...
    cat.width = 80;
    cat.height = 120;
    // by a scale factor...
    cat.scale.x = 0.5;
    cat.scale.y = 0.5;
    // alternatively...
    cat.scale.set(0.5, 0.5);

    // === ROTATION (value in radians)
    cat.rotation = 0.5;

    // === ANCHOR POINT
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;
    // alternatively
    cat.anchor.set(0.5, 0.5)
    // alternatively you can use "pivot" which is same as anchor but uses pixel values instead.
    cat.pivot.set(32, 32);

    // once we add a sprite to the stage container, it will be displayed.
    console.log("displaying sprites...");
    app.stage.addChild(cat);


    // === TILESETS

    //PIXI.loader.resources["assets/images/tileset.png"].texture
    // TextureCache = alternative way of doing the above...
    let texture = PIXI.utils.TextureCache["assets/images/tileset.png"];
    let rectangle = new PIXI.Rectangle(96, 64, 32, 32);
    texture.frame = rectangle;

    let rocket = new PIXI.Sprite(texture);
    rocket.x = 32;
    rocket.y = 32;
    app.stage.addChild(rocket);
    //app.renderer.render(app.stage); // <-- is this even needed?

    // === LOADING FROM TEXTURE ATLAS (e.g. TEXTURE PACKER)

    //PIXI.loader
    //  .add("assets/images/treasureHunter.json")
    //  .load(setup);
    //const id = PIXI.loader.resources["images/treasureHunter.json"].textures;
    //let sprite = new PIXI.Sprite(id["frameId.png"]);


    // === GAME LOOP

    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => gameLoop1(delta, cat));

    function gameLoop1(delta: number, cat: PIXI.Sprite): void {
        cat.x += 1;
    }

    // Alternative way of having a gameLoop...
    // There is no difference, it's just personal preference.
    function gameLoop2(): void {
        //Call this `gameLoop` function on the next screen refresh
        //(which happens 60 times per second)
        requestAnimationFrame(gameLoop2);
      
        //Move the rocket
        rocket.x += 1;
    }
      
    //Start the loop
    gameLoop2();

}

