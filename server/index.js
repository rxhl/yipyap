const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

// local imports
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(router);
app.use(cors());

// Init socket
io.on('connection', socket => {
  console.log('New connection');

  // socket.on can be used to Tx/Rx any event, given their names are same on client and server side.
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    // Emit messages based on events
    socket.emit('message', {
      user: 'admin',
      text: `Hi ${user.name}, you have now joined ${user.room}.`
    });

    // Broadcast the new user entrance to existing members
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined the chat.`
    });

    // Else allow the user in room
    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  // socket.on = expect from client
  // socket.emit = transmit to client
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });

  // Every socket has a disconnect event by default.
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left the chat.`
      });
    }
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
