//Global imports
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const os = require('os');

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
app.use(express.static(process.env.WEBPLAYER_ROOT));

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

//get IP address and set as env variable for later
if (!process.env.DISPLAY_IP_ADDR) {
    let ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
                if (iface.address.includes('192.')) {
                    process.env.DISPLAY_IP_ADDR = iface.address;
                }
            }
            ++alias;
        });
    });
}


//Start the server
let port = process.env.port || 3000;
http.listen(port, () => console.log('webplayer listening on port '+port));