import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './components/Messages/Messages';
import InputBar from './components/InputBar/InputBar';
import io from 'socket.io-client';

export const socket = io();

const tsx: JSX.Element = (
  <div>
    <Messages />
    <InputBar />
  </div>
);

const element = document.getElementById('app');

ReactDOM.render(tsx, element);