var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

var wsArray = [];

io.sockets.on('connection', function (socket) {
  wsArray.push(socket);
  socket.on('my other event', function (data) {
    wsArray.forEach(function(socket){
      socket.emit('news', data);
    })
    console.log(data);
  });
});