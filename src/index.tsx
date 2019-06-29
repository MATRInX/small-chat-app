import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from './components/ChatWindow/ChatWindow';
import io from 'socket.io-client';

export const socket = io();

const tsx: JSX.Element = (
  <div>
    <ChatWindow />
  </div>
);

const element = document.getElementById('app');

ReactDOM.render(tsx, element);