const stream = require("lib/mithril-stream");

module.exports = {
    // create a new stream which does not fire if the value does not change
    dedupe: (s) => {
        const n = stream(s());
        s.map(val => {
            if (val != n()) n(val);
        });
        return n;
    },
    // create a new stream which limits update bandwidth
    debounce: (s, timeout) => {
        if (!timeout) timeout = 500;
        const n = stream(s());
        let timer;
        const updatefn = val => {
            if (!timer) n(val);
            else clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
                if (val != n()) updatefn(val);
            }, timeout);
        };
        s.map(updatefn);
        return n;
    },
};
