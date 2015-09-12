var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    alphabet = require('alphabetjs');

server.listen(8080);
console.log('Running at port 8080...');
console.log(alphabet('MASHIRO', 'planar'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client/index.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('drawFromClient', function(data) {
        console.log(data);
        socket.broadcast.emit('drawFromServer', data);
    });
    socket.on('console',function(data){
        socket.broadcast.emit('alert', data);
    })
});
