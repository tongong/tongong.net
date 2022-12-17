const fs = require('fs');

fs.writeFileSync("data/data.js",
    "module.exports = " +
    JSON.stringify({
        example_grayscale: fs.readFileSync("example-grayscale.png")
            .toString("base64"),
        example_color: fs.readFileSync("example-color.png")
            .toString("base64"),
    })
);
