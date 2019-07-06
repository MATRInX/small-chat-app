import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatWindow from './components/ChatWindow/ChatWindow';
import configureStore from './redux/store/configureStore';
import io from 'socket.io-client';
import { createNewRoom } from './redux/actions/socketIO/room';

export const socket = io();
const store = configureStore();

store.dispatch(createNewRoom('jeden', true, false));
store.dispatch(createNewRoom('dwa', true, false));

const tsx: JSX.Element = (
  <Provider store={store}>
    <ChatWindow roomName={'jeden'}/>
    <ChatWindow roomName={'dwa'}/>
  </Provider>
);

const element = document.getElementById('app');

ReactDOM.render(tsx, element);