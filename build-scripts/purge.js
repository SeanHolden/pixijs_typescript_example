var fs = require('fs-extra');

fs.remove("./dist/", err => {
    if (err) return console.error(err);
});
