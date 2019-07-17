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
  const JOIN_ROOM = 'join room';
  const ROOM_MSG = 'room message';
  const GET_YOUR_USER_DATA = 'get your user data';
  const SEND_MY_NICKNAME = 'send my nickname';
  const ADD_NEW_USER_TO_ROOM = 'add new user to room';
  const USER_IS_TYPINGS = 'user is typings';
  const PRIV_INVITATION = 'send priv invitation';
  
  socket.on(USER_CONNECTED, (nickname) => {
    console.log('a user connected', nickname);
    socket.broadcast.emit(CHAT_MSG, 'A new user connect to this room...', nickname);
  })

  socket.on(USER_DISCONNECTED, () => {
    console.log('user disconnected');
    io.emit(CHAT_MSG, 'Some user have left this chat room...');
  });

  socket.on(CHAT_MSG, (nickname, message) => {
    console.log(nickname + ' message: ', message);
    io.emit(CHAT_MSG, nickname, message);
  });

  socket.on(ROOM_MSG, (roomName, nickname, message) => {
    console.log('room msg: ' + roomName + ' from : ' + nickname+ ' |');//, io.sockets.adapter.rooms);
    socket.to(roomName).emit(ROOM_MSG, nickname, message);
  });

  socket.on(JOIN_ROOM, (newUser) => {
    console.log('join room by: ', newUser);
    socket.join(newUser.roomName);
    socket.to(newUser.roomName).emit(ROOM_MSG, newUser.nickname, 'A new user has joined the room: ');
    socket.to(newUser.roomName).emit(GET_YOUR_USER_DATA, newUser.socketId);
    socket.to(newUser.roomName).emit(ADD_NEW_USER_TO_ROOM, newUser);
  });

  socket.on(SEND_MY_NICKNAME, (myUserData, destinationSocketId) => {
    console.log('send my nickname: ', myUserData, destinationSocketId);
    socket.to(destinationSocketId).emit(ADD_NEW_USER_TO_ROOM, myUserData);
  });

  socket.on(USER_IS_TYPINGS, (roomName, userNickname, isTypings) => {
    socket.to(roomName).emit(USER_IS_TYPINGS, userNickname, isTypings);
  })

  socket.on(PRIV_INVITATION, (actualUser, newUser) => {
    socket.to(newUser.socketId).emit(PRIV_INVITATION, actualUser, newUser);
  })

  // socket.on(JOIN_ROOM, (roomName) => {
  //   console.log('join room: ', roomName);
  //   socket.join(roomName);
  //   socket.to(roomName).emit(ROOM_MSG, 'A new user has joined the room...' + roomName);
  //   // console.log('my room info: ', io.sockets);
  //   io.clients((error, clients) => {
  //     if (error) throw error;
  //     console.log('all connected clients: ',clients);
  //   });
  //   io.in(roomName).clients((error, clients) => {
  //     if (error) throw error;
  //     console.log('all connected clients: in room: '+roomName, clients);
  //   });
  //   console.log('socket.id: ', socket.id);
  // })

})

httpServer.listen(port, function() {
  console.log('server is listening on port no: ', port);
})