requirejs.config({
    baseUrl: 'js',
    paths: {
        "pixijs": "lib/pixi.min"
    }
});

requirejs(["main"]);
