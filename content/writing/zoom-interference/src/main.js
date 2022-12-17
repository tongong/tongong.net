const m = require("lib/mithril");
const stream = require("lib/mithril-stream");
const zimg = require("./zoomimg.js");
const custom_file_upload = require("./custom_file.js");

const example_graydata = require("data/data.js").example_grayscale;
const example_colordata = require("data/data.js").example_color;

function base64_to_img(txt) {
    const img = new Image();
    img.src = "data:;base64," + txt;
    return img;
}

// store all update streams in a container to avoid having a pile of local
// variables
const stream_container = {};
// select a stream from the container
const zoom_stream = (st) => {
    if (stream_container[st] == undefined)
        stream_container[st] = stream();
    return stream_container[st];
};
const zoom_stream_list = () => Object.keys(stream_container);

// list of mithril components to be mounted in their containers
const components = [
    {view: (vnode) => m(zimg, {
        size: 601,
        image: (x, y) => 0,
        noise: (x, y, val) => {
            let color = 255 * ((x + y) % 2);
            return [color, color, color];
        },
        update: zoom_stream("demo1-checker"),
    })},
    {view: (vnode) => m(zimg, {
        size: 601,
        image: (x, y) => {
            const square = 0.2 <= x && x < 0.6 && 0.4 <= y && y < 0.8;
            const circle = ((x - 0.6) ** 2 + (y - 0.4) ** 2) < 0.2**2;
            return (square + circle) % 2; // xor
        },
        noise: (x, y, val) => {
            let color = 255 * ((x + y + val) % 2);
            return [color, color, color];
        },
        update: zoom_stream("demo2-checkerinvert"),
    })},
    {view: (vnode) => m(zimg, {
        size: 600,
        image: (x, y) => x >= 0.5,
        noise: (x, y, val) => {
            let color = val? 128 : Math.random() * 255;
            return [color, color, color];
        },
        update: zoom_stream("demo3-grayrandom"),
    })},
    {view: (vnode) => m(zimg, {
        size: 601,
        image: (x, y) => {
            return 0.3 <= x && x < 0.7 && 0.3 <= y && y < 0.7;
        },
        noise: (x, y, val) => {
            let color = 128;
            if (val) color = (x + y) % 2 * 256;
            return [color, color, color];
        },
        update: zoom_stream("demo4-checkergray"),
    })},
    {view: (vnode) => m(zimg, {
        size: 601,
        image: (x, y) => {
            return 0.3 <= x && x < 0.7 && 0.3 <= y && y < 0.7;
        },
        noise: (x, y, val) => {
            const RAND = 16;
            let color = 128;
            if (val) color = RAND + (x + y) % 2 * (256 - RAND * 2);
            color = color - RAND + Math.random() * RAND * 2;
            return [color, color, color];
        },
        update: zoom_stream("demo5-checkergrayrandom"),
    })},
    {view: (vnode) => m(zimg, {
        size: 400,
        image: (x, y) => {
            return 0.3 <= x && x < 0.7 && 0.3 <= y && y < 0.7;
        },
        noise: (x, y, val) => {
            const RAND = 16;
            let color = 128;
            if (val) color = RAND + (x + y) % 2 * (256 - RAND * 2);
            color = color - RAND + Math.random() * RAND * 2;
            return [color, color, color];
        },
        update: zoom_stream("demo5-checkergrayrandom"),
    })},
    {view: (vnode) => m(zimg, {
        size: 601,
        image: (x, y) => {
            return 0.3 <= x && x < 0.7 && 0.3 <= y && y < 0.7;
        },
        noise: (x, y, val) => {
            const RAND = 64;
            let color = 150;
            // let color = 181; // = 256 / sqrt(2)
            if (val) color = RAND + (x + y + 1) % 2 * (256 - RAND * 2);
            color = color - RAND + Math.random() * RAND * 2;
            return [color, color, color];
        },
    })},
    {view: (vnode) => m(zimg, {
        size: 601,
        image: (x, y) => {
            return 0.3 <= x && x < 0.7 && 0.3 <= y && y < 0.7;
        },
        noise: (x, y, val) => {
            let color = 128;
            const RAND = 80;
            let colordiff = Math.random();
            if (val) {
                if ((x + y + 1) % 2 == 0)
                    colordiff = Math.max(colordiff, Math.random());
                else
                    colordiff = Math.min(colordiff, Math.random());
            }
            color = color - RAND + colordiff * 2 * RAND;
            return [color, color, color];
        },
        update: zoom_stream("demo6-reordering"),
    })},
    {view: (vnode) => m(zimg, {
        size: 601,
        // image: (x, y) => {
        //     if (x < 0.5) return 0.3 <= x && 0.3 <= y && y < 0.7;
        //     return 1 - y;
        // },
        image: base64_to_img(example_graydata),
        noise: (x, y, val) => {
            val = val[0] / 256;
            // val: input color; 0 <= val < 1
            let color = 128;
            const RAND = 100;
            // imagine a square. in x direction are the gray levels. in
            // y direction are the infinitesimal probabilities. the
            // square is cut by a point-symmetric line. the area above
            // is for dark pixels on the checkerboard - below is for
            // light pixels. if we hit randomly in one of those areas
            // we get a color with the correct probabilities
            let xp = Math.random();
            let yp = Math.random();
            // the dividing line is linear (this was chosen to ease
            // computation but it may be a bad choice)
            // it can be described by the function:
            // -> f(x) = (1-2*val) * x + val
            // for val = 0.5: f(x) = 0.5
            // for val = 0:   f(x) = x
            // for val = 1:   f(x) = 1 - x
            // if we hit in the wrong area mirror at the central point
            // != for xor
            if ((x + y + 1) % 2 == 0 != yp < (1-2*val)*xp+val) {
                xp = 1 - xp;
                // yp = 1 - yp;
            }
            color = color - RAND + xp * 2 * RAND;
            return [color, color, color];
        },
        update: zoom_stream("demo7-reordering-grayscale"),
    })},
    {view: (vnode) => m(custom_file_upload, {color: false})},
    {view: (vnode) => m(zimg, {
        size: 601,
        image: base64_to_img(example_colordata),
        noise: (x, y, val) => {
            return val.map(valc => {
                valc = valc / 256;
                let color = 128;
                const RAND = 100;
                let xp = Math.random();
                let yp = Math.random();
                if ((x + y + 1) % 2 == 0 != yp < (1-2*valc)*xp+valc) {
                    xp = 1 - xp;
                }
                return color - RAND + xp * 2 * RAND;
            });
        },
        update: zoom_stream("demo8-color"),
    })},
    {view: (vnode) => m(custom_file_upload, {color: true})},
];

Array.from(document.querySelectorAll("div.js-container")).forEach((c, i) => {
    m.mount(c, components[i]);
});

// link the links (connect <a> tags and interactive frames)
zoom_stream_list().forEach(st => {
    Array.from(document.querySelectorAll("." + st)).forEach(a => {
        // if (!a.innerHTML.endsWith("x")) console.error("broken link text");
        const zoomlevel = parseFloat(a.innerHTML.slice(0, -1));
        a.onclick = () => {
            zoom_stream(st)(zoomlevel);
            // manual redraw is neccessary for handlers defined outside of
            // mithril
            m.redraw();
        };
    });
});
