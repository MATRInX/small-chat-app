const path = require('path');
const express = require('express');
const http = require('http');
const server = require('socket.io');
require('dotenv').config({path: '.env.dev'});

const app = new express();
const httpServer = http.createServer(app);
const io = new server(httpServer);

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));  
});

io.on('connection', function(socket) {
  const USER_CONNECTED = 'connect user';
  const USER_DISCONNECTED = 'disconnect';
  const CHAT_MSG = 'chat message';
  
  socket.on(USER_CONNECTED, () => {
    console.log('a user connected');
    io.emit(CHAT_MSG, 'A new user connect to this room...');
  })

  socket.on(USER_DISCONNECTED, () => {
    console.log('user disconnected');
    io.emit(CHAT_MSG, 'Some user have left this chat room...');
  });

  socket.on(CHAT_MSG, message => {
    console.log('message: ', message);
    io.emit(CHAT_MSG, message);
  });

})

httpServer.listen(port, function() {
  console.log('server is listening on port no: ', port);
})