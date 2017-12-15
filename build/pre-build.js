var fs = require('fs-extra');

fs.copySync('./node_modules/requirejs/require.js', './dist/vendor/require.js');
fs.copySync('./node_modules/pixi.js/dist/pixi.min.js', './dist/vendor/pixi.min.js');
fs.copySync('./node_modules/pixi.js/dist/pixi.min.js.map', './dist/vendor/pixi.min.js.map');
