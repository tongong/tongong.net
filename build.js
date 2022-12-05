import * as std from "std";
import * as os from "os";

function is_dir(path) {
    let stat = os.stat(path)[0];
    if (stat == null) return false;
    return !!(stat.mode & os.S_IFDIR);
}

function is_file(path) {
    let stat = os.stat(path)[0];
    if (stat == null) return false;
    return !!(stat.mode & os.S_IFREG);
}

function parent_dir(path) {
    if (path.endsWith("/")) path = path.slice(0, -1);
    if (!path.includes("/")) return ".";
    return path.slice(0, path.lastIndexOf("/"));
}

// creates the directory with all needed parents
function mkdir_p(path) {
    if (!is_dir(path)) {
        mkdir_p(parent_dir(path));
        os.mkdir(path);
    }
}

// return paths to all pages
function get_pages(entry_path) {
    return os.readdir(entry_path)[0].filter(e => e != "." && e != "..")
        .map(e => entry_path + "/" + e)
        .flatMap(e => {
            if (is_dir(e) && !e.endsWith("/src")) {
                return get_pages(e);
            } else if (is_file(e) && e.endsWith("/index.html")) {
                return [e];
            }
        });
}

// list of paths
const pages = get_pages("content");

const template = std.loadFile("template/dist/index.html");

pages.forEach(src => {
    const dst = src.replace("content/", "dist/");

    const txt_src = std.loadFile(src);
    const title = txt_src.includes("<h1>") ?
        txt_src.split("<h1>")[1].split("</h1>")[0] + " | tongong.net"
        : "tongong.net";
    const txt = template
        .replace("{{title}}", title)
        .replace("{{content}}\n", txt_src)

    mkdir_p(parent_dir(dst));
    const dfile = std.open(dst, "w");
    dfile.puts(txt);
    dfile.close();
});
