const fs = require('fs');

function browser(req, res) {
    let dummyFiles = [
        {
            name: 'a',
            path: '/some/path'
        },
        {
            name: 'b',
            path: '/another/path'
        }

    ];
    return res.render('browser', {title: 'browser', file: dummyFiles})
}

module.exports = {
    browser,
};