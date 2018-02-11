// This is necessary because amd does not recognize .js extensions as modules
declare module "pixijs" {
    import * as PIXI from "pixi.js";
    export = PIXI;
}