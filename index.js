const express = require('express');
const path = require('path');
const browser = require('./browser');
const remote = require('./remote');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const hbs = require('express-handlebars');

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

app.get('/', splash);
app.get('/browser', browser.browser);
app.get('/remote', remote.remote);

function splash(req, res) {
    return res.render('splash', {title: 'webplayer'})
}

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('up press', function() {
        io.emit('up press');
    });
    socket.on('down press', function() {
        io.emit('down press');
    });
    socket.on('disconnect', function() {
        console.log('a user disconnected')
    })
});

http.listen(3000, () => console.log('Example app listening on port 3000!'));