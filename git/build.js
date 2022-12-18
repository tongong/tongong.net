const fs = require("fs");
const child_process = require("child_process");

const repositories = require("./repositories.js")
    .sort((a,b) => a.name.localeCompare(b.name));

// prepare new repos
repositories.forEach(r => {
    if (!fs.existsSync("repo/" + r.name)) {
        fs.mkdirSync("repo/" + r.name);
        console.log(child_process.execSync("git init --bare",
            {cwd: "repo/" + r.name}).toString());
        fs.writeFileSync("repo/" + r.name + "/hooks/post-update",
            "#'!/bin/sh\nexec git update-server-info\n");
        fs.chmodSync("repo/" + r.name + "/hooks/post-update",
            fs.constants.S_IRWXU);
        // manually:
        // add file path as remote
    }
});

// prepare dist directory
if (fs.existsSync("dist")) fs.rmSync("dist", { recursive: true });
fs.mkdirSync("dist");
fs.copyFileSync("style.css", "dist/style.css");
fs.copyFileSync("logo.png", "dist/logo.png");

// configure and run stagit for all projects
repositories.forEach(r => {
    fs.writeFileSync("repo/" + r.name + "/description", r.description);
    fs.writeFileSync("repo/" + r.name + "/owner", "tongong");
    fs.writeFileSync("repo/" + r.name + "/url",
        "https://tongong.net/git/" + r.name + ".git");
    fs.mkdirSync("dist/" + r.name);
    fs.copyFileSync("style.css", "dist/" + r.name + "/style.css");
    fs.copyFileSync("logo.png", "dist/" + r.name + "/logo.png");
    child_process.execSync("stagit ../../repo/" + r.name,
        {cwd: "dist/" + r.name});
});
fs.writeFileSync("dist/index.html",
    child_process.execSync("stagit-index " +
        repositories.map(r => "repo/" + r.name).join(" "))
);

// include dist in website dist
// tacker is used to include logo.png and style.css
child_process.execSync("find dist -name *.html")
    .toString().split("\n").filter(f => f != "").map(f => {
        // tacker base path
        const basepath = f == "dist/index.html"? "dist" :
            f.split("/").slice(0, 2).join("/");
        const distpath = f.replace("dist/", "../dist/git/");
        const distparent = distpath.split("/").slice(0, -1).join("/");
        fs.mkdirSync(distparent, {recursive: true});
        child_process.execSync("tacker -p \"" + basepath
            + "\" \"" + f + "\" \"" + distpath + "\"");
    });

// create directories for git https clone
repositories.forEach(r => {
    fs.cpSync("repo/" + r.name, "../dist/git/" + r.name + ".git",
        {recursive: true});
});
