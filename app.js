requirejs.config({
    baseUrl: './dist',
    paths: {
        //"pixi.js": "vendor/pixi.min"
    }
});

requirejs(["src/main"]);
