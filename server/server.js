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
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
  socket.on('chat message', message => {
    console.log('message: ', message);
  })
})

httpServer.listen(port, function() {
  console.log('server is listening on port no: ', port);
})