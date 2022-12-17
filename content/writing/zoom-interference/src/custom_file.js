const m = require("lib/mithril");
const zimg = require("./zoomimg.js");

function blob_to_img(blob) {
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    return img;
}

let noise_grayscale = (x, y, val) => {
    val = (0.3 * val[0] + 0.6 * val[1] + 0.1 * val[2])/ 256;
    // val: input color; 0 <= val < 1
    let color = 128;
    const RAND = 100;
    let xp = Math.random();
    let yp = Math.random();
    if ((x + y + 1) % 2 == 0 != yp < (1-2*val)*xp+val) {
        xp = 1 - xp;
    }
    color = color - RAND + xp * 2 * RAND;
    return [color, color, color];
};

let noise_color = (x, y, val) =>
    val.map(valc => {
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


module.exports = () => {
    let image_elem_destroyed = true;
    let image_size;
    let image_tag;
    return {
        oninit: (vnode) => {
        },
        oncreate: (vnode) => {
        },
        view: (vnode) => m("div",
            m("input", {
                type: "file",
                accept: "image/*,.jpg,.jpeg,.png",
                style: {
                    marginBottom: "20px",
                },
                onchange: (e) => {
                    image_tag = blob_to_img(e.target.files[0]);
                    image_tag.onload = () => {
                        console.log(image_tag)
                        console.log(image_tag.width);
                        image_size = Math.min(image_tag.width, image_tag.height);
                        if (image_size % 2 == 0) image_size--;
                        // this part is really dirty. the zoom element is
                        // recreated instead of updating. but it works
                        if (image_elem_destroyed == false) {
                            image_elem_destroyed = true;
                            m.redraw.sync();
                        }
                        image_elem_destroyed = false;
                        m.redraw();
                    };
                },
            }),
            image_elem_destroyed? "" : m(zimg, {
                size: image_size,
                image: image_tag,
                noise: vnode.attrs.color? noise_color : noise_grayscale,
            }),
        )
    };
};
