const fs   = require('fs');

fs.writeFileSync("data/data.js",
    "module.exports = " +
    JSON.stringify({
        gimp: fs.readFileSync("gimp-greyscale.png").toString("base64"),
    })
);
