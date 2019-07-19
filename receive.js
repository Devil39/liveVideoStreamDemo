// var express=require('express');
// var app=express();
// var server = app.listen(8700);
// var io = require('socket.io').listen(server);

var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8070);

//server.listen(process.env.PORT || 8810);
console.log('Listening at port 8700');

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.get('/client', function(req, res){
  res.sendFile(__dirname+"/client.html");
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', ()=>{
        console.log("A user disconnected");
    });
    socket.on('send', (data)=>{
        console.log("Received!");
        io.emit('image', data);
        socket.emit('test', data);
    });
  });

/*http.listen(8010, function(){
  console.log('Listening on port 8010');
});*/