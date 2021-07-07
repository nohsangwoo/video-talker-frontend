import React from 'react';
import socektClient from 'socket.io-client';

const SERVER = 'http://localhost:5000';

let socket;

const wssConnection = () => {
  socket = socektClient(SERVER);

  socket.on('connection', () => {
    console.log('succesfully connected with wss server');
    console.log(socket.id);
  });
};

export default wssConnection;
