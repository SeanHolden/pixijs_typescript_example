var fs = require('fs-extra');

fs.copySync('./src/index.html', './dist/index.html');
fs.copySync('./src/velocity/index.html', './dist/velocity/index.html');
fs.copySync('./node_modules/requirejs/require.js', './dist/js/lib/require.js');
fs.copySync('./node_modules/pixi.js/dist/pixi.min.js', './dist/js/lib/pixi.min.js');
fs.copySync('./node_modules/pixi.js/dist/pixi.min.js.map', './dist/js/lib/pixi.min.js.map');
fs.copySync('./assets/images', './dist/assets/images');
