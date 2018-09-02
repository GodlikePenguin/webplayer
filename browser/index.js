const fs = require('fs');

function browser(req, res) {
    let base = process.env.WEBPLAYER_ROOT;
    console.log(req.url);
    let path = req.url.substr(req.url.lastIndexOf('/browser')+'/browser'.length+1);
    console.log(path);
    let fullPath = base + '/' + path;
    console.log(fullPath);
    if (!fs.existsSync(fullPath)) {
        return res.status(404)
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
        let returnedFiles = [];
        let files = fs.readdirSync(fullPath);
        for (let i = 0; i < files.length; i++) {
            returnedFiles.push({
                name: files[i],
                path: req.url + '/' + files[i]
            })
        }
        return res.render('browser', {title: 'browser', file: returnedFiles})
    } else {
        return res.render('video', {src:  '/' + path})
    }

}

module.exports = {
    browser,
};