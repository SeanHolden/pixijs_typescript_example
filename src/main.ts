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
        "assets/images/cat.png"
    ])
    .load(setup);

// callback function to be called once all images are loaded.
function setup() {
    console.log("finished loading sprites...");

    // During loading of images, images are converted to "textures" to be compatible with WebGL.
    // Sprite is created from texture of an image, accessed from loader.resources.
    let cat = new PIXI.Sprite(
        PIXI.loader.resources["assets/images/cat.png"].texture
    );

    // once we add a sprite to the stage container, it will be displayed.
    console.log("displaying sprites...");
    app.stage.addChild(cat);
}
