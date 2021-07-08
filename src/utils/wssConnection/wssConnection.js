import React from 'react';
import socektClient from 'socket.io-client';

const SERVER = 'http://localhost:5000';

let socket;

export const connectWithWebSocket = () => {
  socket = socektClient(SERVER);

  socket.on('connection', () => {
    console.log('succesfully connected with wss server');
    console.log(socket.id);
  });
};

export const registerNewUser = username => {
  console.log('register-new-user front end func', username);
  socket.emit('register-new-user', {
    username,
    socketId: socket.id,
  });
};
