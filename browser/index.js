const fs = require('fs');

function browser(req, res) {
    return res.render('browser', {title: 'browser'})
}

module.exports = {
    browser,
};