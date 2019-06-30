import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatWindow from './components/ChatWindow/ChatWindow';
import configureStore from './redux/store/configureStore';
import io from 'socket.io-client';

export const socket = io();
const store = configureStore();

const tsx: JSX.Element = (
  <Provider store={store}>
    <ChatWindow />
  </Provider>
);

const element = document.getElementById('app');

ReactDOM.render(tsx, element);