//Global imports
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

//Local imports
const browser = require('./browser');
const remote = require('./remote');

//Imports with dependencies
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


//Setup handlebars templating engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Setup routes
app.get('/', splash);
app.get('/browser*', browser.browser);
app.get('/remote', remote.remote);
app.use(express.static('./public'));

//Home page
function splash(req, res) {
    return res.render('splash', {title: 'webplayer'})
}

//If we hear a keypress from a remote, broadcast to all users
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('up press', function() {
        io.emit('up press');
    });
    socket.on('down press', function() {
        io.emit('down press');
    });
    socket.on('select press', function() {
        io.emit('select press');
    });
    socket.on('left press', function() {
        io.emit('left press');
    });
    socket.on('disconnect', function() {
        console.log('a user disconnected')
    })
});

//Start the server
http.listen(3000, () => console.log('webplayer listening on port 3000!'));