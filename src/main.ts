import * as PIXI from "pixijs";

let type: string;

if(PIXI.utils.isWebGLSupported()){
    type = "WebGL";
} else {
    type = "canvas";
}

PIXI.utils.sayHello(type);

const app: PIXI.Application = new PIXI.Application({
    width: 256,
    height: 256
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// example of how to access height and width of view
console.log(app.renderer.view.width, app.renderer.view.height);
