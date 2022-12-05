const m = require("lib/mithril");
const stream = require("lib/mithril-stream");
const zimg = require("./zoomimg.js");
const custom_file_upload = require("./custom_file.js");

const gimpdata = require("data/data.js").gimp;

function base64_to_img(txt) {
    const img = new Image();
    img.src = "data:;base64," + txt;
    return img;
}

const main = () => {
    // store all update streams in a container to avoid having a pile of local
    // variables
    let stream_container = {};
    // select a stream from the container
    let zoom_stream = (st) => {
        if (stream_container[st] == undefined)
            stream_container[st] = stream();
        return stream_container[st];
    };
    let zoom_button = (st, z) =>
        m("a", {onclick: e => zoom_stream(st)(z)}, z.toFixed(4) + "x");
    return {
        view: (vnode) => m("div",
            m("h1", "zoom interference"),
            m("p", {
                style: {
                    textAlign: "center",
                    fontStyle: "italic",
                },
            }, `a playful exploration into the world of image rendering. by `,
                m("a", {href: "https://github.com/tongong"}, "@tongong"),
                `, 2022`
            ),
            m("p", `I recently discovered that pixel interference effects can
                occur by zooming in on gray image areas. This got me thinking:
                Can we construct an image that initially looks uniformly gray
                but reveals information on specific zoom levels? Is it maybe
                even possible to show different grayscale images depending on
                the zoom level?`),
            m("p", `The following tests show client-side generated images using
                the `, m("code", "<canvas>"), ` element. However the image data
                is not manipulated during zoom - just the CSS `, m("code",
                "transform: scale()"), ` property changes. The demos need pixel
                perfect sizes to work. Therefore the images can be too small
                or too big on some devices - I apologize.`),
            m("p", `Please also note that I do not have any prior knowledge in
                the field of image rendering. I was just playing around and
                documenting things I found interesting. I hope you find this
                little tour interesting as well :).`),
            m("h2", "the interference effect"),
            m("p", `The first image is just a checkerboard pattern on pixel
                scale (this is clearly visible on `,
                zoom_button("demo1-checker", 2), `). When zooming in the image
                pixel grid and the screen pixel grid are misaligned creating
                interference effects in both dimensions. They are especially
                strong in the area of `,
                zoom_button("demo1-checker", 0.5), `, `,
                zoom_button("demo1-checker", 0.25), `, `,
                zoom_button("demo1-checker", 0.1667), ` and `,
                zoom_button("demo1-checker", 0.125), `. `,
                `These turn out to be the whole number parts of 1/2. This makes
                sense: For two adjacent screen pixels the distance of the image
                pixels is a multiple of 2 which locally creates a uniformly
                colored area.`),
            m(zimg, {
                size: 601,
                image: (x, y) => 0,
                noise: (x, y, val) => {
                    let color = 255 * ((x + y) % 2);
                    return [color, color, color];
                },
                update: zoom_stream("demo1-checker"),
            }),
            m("p", `Another observation about browser differences can be made
                here: In Chromium I can zoom smoothly at this microscopic
                scale, Firefox only allows zoom steps. Interestingly for every
                zoom step the image size is an integer multiple of 1/2 of
                the interference period. I do not know why. Also on Firefox for
                Android there are graphic glitches across the whole screen for
                some zoom levels. I guess this is a graphics driver issue of my
                device but I am not sure.`),
            m("p", `On Chromium the image is completely black on some zoom
                levels like `, zoom_button("demo1-checker", 0.5), `. However
                this bug does not occur when opening the image in a new tab and
                zooming to `, zoom_button("demo1-checker", 0.5), `.`),
            m("p", `For the second test I inverted the checkerboard pattern for
                some areas of the image. There are zoom levels like `,
                zoom_button("demo2-checkerinvert", 1),
                ` where just parts of the border of the shape are visible. For
                other zoom levels like `,
                zoom_button("demo2-checkerinvert", 0.5),
                ` the whole shape area is clearly visible`),
            m(zimg, {
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
            }),
            m("h2", "other types of colorings"),
            m("p", `Let's explore some other types of local colorings. I chose
                uniform gray and random pixel values for the next demo. As
                expected the gray area does not show any interference effects
                at all. The random area on the other hand has them but they are
                hardly visible. You can see them if you keep the rough slider at `,
                zoom_button("demo3-grayrandom", 1),
                ` and just move the fine slider.`),
            m(zimg, {
                size: 600,
                image: (x, y) => x >= 0.5,
                noise: (x, y, val) => {
                    let color = val? 128 : Math.random() * 255;
                    return [color, color, color];
                },
                update: zoom_stream("demo3-grayrandom"),
            }),
            m("p", `Now let's combine different types of colorings. The random
                noise seems too different but a combination of checkerboard and
                gray could work. It does in fact: For `,
                zoom_button("demo4-checkergray", 0.999),
                ` the difference is just barely visible on Firefox and
                invisible on Chromium.`
            ),
            m(zimg, {
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
            }),
            m("p", `To hide the remaining interference artefacts we bring the
                random noise back and add it to our color values. Now things
                start to get really interesting. Let's just look at the zoom
                levels `,
                zoom_button("demo5-checkergrayrandom", 0.999), ` and `,
                zoom_button("demo5-checkergrayrandom", 0.5), ` for the next two
                demos.`),
            m("p", `On `, zoom_button("demo5-checkergrayrandom", 0.5), ` the
                square is sometimes visible and sometimes invisible. After a
                bit of testing I found out that it depends on the parity of the
                image width. I cannot explain it but I also do not find it
                implausible that these interference effects change drastically
                on size parity.`),
            m("p", `The real weirdness starts on `,
                zoom_button("demo5-checkergrayrandom", 0.999), `. `,
                `On Firefox the square is visible for images smaller or equal
                to 500px in size and invisible for larger ones. I suppose
                Firefox uses different rendering techniques for different image
                sizes. On Chrome the square is visible if and only if it is
                also visible on `, zoom_button("demo5-checkergrayrandom", 1), `
                - this means visible for even image sizes and invisible for odd
                sizes.`),
            m(zimg, {
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
            }),
            m(zimg, {
                size: 401,
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
            }),
            m("h2", "invisibility on 1x"),
            m("p", `It would be really cool to create an image that is
                invisible on `, zoom_button("empty", 1), ` but arises on zoom.
                This did already work but just in Chromium. My first idea for
                this was to hide the interference area in a random area and
                match the grayscale level:`),
            m(zimg, {
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
            }),
            m("p", `This does work on Firefox on my specific screen. The
                difference is however visible in other browsers and on Firefox
                on other devices.`),
            m("p", `To create a truly invisible interference area my next idea
                was to rearrange the pixels according to their color. This
                ensures equal color distribution inside and outside the
                interference area. It is however rather complicated to
                implement. The same effect can be achieved with random colors
                using uneven probabilities. For a dark pixel on the
                checkerboard we generate two random color values and take the
                smaller one. This is equivalent to imagining a neighboring
                light pixel and swapping their values if necessary.`),
            m("p", `Now the effect really works consistent across devices and
                screens! Try zooming to `, zoom_button("demo6-reordering",
                    0.5), ` for example.`),
            m(zimg, {
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
            }),
            m("p", `Now if we think in terms of probability distributions this
                process can be easily generalized from hidden black-and-white
                to grayscale images. Try the following example on `,
                zoom_button("demo7-reordering-grayscale", 0.5), `.
                Unfortunately the interference patterns are only clearly
                visible in the center of the image as you can see at the end of
                the paint brush. (This is sometimes not the case on
                Chromium.)`),
            m(zimg, {
                size: 601,
                // image: (x, y) => {
                //     if (x < 0.5) return 0.3 <= x && 0.3 <= y && y < 0.7;
                //     return 1 - y;
                // },
                image: base64_to_img(gimpdata),
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
            }),
            m("p", `It would be really cool if the whole area could be used for
                hidden images. However i think that is impossible. There are
                always spots of destructive interference and for `,
                zoom_button("demo7-reordering-grayscale", 0.5), ` and whole
                number parts these spots are already at the border of the
                image.`),
            m("p", `Using the following file picker you can try the effect
                yourself. I respect your privacy - All images are processed
                client-side.`),
            m(custom_file_upload),
            m("h2", "Todo"),
            zoom_button("test", 0.5), `, `,
            zoom_button("test", 1), `, `,
            m("p", `do not force square images`),
            m("p", `Does this work for colored images?`),
            m("p", `add source code link`),
            m("h2", "future ideas"),
            m("p", `different images on different scales?`),
            m("p", `more browser tests to really understand the different renderings`),
            m("h2", "Thank you..."),
            m("ul",
                m("li", "... ",
                    m("a", {href: "https://mithril.js.org/"}, "mithril.js"),
                    " and ",
                    m("a", {href: "https://github.com/rilwis/bamboo"}, "bamboo"),
                    ` for keeping the fun in this project by abstracting away
                    the Javascript DOM API and CSS`,
                ),
                m("li", "... ",
                    m("a", {href: "https://ciechanow.ski/"}, "Bartosz Ciechanowski"),
                    ` for being a great inspiration`,
                ),
                m("li", "... for reading :)"),
            ),
            m("div", { style: "height: 50px" }),
        ),
    };
};

m.mount(document.body, main);
