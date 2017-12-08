var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Events = require('shared/events');

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on(Events.CONNECTION, function(socket){
    socket.on(Events.CHAT_MESSAGE, function(msg){
        io.emit(Events.CHAT_MESSAGE, msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
