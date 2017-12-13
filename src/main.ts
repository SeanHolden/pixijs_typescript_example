import { Application, utils } from "dist/vendor/pixi.min.js";

let type = "WebGL";
if(!utils.isWebGLSupported()){
  type = "canvas";
}

utils.sayHello(type);

const app = new Application({ width: 256, height: 256 });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
