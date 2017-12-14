import * as PIXI from "pixijs";

let type: string;

if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
} else {
  type = "WebGL";
}

PIXI.utils.sayHello(type);

const app: PIXI.Application = new PIXI.Application({ width: 256, height: 256 });
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
