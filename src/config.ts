requirejs.config({
    baseUrl: './dist',
    paths: {
        "pixijs": "vendor/pixi.min"
    }
});

requirejs(["main"]);
