var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var Events = require('./shared/events');

var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var index = require('./routes/index');
app.use(express.static(__dirname + '/views'));

io.on(Events.CONNECTION, function(socket){
    socket.on(Events.CHAT_MESSAGE, function(msg){
        io.emit(Events.CHAT_MESSAGE, msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
